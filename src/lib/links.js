// Central place for the outbound links used across the site.
//
// RESERVE_URL is the Stripe Payment Link for reservation deposits
// ($50 device / $100 device + guitar, quantities adjustable). Generate it
// with scripts/create-preorder-link.js and paste the
// https://buy.stripe.com/... URL below. Until it's set, the reserve
// buttons fall back to the interest form so nothing on the site breaks.
export const INTEREST_FORM_URL = 'https://form.typeform.com/to/tIFZxh7l';
export const RESERVE_URL = '';

const open = (url) => window.open(url, '_blank', 'noopener,noreferrer');

export function openReserve() {
  open(RESERVE_URL || INTEREST_FORM_URL);
}

export function openInterestForm() {
  open(INTEREST_FORM_URL);
}
