import {
  Component,
  computed,
  DestroyRef,
  inject,
  OnInit,
  signal
} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { debounceTime } from 'rxjs';

import { MaterialComponents } from './utilities/tools/material-components';
import 
{ 
  initialCompanyEmailValue,
  initialCompanyLocationValue,
  initialCompanyLogoLinkValue,
  initialLogoWidthValue,
  initialCompanyNameValue,
  initialCompanyPhoneValue,
  localStorageItemData,
  mustContainPeriod
} from './utilities/tools/form-tools';
import { FooterComponent } from './components/footer.component';
import { HeaderComponent } from './components/header.component';
import { ProductFormControl } from './utilities/tools/product-control';
import { Product } from './utilities/tools/product.model';
import { PDF } from './utilities/tools/pdf.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    HeaderComponent,
    FooterComponent,
    MaterialComponents
  ],
  // template: ``,
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    const subscription = this.form.valueChanges
      .pipe( debounceTime(400) )
      .subscribe({
        next: value => {
          window.localStorage.setItem(
            localStorageItemData,
            JSON.stringify({
              name: value.companyName,
              logo: value.logoLink,
              phone: value.companyPhone,
              email: value.companyEmail,
              location: value.companyLocation,
              logoWidth: value.logoWidth,
              logoInclude: value.logoInclude
            })
          );
        }
    });
    //* optional - component does not dismount.
    this.destroyRef.onDestroy(() => subscription.unsubscribe() );
  }

  form = new FormGroup({
    companyName: new FormControl(initialCompanyNameValue, { validators: [Validators.required]}),
    logoLink: new FormControl(initialCompanyLogoLinkValue),
    logoWidth: new FormControl(initialLogoWidthValue),
    logoInclude: new FormControl(true, { validators: [Validators.required]}),
    companyPhone: new FormControl(initialCompanyPhoneValue, { validators: [Validators.required]}),
    companyEmail: new FormControl(initialCompanyEmailValue, { validators: [Validators.required, mustContainPeriod]}),
    companyLocation: new FormControl(initialCompanyLocationValue, { validators: [Validators.required]}),

    customerName: new FormControl('', { validators: [Validators.required]}),
    customerPhone: new FormControl('', { validators: [Validators.required]}),
    customerEmail: new FormControl('', { validators: [Validators.required, mustContainPeriod]}),

    products: new FormArray([
      new FormGroup({
        name: new FormControl('', { validators: [ Validators.required]}),
        quantity: new FormControl('', { validators: [ Validators.required]}),
        price: new FormControl(0, { validators: [ Validators.required]})
      })
    ])
  });
  
  logo = this.form.controls.logoLink.value!;
  logoWidthSignal = signal<number>(this.form.controls.logoWidth.value!);
  
  onSliderChange(event: any) {
    const userWidth = event.target.value;
    this.logoWidthSignal.set(userWidth);
  }

  onLogoChange( event: Event ): void {
    const inputElement = event.target as HTMLInputElement | null;
    if (inputElement)
      this.logo = inputElement.value;
  }

  logoVisibility = signal<boolean>(false);

  toggleLogoVisibility() {
    if (this.logoVisibility())
      this.form.controls.logoLink.enable();
    else
      this.form.controls.logoLink.disable();

    this.logoVisibility.update(state => !state);
  }


  get allQtyOptions(): string[] {
    return [...this.qtyOptions()];
  }

  private qtyOptions = computed(() => {
    const options: string[] = [];
    for (let i = 1; i <= 50; i++) {
      options.push(i.toString());
    }
    return options;
  });
  
  //* COMPANY CHECKS
  get companyNameIsInvalid(): boolean {
    return (
      this.form.controls.companyName.invalid &&
      this.form.controls.companyName.touched
    );
  }
  get companyPhoneIsInvalid(): boolean {
    return (
      this.form.controls.companyPhone.invalid &&
      this.form.controls.companyPhone.touched
    );
  }
  get companyEmailIsInvalid(): boolean {
    return (
      this.form.controls.companyEmail.invalid &&
      this.form.controls.companyEmail.touched
    );
  }
  get companyLocationIsInvalid(): boolean {
    return (
      this.form.controls.companyLocation.invalid &&
      this.form.controls.companyLocation.touched
    );
  }
  
  //* CUSTOMER CHECKS
  get customerNameIsInvalid(): boolean {
    return (
      this.form.controls.customerName.invalid &&
      this.form.controls.customerName.touched
    );
  }
  get customerPhoneIsInvalid(): boolean {
    return (
      this.form.controls.customerPhone.invalid &&
      this.form.controls.customerPhone.touched
    );
  }
  get customerEmailIsInvalid(): boolean {
    return (
      this.form.controls.customerEmail.invalid &&
      this.form.controls.customerEmail.touched
    );
  }
  
  //* FORM CHECK
  get formIsInvalid(): boolean {
    return (
      this.form.invalid &&
      this.form.touched
    );
  }

  get allProducts(): FormGroup<ProductFormControl>[] {
    const products = this.form.controls.products;
    return products.controls;
  }

  onAddProduct(): void {
    const productGroup = new FormGroup({
      name: new FormControl('', { validators: [Validators.required]}),
      quantity: new FormControl('', { validators: [Validators.required]}),
      price: new FormControl(0, { validators: [Validators.required]})
    });
    const products = this.form.controls.products;
    products.push(productGroup);
  }

  onDeleteProduct(index: number): void {
    const products = this.form.controls.products as FormArray;
    products.removeAt(index);
  }


  onSubmit(): void {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const companyName = this.form.controls.companyName.value!;
    const logoLink = this.form.controls.logoLink.value!;
    const logoWidth = this.form.controls.logoWidth.value!;
    const logoInclude = this.form.controls.logoInclude.value!;
    const companyPhone = this.form.controls.companyPhone.value!;
    const companyEmail = this.form.controls.companyEmail.value!;
    const companyLocation = this.form.controls.companyLocation.value!;
    const customerName = this.form.controls.customerName.value!;
    const customerPhone = this.form.controls.customerPhone.value!;
    const customerEmail = this.form.controls.customerEmail.value!;

    const products = (): Product[] => {
      const products: Product[] = [];
      this.form.controls.products.controls.forEach((productGroup: AbstractControl) => {

        const product = (productGroup as FormGroup).value as Product;
        
        products.push(
          new Product(
            product.name,
            product.quantity,
            product.price
          )
        );

      });
    
      return products;
    };

    const subtotal = (): number => {
      let total = 0;

      this.form.controls.products.controls.forEach((productGroup: AbstractControl) => {
        const product = (productGroup as FormGroup).value;
        total += product.price;
      });

      return total;
    };

    const pdf = new PDF(
      companyName,
      logoLink,
      logoWidth,
      logoInclude,
      companyPhone,
      companyEmail,
      companyLocation,
      customerName,
      customerPhone,
      customerEmail,
      products(),
      subtotal()
    );

    console.log(pdf);

  }

}
