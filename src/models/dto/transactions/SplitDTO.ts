import type SlimCategoryDTO from "@/models/dto/categories/SlimCategoryDTO";

export default interface SplitDTO {
    id: string;
    description: string;
    amount: number;
    category: SlimCategoryDTO | null;
}
