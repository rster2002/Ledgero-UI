export default function formatMoney(money: number, additionalOptions: Intl.NumberFormatOptions = {}): string {
    let formattingOptions = {
        style: "currency",
        currency: "EUR",
        ...additionalOptions,
    };

    return Intl.NumberFormat("nl-NL", formattingOptions)
        .format(money / 100);
}
