import type CSVMapping from "@/models/dto/import/CSVMapping";

export default interface UploadCSVDTO {
    mappings: CSVMapping;
    filename: string;
    csv: string;
}
