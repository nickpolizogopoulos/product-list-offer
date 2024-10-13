import { FormControl } from "@angular/forms";

export type ProductFormControl = {
    name: FormControl<string | null>;
    quantity: FormControl<string | null>;
    price: FormControl<number | null>;
}
