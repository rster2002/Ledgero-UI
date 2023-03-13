export default interface UpdateTransactionDetailsDTO {
    description: string;
    categoryId: string | null;
    subcategoryId: string | null;
    externalAccountId: string | null;
}
