import {
  Component,
  OnInit,
  AfterViewInit,
  ElementRef,
  DestroyRef,
  inject,
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

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        MaterialComponents
    ],
    template: `
    
        <form [formGroup]="form" (ngSubmit)="onSubmit()">

            <!--//! ================== COMPANY INFORMATION -->
            <section class="container">
                <h3>Company Information</h3>
                <section class="info-block">
                    <mat-form-field class="input-50">
                      <mat-label>Company Name</mat-label>
                      <input matInput formControlName="companyName">
                    </mat-form-field>
                    <!-- @if (companyNameIsInvalid) {
                      <span class="error-message">Please, enter your company name</span>
                    } -->
                    <mat-form-field class="input-50">
                      <mat-label>Company Subtitle (optional)</mat-label>
                      <input matInput formControlName="companySubtitle">
                    </mat-form-field>
                </section>
                <section class="info-block">
                    <mat-form-field class="input-25">
                        <mat-label>Phone</mat-label>
                        <input matInput formControlName="companyPhone">
                        <!-- @if (companyPhoneIsInvalid) {
                            <span class="error-message">Please, enter a phone number</span>
                        } -->
                    </mat-form-field>
                    <mat-form-field class="input-25">
                        <mat-label>Email</mat-label>
                        <input matInput formControlName="companyEmail" email>
                        <!-- @if (companyEmailIsInvalid) {
                            <span class="error-message">Please, enter a valid email</span>
                        } -->
                    </mat-form-field>
                    <mat-form-field class="input-50">
                        <mat-label>Location</mat-label>
                        <input matInput formControlName="companyLocation">
                        <!-- @if (companyLocationIsInvalid) {
                            <span class="error-message">Please, enter your company location</span>
                        } -->
                    </mat-form-field>
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

            <!--//! ================== CUSTOMER INFORMATION -->
            <section class="container">
                <h3>Client Information</h3>
                <section class="info-block" formGroupName="customer">
                    <mat-form-field class="input-50">
                        <mat-label>Name</mat-label>
                        <input matInput formControlName="customerName">
                        <!-- @if (customerNameIsInvalid) {
                            <span class="error-message">Please, enter your customer's name</span>
                        } -->
                    </mat-form-field>
                    <mat-form-field class="input-25">
                        <mat-label>Phone</mat-label>
                        <input matInput formControlName="customerPhone">
                        <!-- @if (customerPhoneIsInvalid) {
                            <span class="error-message">Please, enter a phone number</span>
                        } -->
                    </mat-form-field>
                    <mat-form-field class="input-25">
                        <mat-label>Email</mat-label>
                        <input matInput formControlName="customerEmail">
                        <!-- @if (customerEmailIsInvalid) {
                            <span class="error-message">Please, enter a valid email</span>
                        } -->
                    </mat-form-field>
                </section>
            </section>
            
            <!--//! ================== PRODUCT LIST -->
            <section class="container" formArrayName="products">
                <section class="products-header">
                    <h3>Product List</h3>
                    <button #addProductTooltip (click)="onAddProduct()" type="button" class="icon-btn add">
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
                            <!-- @if (product.controls.name.invalid && product.controls.name.touched) {
                                <span class="error-message">Please, enter a product or delete the product if not needed.</span>
                            } -->
                        </mat-form-field>
                        <mat-form-field class="input-25">
                            <mat-label>Quantity</mat-label>
                            <mat-select formControlName="quantity" type="number">
                                @for ( option of allQtyOptions; track $index ) {
                                    <mat-option [value]="option">{{ option }}</mat-option>
                                }
                            </mat-select>
                            <!-- @if (product.controls.quantity.invalid && product.controls.quantity.touched) {
                                <span class="error-message">Please, add quantity.</span>
                            } -->
                        </mat-form-field>
                        <mat-form-field class="input-25">
                            <mat-label>Total Price €</mat-label>
                            <input matInput formControlName="price" type="number">
                            <!-- @if (product.controls.price.invalid && product.controls.price.touched) {
                                <span class="error-message">Please, add product price.</span>
                            } -->
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
export class HomeComponent implements OnInit, AfterViewInit {

  private destroyRef = inject(DestroyRef);

  private pdfService = inject(PdfService);
  private addProductTooltip = viewChild.required<ElementRef>('addProductTooltip');

  ngAfterViewInit():void {
    this.initialiseTippy();
  }
  
  initialiseTippy(): void {
    tippy(
        this.addProductTooltip().nativeElement,
        {
            content: 'Add new product row',
            placement: 'right',
            theme: 'btntip',
            duration: [400, 50],
        }
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
      customerName: new FormControl('', required),
      customerPhone: new FormControl('', required),
      customerEmail: new FormControl('', { validators: [ Validators.required, mustContainPeriod ] }),
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

  get allQtyOptions(): string[] {
    return [...this.qtyOptions()];
  }

  private qtyOptions = computed(() => {
    const options: string[] = [];

    for (let i = 1; i <= 50; i++)
      options.push(i.toString());

    return options;
  });

  //* COMPANY CHECKS
  get companyNameIsInvalid(): boolean {
    return (
      this.form.controls.companyName.invalid ||
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
      companySubtitle,
      companyPhone,
      companyEmail,
      companyLocation,
      customerName,
      customerPhone,
      customerEmail,
      products(),
      subtotal()
    );

    this.pdfService.generatePDF(pdf);
  }

}