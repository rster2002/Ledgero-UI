import type CSVMapping from "@/models/dto/import/CSVMapping";
import type CheckCsvMappingDTO from "@/models/dto/import/CheckCsvMappingDTO";
import APIFetch from "@/helpers/APIFetch";
import type UploadCSVDTO from "@/models/dto/import/UploadCSVDTO";

export default class CSVImportService {
    async checkCSVMapping(file: File, mapping: CSVMapping): Promise<CheckCsvMappingDTO> {
        let csvText = await file.text();

        let body: UploadCSVDTO = {
            filename: file.name,
            csv: csvText,
            mappings: mapping,
        };

        return await APIFetch("/import/csv/check-mapping", {
            method: "POST",
            body: JSON.stringify(body),
        });
    }

    async importCSVFile(file: File, mapping: CSVMapping): Promise<void> {
        let csvText = await file.text();

        let body: UploadCSVDTO = {
            filename: file.name,
            csv: csvText,
            mappings: mapping,
        };

        return await APIFetch("/import/csv", {
            method: "POST",
            body: JSON.stringify(body),
            isJsonResponse: false,
        });
    }
}
