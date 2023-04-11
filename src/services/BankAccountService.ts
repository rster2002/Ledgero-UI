import type BankAccountDTO from "@/models/dto/bankAccounts/BankAccountDTO";
import APIFetch from "@/helpers/APIFetch";
import paginationIterator from "@/helpers/paginationIterator";
import type BankAccountDetailsDTO from "@/models/dto/bankAccounts/BankAccountDetailsDTO";

export default class BankAccountService {
    async getAllBankAccounts(): Promise<BankAccountDTO[]> {
        return await APIFetch("/bank-accounts");
    }

    async getBankAccountById(id: string): Promise<BankAccountDTO> {
        return await APIFetch(`/bank-accounts/${id}`);
    }

    async updateBankAccountDetails(id: string, details: BankAccountDetailsDTO) {
        await APIFetch(`/bank-accounts/${id}`, {
            method: "PUT",
            isJsonResponse: false,
            body: JSON.stringify(details),
        });
    }

    createTransactionIteratorForCategory(id: string) {
        return paginationIterator<BankAccountDTO>(`/bank-accounts/${id}/transactions`);
    }
}
