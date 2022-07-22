export interface Payment {
    id: string;
    quantity: number;
    totalAmount: number;
    customerId: string;
    questId: number;
    questName: string;
}

export interface PaymentPage {
    message: string;
    data: Payment[];
    pagination: {
        totalCount: number;
        totalPages: number;
        pageSize: number;
        currentPage: number;
        hasNext: string;
        hasPrevious: string;
    };
    status: string;
}

export interface LinkMomo {
    message: string;
    data: string;
    status: string;
}

export interface VoucherChecking{
    couponCode : string,
    customerId: string,
    totalPrice: number
}

export interface VoucherResponse{
    data: string[],
    message: string,
    pagination: string,
    status: string
}
