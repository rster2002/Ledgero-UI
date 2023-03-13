import paginationIterator from "@/helpers/paginationIterator";
import type TransactionDTO from "@/models/dto/transactions/TransactionDTO";
import APIFetch from "@/helpers/APIFetch";
import type NewSplitDTO from "@/models/dto/transactions/NewSplitDTO";
import type SplitDTO from "@/models/dto/transactions/SplitDTO";
import type UpdateTransactionDetailsDTO from "@/models/dto/transactions/UpdateTransactionDetailsDTO";

export default class TransactionService {
    createTransactionsIterator() {
        return paginationIterator<TransactionDTO>("/transactions");
    }

    async getTransaction(transactionId: string): Promise<TransactionDTO> {
        return await APIFetch(`/transactions/${transactionId}`);
    }

    async updateCategory(transactionId: string, categoryId: string | null, subcategoryId: string | null): Promise<void> {
        await APIFetch(`/transactions/${transactionId}/category`, {
            method: "PATCH",
            isJsonResponse: false,
            body: JSON.stringify({
                categoryId,
                subcategoryId,
            }),
        })
    }

    async updateDetails(transactionId: string, content: UpdateTransactionDetailsDTO): Promise<void> {
        await APIFetch(`/transactions/${transactionId}/details`, {
            method: "PATCH",
            isJsonResponse: false,
            body: JSON.stringify(content),
        });
    }

    async createSplit(transactionId: string, split: NewSplitDTO): Promise<void> {
        await APIFetch(`/transactions/${transactionId}/splits`, {
            method: "POST",
            isJsonResponse: false,
            body: JSON.stringify(split),
        });
    }

    async deleteSplit(transactionId: string, splitId: string): Promise<void> {
        await APIFetch(`/transactions/${transactionId}/splits/${splitId}`, {
            method: "DELETE",
            isJsonResponse: false,
        });
    }

    async getSplitsFor(transactionId: string): Promise<SplitDTO[]> {
        return await APIFetch(`/transactions/${transactionId}/splits`);
    }
}
