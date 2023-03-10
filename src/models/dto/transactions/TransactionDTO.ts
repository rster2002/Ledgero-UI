import type TransactionType from "@/models/dto/transactions/TransactionType";
import type BankAccountDTO from "@/models/dto/bankAccounts/BankAccountDTO";
import type ExternalAccountDTO from "@/models/dto/externalAccounts/ExternalAccountDTO";
import type SlimCategoryDTO from "@/models/dto/categories/SlimCategoryDTO";

export default interface TransactionDTO {
    id: string;
    transactionType: TransactionType;
    followNumber: string;
    originalDescription: string;
    description: string;
    completeAmount: number;
    amount: number;
    date: string;
    bankAccount: BankAccountDTO;
    category: SlimCategoryDTO | null;
    externalAccountName: string;
    externalAccount: ExternalAccountDTO | null;
}
