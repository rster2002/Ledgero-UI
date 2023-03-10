import toDate from "@/utils/toDate";

export default function formatDate(input: Date | string | number, options: Intl.DateTimeFormatOptions = {}): string {
    let date = toDate(input);

    return new Intl.DateTimeFormat("en-US", {
        dateStyle: "full",
        timeStyle: "short",
        hourCycle: "h24",
        ...options,
    }).format(date);
}
