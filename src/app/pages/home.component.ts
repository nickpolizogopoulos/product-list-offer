import {
  Component,
  OnInit,
  AfterViewInit,
  DoCheck,
  ElementRef,
  DestroyRef,
  inject,
  signal,
  computed,
  viewChild
} from "@angular/core";

import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  AbstractControl,
  FormArray,
  Validators
} from "@angular/forms";

import { debounceTime } from "rxjs";
import tippy from "tippy.js";

import {
  localStorageItemData,
  initialCompanyNameValue,
  initialCompanyLogoLinkValue,
  initialLogoWidthValue,
  initialCompanyPhoneValue,
  initialCompanyEmailValue,
  mustContainPeriod,
  initialCompanyLocationValue,
  required
} from "../utilities/tools/form-tools";

import { PDF } from "../utilities/tools/pdf.model";
import { Product } from "../utilities/tools/product.model";
import { PdfService } from "../utilities/tools/pdf.service";
import { ProductFormControl } from "../utilities/tools/product-control";
import { MaterialComponents } from "../utilities/tools/material-components";

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        MaterialComponents
    ],
    template: `
    
        <form [formGroup]="form" (ngSubmit)="onSubmit()">
            <section class="container">
                <h3>Company Information</h3>
                <section class="info-block">
                    <mat-form-field class="input-50">
                        <mat-label>Company Name</mat-label>
                        <input matInput formControlName="companyName">
                        @if (companyNameIsInvalid) {
                            <span class="error-message">Please, enter your company name</span>
                        }
                    </mat-form-field>
                    <mat-form-field class="input-50">
                    <mat-label>Logo link</mat-label>
                    <input matInput formControlName="logoLink" [disabled]="logoVisibility()" [value]="logo" (input)="onLogoChange($event)">
                    </mat-form-field>
                </section>
                <section class="info-block">
                    <mat-form-field class="input-25">
                        <mat-label>Phone</mat-label>
                        <input matInput formControlName="companyPhone">
                        @if (companyPhoneIsInvalid) {
                            <span class="error-message">Please, enter a phone number</span>
                        }
                    </mat-form-field>
                    <mat-form-field class="input-25">
                        <mat-label>Email</mat-label>
                        <input matInput formControlName="companyEmail" email>
                        @if (companyEmailIsInvalid) {
                            <span class="error-message">Please, enter a valid email</span>
                        }
                    </mat-form-field>
                    <mat-form-field class="input-50">
                        <mat-label>Location</mat-label>
                        <input matInput formControlName="companyLocation">
                        @if (companyLocationIsInvalid) {
                            <span class="error-message">Please, enter your company location</span>
                        }
                    </mat-form-field>
                </section>
                <section class="company-details">
                    <div>
                        @if (logo && !logoVisibility()) {
                            <img [src]="logo" [style.width.px]="logoWidthSignal()" style="height: auto;">
                        }
                    </div>
                    <article>
                        <h4>{{ form.controls.companyName.value }}</h4>
                        <h6>{{ form.controls.companyPhone.value }}</h6>
                        <h6>{{ form.controls.companyEmail.value }}</h6>
                        <h6>{{ form.controls.companyLocation.value }}</h6>
                    </article>
                </section>
                @if (logo) {
                    <section class="slider-switch-row">
                        <mat-slider min="100" max="400" (input)="onSliderChange($event)" [disabled]="logoVisibility()">
                            <input matSliderThumb [value]="logoWidthSignal()" formControlName="logoWidth">
                        </mat-slider>
                        <span 
                            [style.text-decoration]="logoVisibility() ? 'line-through' : ''"
                            [style.color]="logoVisibility() ? 'grey' : 'inherit'"
                        >
                            {{ logoWidthSignal() }}px
                        </span>
                        <mat-slide-toggle (click)="toggleLogoVisibility()" formControlName="logoInclude">
                            <span style="margin-left: 10px;">
                                {{ !logoVisibility() ? 'Exclude the logo from the pdf' : 'Include the logo in the pdf'}}
                            </span>
                        </mat-slide-toggle>
                    </section>
                }
            </section>
            <section class="container">
                <h3>Customer Information</h3>
                <section class="info-block" formGroupName="customer">
                    <mat-form-field class="input-50">
                        <mat-label>Name</mat-label>
                        <input matInput formControlName="customerName">
                        @if (customerNameIsInvalid) {
                            <span class="error-message">Please, enter your customer's name</span>
                        }
                    </mat-form-field>
                    <mat-form-field class="input-25">
                        <mat-label>Phone</mat-label>
                        <input matInput formControlName="customerPhone">
                        @if (customerPhoneIsInvalid) {
                            <span class="error-message">Please, enter a phone number</span>
                        }
                    </mat-form-field>
                    <mat-form-field class="input-25">
                        <mat-label>Email</mat-label>
                        <input matInput formControlName="customerEmail">
                        @if (customerEmailIsInvalid) {
                            <span class="error-message">Please, enter a valid email</span>
                        }
                    </mat-form-field>
                    </section>
            </section>
            <section class="container" formArrayName="products">
                <section class="products-header">
                    <h3>Product List</h3>
                    <button #addtip (click)="onAddProduct()" type="button" class="icon-btn add">
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                        </svg>
                    </button>
                </section>
                @for (product of allProducts; track product) {
                    <section class="info-block" [formGroupName]="$index">
                        <mat-form-field class="input-50">
                            <mat-label>Product name</mat-label>
                            <input matInput formControlName="name">
                            @if (product.controls.name.invalid && product.controls.name.touched) {
                                <span class="error-message">Please, enter a product or delete the product if not needed.</span>
                            }
                        </mat-form-field>
                        <mat-form-field class="input-25">
                            <mat-label>Quantity</mat-label>
                            <mat-select formControlName="quantity" type="number">
                                @for ( option of allQtyOptions; track $index ) {
                                    <mat-option [value]="option">{{ option }}</mat-option>
                                }
                            </mat-select>
                            @if (product.controls.quantity.invalid && product.controls.quantity.touched) {
                                <span class="error-message">Please, add quantity.</span>
                            }
                        </mat-form-field>
                        <mat-form-field class="input-25">
                            <mat-label>Total Price €</mat-label>
                            <input matInput formControlName="price" type="number">
                            @if (product.controls.price.invalid && product.controls.price.touched) {
                                <span class="error-message">Please, add product price.</span>
                            }
                        </mat-form-field>
                        <button (click)="onDeleteProduct($index)" type="button" class="icon-btn delete">
                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                            </svg>
                        </button>
                        <mat-divider />
                    </section>
                }
                @if (formIsInvalid) {
                    <p class="form-error-message">Please make sure all fields are filled correctly!</p>
                }
                <button mat-raised-button>Generate .pdf</button>
            </section>
        </form>
    
    `
})
export class HomeComponent
implements 
OnInit,
AfterViewInit,
DoCheck
{

  private destroyRef = inject(DestroyRef);
  private pdfService = inject(PdfService);
  private addtip = viewChild.required<ElementRef>('addtip');

  ngAfterViewInit():void {
    tippy(
        this.addtip().nativeElement,
        {
            content: 'Add new product row',
            placement: 'right',
            theme: 'btntip',
            duration: [400, 50],
        }
    );
  }

  ngDoCheck() {
    this.pdfService.fetchLogo(
      this.form.controls.logoLink.value!,
      //* dividing by 5 -temporarily.
      this.form.controls.logoWidth.value! / 5,
    );
  }

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
    this.destroyRef.onDestroy(() => subscription.unsubscribe() );
  }

  form = new FormGroup({
    companyName: new FormControl(initialCompanyNameValue, required),
    logoLink: new FormControl(initialCompanyLogoLinkValue),
    logoWidth: new FormControl(initialLogoWidthValue),
    logoInclude: new FormControl(true, required),
    companyPhone: new FormControl(initialCompanyPhoneValue, required),
    companyEmail: new FormControl(initialCompanyEmailValue, { validators: [Validators.required, mustContainPeriod] }),
    companyLocation: new FormControl(initialCompanyLocationValue, required),

    customer: new FormGroup({
      customerName: new FormControl('Customer Name', required),
      customerPhone: new FormControl('2610 222 223', required),
      customerEmail: new FormControl('email@email.com', { validators: [ Validators.required, mustContainPeriod ] }),
    }),
      
    products: new FormArray([
      new FormGroup({
        name: new FormControl('Product #1', required),
        quantity: new FormControl('10', required),
        price: new FormControl(100, required)
      })
    ])
  });

  logo = this.form.controls.logoLink.value!;
  logoWidthSignal = signal<number>(this.form.controls.logoWidth.value!);
  logoVisibility = signal<boolean>(false);

  onSliderChange( event: any ) {
    const userWidth = event.target.value;
    this.logoWidthSignal.set(userWidth);
  }

  onLogoChange( event: Event ): void {
    const inputElement = event.target as HTMLInputElement | null;
    if (inputElement)
      this.logo = inputElement.value;
  }

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
      this.form.controls.customer.controls.customerName.invalid &&
      this.form.controls.customer.controls.customerName.touched
    );
  }
  get customerPhoneIsInvalid(): boolean {
    return (
      this.form.controls.customer.controls.customerPhone.invalid &&
      this.form.controls.customer.controls.customerPhone.touched
    );
  }
  get customerEmailIsInvalid(): boolean {
    return (
      this.form.controls.customer.controls.customerEmail.invalid &&
      this.form.controls.customer.controls.customerEmail.touched
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
      name: new FormControl('', required),
      quantity: new FormControl('', required),
      price: new FormControl(0, required)
    });
    const products = this.form.controls.products;
    products.push(productGroup);
  }

  onDeleteProduct( index: number ): void {
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
    const logoIncluded = this.form.controls.logoInclude.value!;
    const companyPhone = this.form.controls.companyPhone.value!;
    const companyEmail = this.form.controls.companyEmail.value!;
    const companyLocation = this.form.controls.companyLocation.value!;
    const customerName = this.form.controls.customer.controls.customerName.value!;
    const customerPhone = this.form.controls.customer.controls.customerPhone.value!;
    const customerEmail = this.form.controls.customer.controls.customerEmail.value!;

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
      logoIncluded,
      companyPhone,
      companyEmail,
      companyLocation,
      customerName,
      customerPhone,
      customerEmail,
      products(),
      subtotal()
    );

    // console.log(pdf);
    this.pdfService.generatePDF(pdf);
  }

}
