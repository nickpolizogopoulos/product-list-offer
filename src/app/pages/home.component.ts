import {
  Component,
  OnInit,
  DestroyRef,
  inject,
  signal,
  effect
} from "@angular/core";
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  AbstractControl,
  FormArray,
  Validators
} from "@angular/forms";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

import { debounceTime } from "rxjs";

import {
  localStorageItemData,
  initialCompanyNameValue,
  initialCompanySubtitleValue,
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
import tippy from "tippy.js";
import { AddRemoveButton } from "../utilities/components/add-remove-button.component";

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        AddRemoveButton,
        MaterialComponents
    ],
    template: `
    
        <form [formGroup]="form" (ngSubmit)="onSubmit()">

            <section class="container">
                <h3>Company Information</h3>
                <section class="info-block">
                    <div class="input-50">
                        <mat-form-field>
                            <mat-label>Company Name</mat-label>
                            <input matInput formControlName="companyName">
                        </mat-form-field>
                        @if (companyNameIsInvalid) {
                            <span class="error-message">Please, enter your company name</span>
                        }
                    </div>
                    <div class="input-50">
                        <mat-form-field>
                            <mat-label>Company Subtitle (optional)</mat-label>
                            <input matInput formControlName="companySubtitle">
                        </mat-form-field>
                    </div>
                </section>
                <section class="info-block">
                    <div class="input-25">
                        <mat-form-field>
                            <mat-label>Phone</mat-label>
                            <input matInput formControlName="companyPhone">
                        </mat-form-field>
                        @if (companyPhoneIsInvalid) {
                            <span class="error-message">Please, enter a phone number</span>
                        }
                    </div>
                    <div class="input-25">
                        <mat-form-field>
                            <mat-label>Email</mat-label>
                            <input matInput formControlName="companyEmail" email>
                        </mat-form-field>
                        @if (companyEmailIsInvalid) {
                            <span class="error-message">Please, enter a valid email</span>
                        }
                    </div>
                    <div class="input-50">
                        <mat-form-field>
                            <mat-label>Location</mat-label>
                            <input matInput formControlName="companyLocation">
                        </mat-form-field>
                        @if (companyLocationIsInvalid) {
                            <span class="error-message">Please, enter your company location</span>
                        }
                    </div>
                </section>
                <section class="company-details information-headings">
                    <article>
                        <h4>{{ form.controls.companyName.value }}</h4>
                        <h5>{{ form.controls.companySubtitle.value }}</h5>
                        <h6>{{ form.controls.companyPhone.value }}</h6>
                        <h6>{{ form.controls.companyEmail.value }}</h6>
                        <h6>{{ form.controls.companyLocation.value }}</h6>
                    </article>
                    <article>
                        <h4>{{ form.controls.customer.controls.customerName.value }}</h4>
                        <h6>{{ form.controls.customer.controls.customerPhone.value }}</h6>
                        <h6>{{ form.controls.customer.controls.customerEmail.value }}</h6>
                    </article>
                </section>
            </section>

            <section class="container">
                <h3>Client Information</h3>
                <section class="info-block" formGroupName="customer">
                    <div class="input-50">
                        <mat-form-field>
                            <mat-label>Name</mat-label>
                            <input matInput formControlName="customerName">
                        </mat-form-field>
                        @if (customerNameIsInvalid) {
                            <span class="error-message">Please, enter your customer's name</span>
                        }
                    </div>
                    <div class="input-25">
                        <mat-form-field>
                            <mat-label>Phone</mat-label>
                            <input matInput formControlName="customerPhone">
                        </mat-form-field>
                        @if (customerPhoneIsInvalid) {
                            <span class="error-message">Please, enter a phone number</span>
                        }
                    </div>
                    <div class="input-25">
                        <mat-form-field>
                            <mat-label>Email</mat-label>
                            <input matInput formControlName="customerEmail">
                        </mat-form-field>
                        @if (customerEmailIsInvalid) {
                            <span class="error-message">Please, enter a valid email</span>
                        }
                    </div>
                </section>
            </section>

            <section class="container" formArrayName="products">
                <section class="products-header">
                    <h3>Product List</h3>
                    <app-add-remove-button buttonType="add" (click)="onAddProduct()" />
                </section>
                @for (product of allProducts; track product) {
                    <section class="info-block" [formGroupName]="$index">
                        <h5>{{ $index + 1 }}<span>.</span></h5>
                        <div class="input-50">
                            <mat-form-field>
                                <mat-label>Product name</mat-label>
                                <input matInput formControlName="name">
                            </mat-form-field>
                            @if (product.controls.name.invalid && product.controls.name.touched) {
                                <span class="error-message">Please, enter a product or delete the product if not needed.</span>
                            }
                        </div>
                        <div class="input-25">
                            <mat-form-field>
                                <mat-label>Quantity</mat-label>
                                <mat-select formControlName="quantity" type="number">
                                    @for ( option of qtyOptions; track $index ) {
                                        <mat-option [value]="option">{{ option }}</mat-option>
                                    }
                                </mat-select>
                            </mat-form-field>
                            @if (product.controls.quantity.invalid && product.controls.quantity.touched) {
                                <span class="error-message">Please, add quantity.</span>
                            }
                        </div>
                        <div class="input-25">
                            <mat-form-field>
                                <mat-label>Unit Price €</mat-label>
                                <input matInput formControlName="price" type="number">
                            </mat-form-field>
                            @if (product.controls.price.invalid && product.controls.price.touched) {
                                <span class="error-message">Please, add product price.</span>
                            }
                        </div>
                        <app-add-remove-button buttonType="delete" (click)="onDeleteProduct($index)" />
                        <mat-divider />
                    </section>
                }

                <section class="products-header products-header-mobile">
                  <h5>Add Product</h5>
                  <app-add-remove-button buttonType="add" (click)="onAddProduct()" />
                </section>

                <mat-radio-group [value]="selectedRadioOption()" (change)="onOptionChange($event.value)" aria-label="Select an option">
                  <mat-radio-button color="primary" value="1">Normal Print (coloured table)</mat-radio-button>
                  <mat-radio-button color="primary" value="2">Remove colours (saves ink)</mat-radio-button>
                </mat-radio-group>
                
                <section class="submit-section">
                    @if (formIsInvalid) {
                        <p class="form-error-message">Please make sure all fields are filled correctly!</p>
                    }
                    <button type="submit" mat-raised-button>Generate .pdf</button>
                </section>
            </section>

        </form>
    
    `
})
export class HomeComponent implements OnInit {

  private destroyRef = inject(DestroyRef);
  private pdfService = inject(PdfService);
  
  selectedRadioOption = signal('1');

  onOptionChange(value: string) {
    this.selectedRadioOption.set(value);
  }

  constructor() {
    effect(
      () => this.pdfService.setPrintOption( this.selectedRadioOption() ),
      { allowSignalWrites: true }
    );
  }
  
  ngOnInit(): void {
    this.form.valueChanges
      .pipe(
        debounceTime(400),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: value => {
          window.localStorage.setItem(
            localStorageItemData,
            JSON.stringify({
              name: value.companyName,
              subtitle: value.companySubtitle,
              phone: value.companyPhone,
              email: value.companyEmail,
              location: value.companyLocation,
            })
          );
        }
      });
  }


  form = new FormGroup({
    companyName: new FormControl(initialCompanyNameValue, required),
    companySubtitle: new FormControl(initialCompanySubtitleValue),
    companyPhone: new FormControl(initialCompanyPhoneValue, required),
    companyEmail: new FormControl(initialCompanyEmailValue, { validators: [Validators.required, mustContainPeriod] }),
    companyLocation: new FormControl(initialCompanyLocationValue, required),

    customer: new FormGroup({
      customerName: new FormControl('My Client', required),
      customerPhone: new FormControl('0000 000 000', required),
      customerEmail: new FormControl('client@client.com', { validators: [ Validators.required, mustContainPeriod ] }),
    }),
    
    products: new FormArray([
      new FormGroup({
        name: new FormControl('Product #1', required),
        quantity: new FormControl('10', required),
        price: new FormControl(100, required)
      }),
      new FormGroup({
        name: new FormControl('Product #2', required),
        quantity: new FormControl('5', required),
        price: new FormControl(80, required)
      })
    ])
  });

  get qtyOptions(): string[] {
    const options: string[] = [];

    for (let i = 1; i <= 50; i++)
      options.push(i.toString());

    return options;
  }

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
    const companySubtitle = this.form.controls.companySubtitle.value!;
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

    const productArray = this.form.controls.products.controls;

    const subtotal = (): number => {
      let totalPrice = 0;

      productArray.forEach((productGroup: AbstractControl) => {
        const product = (productGroup as FormGroup).value;
        totalPrice += product.price * product.quantity;
      });
      return totalPrice;
    };

    const productsQuantity = (): number => {
      let totalProductQuantity = 0;

      productArray.forEach((productGroup: AbstractControl) => {
        const product = (productGroup as FormGroup).value;
        totalProductQuantity += +product.quantity;
      });
      return totalProductQuantity;
    }

    const pdf = new PDF(
      companyName,
      companySubtitle,
      companyPhone,
      companyEmail,
      companyLocation,
      customerName,
      customerPhone,
      customerEmail,
      products(),
      productsQuantity(),
      subtotal()
    );

    this.pdfService.generatePDF(pdf);
  }

}