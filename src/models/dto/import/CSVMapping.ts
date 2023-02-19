import type AmountMapping from "@/models/dto/import/AmountMapping";
import type DateMapping from "@/models/dto/import/DateMapping";

/**
 * Used to map a column number to a required field of a transaction. The columns count starts as usual at 0.
 */
export default interface CSVMapping {
    accountIban: number;
    date: number;
    dateMapping: DateMapping;
    followNumber: number;
    description: number;
    amount: number;
    amountMapping: AmountMapping;
    externalAccountName: number;
}
