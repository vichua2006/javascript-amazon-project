export function format_currency(price_cents){
    return (price_cents / 100).toFixed(2);
}