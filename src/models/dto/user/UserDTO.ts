import type UserRole from "@/models/dto/user/UserRole";

export default interface UserDTO {
    id: string;
    username: string;
    role: UserRole;
}
