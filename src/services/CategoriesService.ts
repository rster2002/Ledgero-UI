import type NewCategoryDTO from "@/models/dto/categories/NewCategoryDTO";
import type CategoryDTO from "@/models/dto/categories/CategoryDTO";
import APIFetch from "@/helpers/APIFetch";

export default class CategoriesService {
    async getAllCategories(): Promise<CategoryDTO[]> {
        return await APIFetch("/categories");
    }

    async getCategoryById(id: string): Promise<CategoryDTO> {
        return await APIFetch("/categories/" + id);
    }

    async saveOrdering(ordering: string[]) {
        await APIFetch("/categories/ordering", {
            method: "PATCH",
            isJsonResponse: false,
            body: JSON.stringify(ordering),
        });
    }

    async createCategory(category: NewCategoryDTO): Promise<CategoryDTO> {
        return await APIFetch("/categories", {
            method: "POST",
            body: JSON.stringify(category),
        });
    }
}
