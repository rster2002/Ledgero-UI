import type ExternalAccountDTO from "@/models/dto/externalAccounts/ExternalAccountDTO";
import APIFetch from "@/helpers/APIFetch";
import type ExternalAccountDetailsDTO from "@/models/dto/externalAccounts/ExternalAccountDetailsDTO";
import paginationIterator from "@/helpers/paginationIterator";
import type TransactionDTO from "@/models/dto/transactions/TransactionDTO";

export default class ExternalAccountService {
    async getAllExternalAccounts(): Promise<ExternalAccountDTO[]> {
        return await APIFetch("/external-accounts");
    }

    async createExternalAccount(newExternalAccount: ExternalAccountDetailsDTO) {
        await APIFetch("/external-accounts", {
            method: "POST",
            isJsonResponse: false,
            body: JSON.stringify(newExternalAccount),
        });
    }

    async getExternalAccountById(id: string): Promise<ExternalAccountDTO> {
        return await APIFetch(`/external-accounts/${id}`);
    }

    createTransactionIteratorForExternalAccount(id: string) {
        return paginationIterator<TransactionDTO>(`/external-accounts/${id}/transactions`);
    }

    async updateExternalAccountDetails(id: string, details: ExternalAccountDetailsDTO): Promise<ExternalAccountDTO> {
        return await APIFetch(`/external-accounts/${id}`, {
            method: "PUT",
            body: JSON.stringify(details),
        });
    }
}
