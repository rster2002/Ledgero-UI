import type SubcategoryDTO from "@/models/dto/categories/subcategories/SubcategoryDTO";

export default interface CategoryDTO {
    id: string;
    name: string;
    description: string;
    hexColor: string;
    amount: number;
    subcategories: SubcategoryDTO[];
}
