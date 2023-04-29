import type ExternalAccountDTO from "@/models/dto/externalAccounts/ExternalAccountDTO";
import APIFetch from "@/helpers/APIFetch";
import type ExternalAccountDetailsDTO from "@/models/dto/externalAccounts/ExternalAccountDetailsDTO";

export default class ExternalAccountService {
    async getAllExternalAccounts():  Promise<ExternalAccountDTO[]> {
        return await APIFetch("/external-accounts");
    }

    async createExternalAccount(newExternalAccount: ExternalAccountDetailsDTO) {
        await APIFetch("/external-accounts", {
            method: "POST",
            isJsonResponse: false,
            body: JSON.stringify(newExternalAccount),
        });
    }
}
