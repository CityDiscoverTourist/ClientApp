export interface Payment {
    id: number;
    paymentMethod: string;
    quantity: number;
    amountTotal: number;
    status: string;
    customerQuestId: number;
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


