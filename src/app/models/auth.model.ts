
export interface Auth{
    "idProvider": string,
    "jwtToken": string,
    "email": string,
    "accountId": string,
    "fullName": string,
    "imagePath": string,
    "refreshToken": string,
    "refreshTokenExpiryTime": Date
}

export interface AccountRegistration{
    "email": string,
    "password": string
}

export interface UserLogin{
    "email": string,
    "password": string
}
