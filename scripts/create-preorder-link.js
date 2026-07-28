#!/usr/bin/env node
/**
 * Creates the AllStrum pre-order deposit Product, Price, and Payment Link
 * in your Stripe account, then prints the Payment Link URL.
 *
 * Usage (run locally — your secret key never touches the repo):
 *   STRIPE_SECRET_KEY=sk_test_... node scripts/create-preorder-link.js
 *   STRIPE_SECRET_KEY=sk_test_... DEPOSIT_USD=25 node scripts/create-preorder-link.js
 *
 * Then paste the printed https://buy.stripe.com/... URL into PREORDER_URL
 * in src/lib/links.js. Re-run with your sk_live_... key when you're ready
 * to accept real payments, and swap the URL again.
 */

const key = process.env.STRIPE_SECRET_KEY;
if (!key || !key.startsWith('sk_')) {
  console.error('Set STRIPE_SECRET_KEY to your Stripe secret key (sk_test_... or sk_live_...).');
  process.exit(1);
}
const depositUsd = Number(process.env.DEPOSIT_USD || 50);

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
  const product = await stripe('products', {
    name: 'AllStrum Pre-order Deposit',
    description:
      "Fully refundable deposit that reserves your place in line for an AllStrum. We'll email you with final pricing and shipping details before your order is completed.",
  });

  const price = await stripe('prices', {
    product: product.id,
    unit_amount: String(Math.round(depositUsd * 100)),
    currency: 'usd',
  });

  const link = await stripe('payment_links', {
    'line_items[0][price]': price.id,
    'line_items[0][quantity]': '1',
    'line_items[0][adjustable_quantity][enabled]': 'true',
    'line_items[0][adjustable_quantity][minimum]': '1',
    'line_items[0][adjustable_quantity][maximum]': '10',
    'after_completion[type]': 'hosted_confirmation',
    'after_completion[hosted_confirmation][custom_message]':
      "Thank you for reserving your AllStrum! Your deposit is fully refundable at any time. We'll email you as soon as we're ready to ship.",
  });

  console.log('');
  console.log(`Product:      ${product.id}`);
  console.log(`Price:        ${price.id} ($${depositUsd} USD)`);
  console.log(`Payment Link: ${link.url}`);
  console.log('');
  console.log('Next step: paste the Payment Link URL into PREORDER_URL in src/lib/links.js');
})().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
