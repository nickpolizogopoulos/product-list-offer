import { type Product } from "./product.model";

export class PDF {

    constructor (
        public companyName: string,
        public companySubtitle: string,
        public companyPhone: string,
        public companyEmail: string,
        public companyLocation: string,
        public customerName: string,
        public customerPhone: string,
        public customerEmail: string,
        public products: Product[],
        public productsQuantity: number,
        public subtotal: number,
        public notes?: string,
        public expirationDate?: Date,
    ) {}

}
