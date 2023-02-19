import APIFetch from "@/helpers/APIFetch";
import type UserTotalDTO from "@/models/dto/aggregates/UserTotalDTO";

export default class AggregateService {
    async getNetWorth(): Promise<number> {
        let response: UserTotalDTO = await APIFetch("/aggregates/total");
        return response.total;
    }
}
