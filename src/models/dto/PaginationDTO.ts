export default interface PaginationDTO<T> {
    page: number;
    limit: number;
    done: boolean;
    items: T[];
}
