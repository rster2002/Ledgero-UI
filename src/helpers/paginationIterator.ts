import APIFetch from "@/helpers/APIFetch";
import type PaginationDTO from "@/models/dto/PaginationDTO";

export interface PaginationIterationOptions {
    query?: Record<string, string>;
    limit?: number;
}

export default async function* paginationIterator<T>(
    url: string,
    options: PaginationIterationOptions = {}
): AsyncGenerator<T[]> {
    const query = options.query ?? {};
    const limit = options.limit ?? 50;

    let page = 0;

    while (true) {
        page++;

        const content: PaginationDTO<T> = await APIFetch(url, {
            query: {
                ...query,
                limit: limit.toString(),
                page: page.toString(),
            },
        });

        if (content.done) {
            return content.items;
        }

        yield content.items;
    }
}
