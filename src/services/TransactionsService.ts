import paginationIterator from "@/helpers/paginationIterator";
import type TransactionDTO from "@/models/dto/transactions/TransactionDTO";

export default class TransactionsService {
    createTransactionsIterator() {
        return paginationIterator<TransactionDTO>("/transactions");
    }
}
