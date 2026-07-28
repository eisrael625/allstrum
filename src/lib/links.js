// Central place for the outbound links used across the site.
//
// PREORDER_URL currently points at the Typeform interest survey. Once you
// have a Stripe Payment Link (run scripts/create-preorder-link.js, or create
// one in the Stripe dashboard), replace the value below with the
// https://buy.stripe.com/... URL and every pre-order button switches over.
export const INTEREST_FORM_URL = 'https://form.typeform.com/to/tIFZxh7l';
export const PREORDER_URL = INTEREST_FORM_URL;

export function openPreOrder() {
  window.open(PREORDER_URL, '_blank', 'noopener,noreferrer');
}
