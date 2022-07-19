import { Customer } from "./customer.model";

export interface CustomerPage {
    message: string;
    data: Customer[];
    pagination: string;
    status: string;
}

export interface CustomerPageProfile {
    message: string;
    data: Customer;
    pagination: string;
    status: string;
}
