import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";
import { environment } from "../../../environments/environment";

type ValidatorResult = { doesNotContainPeriod: true };

//* value = control.value; sto9res the control's value.
//* typeof value === 'string' && value.includes('.') checks if it contains a period.

export const mustContainPeriod = (control: AbstractControl): ValidatorResult | null => {
    const value = control.value;
    return (
      typeof value === 'string' && value.includes('.')
      ? null 
      : { doesNotContainPeriod: true }
    );
};

export const required = { validators: [Validators.required] };

export const localStorageItemData: string = 'product-offer-to-pdf';
 
//* WONT WORK IN SSR
export let initialCompanyNameValue: string = '';
export let initialCompanySubtitleValue: string = '';
export let initialCompanyLogoLinkValue: string = '';
export let initialCompanyPhoneValue: string = '';
export let initialCompanyEmailValue: string = '';
export let initialCompanyLocationValue: string = '';

const savedInformation = window.localStorage.getItem(localStorageItemData);

if (savedInformation) {
  const loadedFormData = JSON.parse(savedInformation);
  
  initialCompanyNameValue = loadedFormData.name;
  initialCompanySubtitleValue = loadedFormData.subtitle;
  initialCompanyLogoLinkValue = loadedFormData.logo;
  initialCompanyPhoneValue = loadedFormData.phone;
  initialCompanyEmailValue = loadedFormData.email;
  initialCompanyLocationValue = loadedFormData.location;
  
};

//* Development and Production Form Values for Client Information and Products
export const loadClientFormValues = () => {

  const developmentClient = new FormGroup({
    customerName: new FormControl( 'My Client', required ),
    customerPhone: new FormControl( '0000 000 000', required ),
    customerEmail: new FormControl( 'email@email.com', { validators: [ Validators.required, mustContainPeriod ] } ),
  });

  const procuctionClient = new FormGroup({
    customerName: new FormControl( '', required ),
    customerPhone: new FormControl( '', required ),
    customerEmail: new FormControl( '', { validators: [ Validators.required, mustContainPeriod ] } ),
  });

  return environment.production ? procuctionClient : developmentClient;
};

export type ProductFormControl = {
    name: FormControl<string | null>;
    quantity: FormControl<number | null>;
    price: FormControl<number | null>;
};

export const loadProducts = () => {

  const developmentProducts = [];
  const productionProducts = [];

  for (let i = 0; i < 10; i++) {
    const developmentProduct = 
      new FormGroup<ProductFormControl>({
          name: new FormControl(`This is the Product Title for product #${i + 1}`, required),
          quantity: new FormControl(1, required),
          price: new FormControl(5 * i, required)
      });
      
      productionProducts.push(developmentProduct);
    }
    
    for (let i = 0; i < 2; i++) {
      const productionProduct = 
      new FormGroup<ProductFormControl>({
          name: new FormControl('', required),
          quantity: new FormControl(null, required),
          price: new FormControl(null, required)
      });

    developmentProducts.push(productionProduct);
  }

  return environment.production ? developmentProducts : productionProducts;
};
