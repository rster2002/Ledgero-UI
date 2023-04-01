import type CategoryDetailsDTO from "@/models/dto/categories/CategoryDetailsDTO";
import type CategoryDTO from "@/models/dto/categories/CategoryDTO";
import APIFetch from "@/helpers/APIFetch";
import type SubcategoryDTO from "@/models/dto/categories/subcategories/SubcategoryDTO";
import paginationIterator from "@/helpers/paginationIterator";
import type TransactionDTO from "@/models/dto/transactions/TransactionDTO";

export default class CategoryService {
    async getAllCategories(): Promise<CategoryDTO[]> {
        return await APIFetch("/categories");
    }

    async getCategoryById(id: string): Promise<CategoryDTO> {
        return await APIFetch("/categories/" + id);
    }

    async saveOrdering(ordering: string[]): Promise<CategoryDTO> {
        return await APIFetch("/categories/ordering", {
            method: "PATCH",
            isJsonResponse: false,
            body: JSON.stringify(ordering),
        });
    }

    async createCategory(category: CategoryDetailsDTO): Promise<CategoryDTO> {
        return await APIFetch("/categories", {
            method: "POST",
            body: JSON.stringify(category),
        });
    }

    async updateCategory(categoryId: string, details: CategoryDetailsDTO): Promise<CategoryDTO> {
        return await APIFetch(`/categories/${categoryId}`, {
            method: "PUT",
            body: JSON.stringify(details),
        });
    }

    async deleteCategory(categoryId: string): Promise<void> {
        await APIFetch(`/categories/${categoryId}`, {
            method: "DELETE",
            isJsonResponse: false,
        });
    }

    async getSubcategories(categoryId: string): Promise<SubcategoryDTO[]> {
        return await APIFetch(`/categories/${categoryId}/subcategories`);
    }

    async createSubcategory(categoryId: string, subcategory: CategoryDetailsDTO): Promise<SubcategoryDTO> {
        return await APIFetch(`/categories/${categoryId}/subcategories`, {
            method: "POST",
            body: JSON.stringify(subcategory),
        });
    }

    async getSubcategoryById(categoryId: string, subcategoryId: string): Promise<SubcategoryDTO> {
        return await APIFetch(`/categories/${categoryId}/subcategories/${subcategoryId}`);
    }

    async deleteSubcategory(categoryId: string, subcategoryId: string): Promise<void> {
        await APIFetch(`/categories/${categoryId}/subcategories/${subcategoryId}`, {
            method: "DELETE",
            isJsonResponse: false,
        });
    }

    async updateSubcategory(categoryId: string, subcategoryId: string, details: CategoryDetailsDTO): Promise<SubcategoryDTO> {
        return await APIFetch(`/categories/${categoryId}/subcategories/${subcategoryId}`, {
            method: "PUT",
            body: JSON.stringify(details),
        });
    }

    createTransactionIteratorForCategory(categoryId: string) {
        return paginationIterator<TransactionDTO>(`/categories/${categoryId}/transactions`);
    }

    createTransactionIteratorForSubcategory(categoryId: string, subcategoryId: string) {
        return paginationIterator<TransactionDTO>(`/categories/${categoryId}/subcategories/${subcategoryId}/transactions`);
    }
}
