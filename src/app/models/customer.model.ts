export interface Customer {
    id: string;
    userName: string;
    normalizedUserName: string;
    email: string;
    normalizedEmail: string;
    emailConfirmed: boolean;
    passwordHash: string;
    securityStamp: string;
    concurrencyStamp: string;
    phoneNumber: string;
    phoneNumberConfirmed: boolean;
    twoFactorEnabled: boolean;
    lockoutEnd: string;
    lockoutEnabled: boolean;
    accessFailedCount: number;
    imagePath: string;
    gender: boolean;
    address: string;
}

export interface CustomerUpdating {
    id: string;
    userName: string;
    email: string;
    address: string;
    gender: boolean;
    imagePath: string;
    image?:File
}

export interface CustomerPasswordUpdating{
    "customerId": string,
    "oldPassword": string,
    "newPassword": string
  }
