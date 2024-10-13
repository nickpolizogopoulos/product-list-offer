import { Product } from "./product.model";

export class PDF {

    constructor (
        public companyName: string,
        public logoLink: string,
        public logoWidth: number,
        public logoInclude: boolean,
        public companyPhone: string,
        public companyEmail: string,
        public companyLocation: string,
        public customerName: string,
        public customerPhone: string,
        public customerEmail: string,
        public products: Product[],
        public subtotal: number
    ) {}

}
