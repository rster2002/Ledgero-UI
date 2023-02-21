export default function toDate(date: Date | string | number): Date {
    let internalDate = date;

    if (typeof date === "string") {
        const number = Number(date);

        if (isNaN(number)) {
            internalDate = new Date(date);
        } else {
            date = number;
        }
    }

    if (typeof date === "number") {
        internalDate = new Date(date);
    }

    return internalDate as Date;
}
