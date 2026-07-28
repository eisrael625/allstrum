#!/usr/bin/env node
/**
 * Creates one Stripe Payment Link from the four existing reservation
 * products in the dashboard (Ukulele/Guitar Reservation at $50,
 * Ukulele/Guitar Combo Reservation at $100), each with adjustable
 * quantity defaulting to 0, then prints the Payment Link URL.
 *
 * Usage (run locally — your secret key never touches the repo):
 *   STRIPE_SECRET_KEY=sk_test_... node scripts/create-preorder-link.js
 *
 * Then paste the printed https://buy.stripe.com/... URL into RESERVE_URL
 * in src/lib/links.js. Re-run with your sk_live_... key (after recreating
 * the products in live mode) when you're ready for real payments.
 */

const key = process.env.STRIPE_SECRET_KEY;
if (!key || !key.startsWith('sk_')) {
  console.error('Set STRIPE_SECRET_KEY to your Stripe secret key (sk_test_... or sk_live_...).');
  process.exit(1);
}

// Must match the product names in the Stripe dashboard. Stripe requires at
// least one regular line item at quantity >= 1, so the FIRST product is the
// anchor (starts at 1, removable down to 0) and the rest are optional
// add-ons that start at 0.
const PRODUCT_NAMES = [
  'AllStrum Guitar Combo Reservation',
  'AllStrum Guitar Reservation',
  'AllStrum Ukulele Combo Reservation',
  'AllStrum Ukulele Reservation',
];

async function stripe(path, { method = 'GET', params } = {}) {
  const url = new URL(`https://api.stripe.com/v1/${path}`);
  const options = { method, headers: { Authorization: `Bearer ${key}` } };
  if (params && method === 'GET') {
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  } else if (params) {
    options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    options.body = new URLSearchParams(params);
  }
  const res = await fetch(url, options);
  const json = await res.json();
  if (!res.ok) throw new Error(json.error?.message || `Stripe ${path} request failed`);
  return json;
}

const CONFIRMATION_PARAMS = {
  'after_completion[type]': 'hosted_confirmation',
  'after_completion[hosted_confirmation][custom_message]':
    "Thank you for reserving your AllStrum! Your deposit is fully refundable at any time. We'll email you as soon as we're ready to ship.",
};

(async () => {
  const { data: products } = await stripe('products', {
    params: { active: 'true', limit: '100' },
  });

  const items = [];
  for (const name of PRODUCT_NAMES) {
    const product = products.find((p) => p.name === name);
    if (!product) throw new Error(`Product not found in Stripe: "${name}"`);

    let priceId = typeof product.default_price === 'string' ? product.default_price : null;
    if (!priceId) {
      const { data: prices } = await stripe('prices', {
        params: { product: product.id, active: 'true', limit: '1' },
      });
      if (!prices.length) throw new Error(`No active price on "${name}"`);
      priceId = prices[0].id;
    }
    console.log(`${name}: ${product.id} / ${priceId}`);
    items.push({ name, priceId });
  }

  console.log('');
  console.log(`"${items[0].name}" starts at 1 (removable); the rest start at 0.`);
  const params = { ...CONFIRMATION_PARAMS };
  params['line_items[0][price]'] = items[0].priceId;
  params['line_items[0][quantity]'] = '1';
  params['line_items[0][adjustable_quantity][enabled]'] = 'true';
  params['line_items[0][adjustable_quantity][minimum]'] = '0';
  params['line_items[0][adjustable_quantity][maximum]'] = '999';
  items.slice(1).forEach((item, i) => {
    params[`optional_items[${i}][price]`] = item.priceId;
    params[`optional_items[${i}][quantity]`] = '1';
    params[`optional_items[${i}][adjustable_quantity][enabled]`] = 'true';
    params[`optional_items[${i}][adjustable_quantity][minimum]`] = '0';
    params[`optional_items[${i}][adjustable_quantity][maximum]`] = '999';
  });
  const link = await stripe('payment_links', { method: 'POST', params });

  console.log('');
  console.log(`Payment Link: ${link.url}`);
  console.log('');
  console.log('Next step: paste the Payment Link URL into RESERVE_URL in src/lib/links.js');
})().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
