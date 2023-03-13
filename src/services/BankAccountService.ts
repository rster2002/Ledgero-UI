import type BankAccountDTO from "@/models/dto/bankAccounts/BankAccountDTO";
import APIFetch from "@/helpers/APIFetch";

export default class BankAccountService {
    async getAllBankAccounts(): Promise<BankAccountDTO[]> {
        return await APIFetch("/bank-accounts");
    }
}
