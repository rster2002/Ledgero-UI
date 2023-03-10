export default interface UpdateTransactionDTO {
    description: string;
    categoryId: string | null;
    subcategoryId: string | null;
    externalAccountId: string | null;
}
