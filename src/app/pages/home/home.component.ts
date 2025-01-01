import {
  Component,
  OnInit,
  DestroyRef,
  inject,
  signal,
  effect,
  computed
} from "@angular/core";
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  AbstractControl,
  FormArray,
  Validators
} from "@angular/forms";
import { Router } from "@angular/router";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

import { debounceTime } from "rxjs";

import {
  MAT_DATE_LOCALE,
  provideNativeDateAdapter
} from "@angular/material/core";

import {
  localStorageItemData,
  initialCompanyNameValue,
  initialCompanySubtitleValue,
  initialCompanyPhoneValue,
  initialCompanyEmailValue,
  mustContainPeriod,
  initialCompanyLocationValue,
  required
} from "../../utilities/tools/form-tools";

import { PDF } from "../../utilities/tools/pdf.model";
import { Product } from "../../utilities/tools/product.model";
import { PdfService } from "../../utilities/services/pdf.service";
import { MaterialComponents } from "../../utilities/tools/material-components";
import { AddRemoveButton } from "../../utilities/components/add-remove-button.component";
import { ErrorMessageComponent } from "../../utilities/components/error-message.component";
import { LanguageSwitchComponent } from "../../utilities/components/language-switch.component";
import { type ProductFormControl } from "../../utilities/tools/product-control";
import { type ColourOption } from "../../utilities/tools/types";

import { HeroSectionComponent } from "../../utilities/components/hero-section.component";

@Component({
    selector: 'app-home',
    standalone: true,
    providers: [
      provideNativeDateAdapter(),
      { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
    ],
    imports: [
    ReactiveFormsModule,
    ErrorMessageComponent,
    AddRemoveButton,
    LanguageSwitchComponent,
    MaterialComponents,
    HeroSectionComponent
],
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  constructor() {

    //* for the textarea rows
    effect(() =>
      window.addEventListener(
        'resize',
        () => this.windowWidth.set(window.outerWidth)
      )
    );
        
    effect(() => 
      this.pdfService.setPrintOption( this.printOption() )
    );

    //* enable - disable the expiration date input based on radio button selection.
    //* add validator required if the 'expires' radio is selected. 
    effect(() => {
      const expirationDateControl = this.form.get('expirationDate');

      if (this.theOfferHasExpirationDate() === 'expires') {
        expirationDateControl?.enable();
        expirationDateControl?.addValidators(Validators.required);
      }
      else {
        expirationDateControl?.disable();
        expirationDateControl?.clearValidators();
      }

      expirationDateControl?.updateValueAndValidity();
    });
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

  private destroyRef = inject(DestroyRef);
  private router = inject(Router);

  onGetStarted(): void {
    this.router.navigateByUrl('#get-started')
  }
  
  private pdfService = inject(PdfService);

  //* textarea more rows on mobile
  private windowWidth = signal<number>(window.outerWidth);

  textareaRows = computed<number>(
    () => this.windowWidth() < 800 ? 5 : 3
  );
  
  printOption = signal<ColourOption>('withColour');
  
  onColouredPdfOptionChange(value: ColourOption) {
    this.printOption.set(value);
  }
  
  theOfferHasExpirationDate = signal<'expires' | 'permanent'>('permanent');

  onExpirationChange(value: 'expires' | 'permanent'): void {

    if (this.theOfferHasExpirationDate() === 'expires')
      this.form.controls.expirationDate.setValue(null);

    this.theOfferHasExpirationDate.set(value);

  }

  notesEnabled = signal<boolean>(false);

  onNotesSelected(): void {
    if (this.notesEnabled() === true)
      this.form.controls.notes.setValue(null);
    
    this.notesEnabled.set(!this.notesEnabled());
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

    expirationDate: new FormControl<Date | null>(null),
    notes: new FormControl(''),
    
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

  //* DATE CHECK
  get dateIsInvalid(): boolean {
    return (
      this.form.controls.expirationDate.invalid && 
      this.form.controls.expirationDate.touched 
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
    const notes = this.form.controls.notes.value!;
    const expirationDate = this.form.controls.expirationDate.value!;

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
      subtotal(),
      notes,
      expirationDate
    );

    this.pdfService.generatePDF(pdf);
  }

}