export interface JwtToken{
    Username: string,
    Role: string,
    notValidBefore: EpochTimeStamp,
    expirationTime: EpochTimeStamp,
    issuedAt: EpochTimeStamp
}