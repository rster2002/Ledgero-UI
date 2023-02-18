export default interface JWTResponseDto {
    access_token: string;
    refresh_token: string;
    token_type: string;
    expires: number;
}
