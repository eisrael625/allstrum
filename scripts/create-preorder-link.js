#!/usr/bin/env node
/**
 * Creates the AllStrum reservation Products, Prices, and a single Payment
 * Link (with both products as adjustable-quantity line items) in your
 * Stripe account, then prints the Payment Link URL.
 *
 * Usage (run locally — your secret key never touches the repo):
 *   STRIPE_SECRET_KEY=sk_test_... node scripts/create-preorder-link.js
 *
 * Then paste the printed https://buy.stripe.com/... URL into RESERVE_URL
 * in src/lib/links.js. Re-run with your sk_live_... key when you're ready
 * to accept real payments, and swap the URL again.
 */

const key = process.env.STRIPE_SECRET_KEY;
if (!key || !key.startsWith('sk_')) {
  console.error('Set STRIPE_SECRET_KEY to your Stripe secret key (sk_test_... or sk_live_...).');
  process.exit(1);
}

const RESERVATIONS = [
  {
    name: 'AllStrum Device Reservation',
    usd: 50,
    description:
      "Fully refundable $50 deposit that reserves an AllStrum device. We'll email you with final pricing and shipping details before your order is completed.",
  },
  {
    name: 'AllStrum Device + Guitar Reservation',
    usd: 100,
    description:
      "Fully refundable $100 deposit that reserves an AllStrum device-and-guitar package. We'll email you with final pricing and shipping details before your order is completed.",
  },
];

async function stripe(path, params) {
  const res = await fetch(`https://api.stripe.com/v1/${path}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams(params),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error?.message || `Stripe ${path} request failed`);
  return json;
}

(async () => {
  const linkParams = {
    'after_completion[type]': 'hosted_confirmation',
    'after_completion[hosted_confirmation][custom_message]':
      "Thank you for reserving your AllStrum! Your deposit is fully refundable at any time. We'll email you as soon as we're ready to ship.",
  };

  for (let i = 0; i < RESERVATIONS.length; i += 1) {
    const item = RESERVATIONS[i];
    const product = await stripe('products', {
      name: item.name,
      description: item.description,
    });
    const price = await stripe('prices', {
      product: product.id,
      unit_amount: String(item.usd * 100),
      currency: 'usd',
    });
    console.log(`${item.name}: ${product.id} / ${price.id} ($${item.usd})`);

    linkParams[`line_items[${i}][price]`] = price.id;
    linkParams[`line_items[${i}][quantity]`] = '1';
    linkParams[`line_items[${i}][adjustable_quantity][enabled]`] = 'true';
    linkParams[`line_items[${i}][adjustable_quantity][minimum]`] = '0';
    linkParams[`line_items[${i}][adjustable_quantity][maximum]`] = '999';
  }

  const link = await stripe('payment_links', linkParams);

  console.log('');
  console.log(`Payment Link: ${link.url}`);
  console.log('');
  console.log('Next step: paste the Payment Link URL into RESERVE_URL in src/lib/links.js');
})().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
