import toDate from "@/utils/toDate";

export default function toLocalDateString(date: Date | string | number): string {
    const internalDate = toDate(date);

    const monthString = (internalDate.getMonth() + 1).toString().padStart(2, "0");
    return `${internalDate.getFullYear()}-${monthString}-${internalDate.getDate()}T${internalDate.getHours()}:${internalDate.getMinutes()}`;
}
