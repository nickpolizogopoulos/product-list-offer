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
  initialCompanyNameValue,
  initialCompanySubtitleValue,
  initialCompanyPhoneValue,
  initialCompanyEmailValue,
  initialCompanyLocationValue,
  localStorageItemData,
  emailFormatValidator,
  required,
  loadClientFormValues,
  loadProducts,
  type ProductFormControl
} from "../../utilities/tools/form-tools";
import { PDF } from "../../utilities/tools/pdf.model";
import { Product } from "../../utilities/tools/product.model";
import { PdfService } from "../../utilities/services/pdf.service";
import { MaterialComponents } from "../../utilities/tools/material-components";
import { ProductListActionButtonComponent } from "../../utilities/components/product-list-action-button.component";
import { HeroSectionComponent } from "../../utilities/components/hero-section/hero-section.component";
import { type ColourOption } from "../../utilities/services/language/types";

import { LanguageService } from "../../utilities/services/language/language.service";
import {
  type Orientation,
  type HomeContent, 
  type OfferExpirationOption
} from "./content/types";
import { greek } from "./content/greek";
import { english } from "./content/english";
import { spanish } from "./content/spanish";
import { french } from "./content/french";
import { italian } from "./content/italian";
import { russian } from "./content/russian";
import { korean } from "./content/korean";

@Component({
  selector: 'app-home',
  standalone: true,
  providers: [
      provideNativeDateAdapter(),
      { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ],
  imports: [
      ReactiveFormsModule,
      ProductListActionButtonComponent,
      MaterialComponents,
      HeroSectionComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  host: {
    '(window: resize)': 'onWindowResize()'
  }
})
export class HomeComponent implements OnInit {

  private destroyRef = inject(DestroyRef);
  private router = inject(Router);

  private languageService = inject(LanguageService);

  constructor() {

    this.setButtonOrientation();

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
  
    effect(() => 
      this.pdfService.setOrientation( this.selectedOrientation() )
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
      .subscribe(value =>
        window.localStorage.setItem(
          localStorageItemData,
          JSON.stringify({
            name: value.companyName,
            subtitle: value.companySubtitle,
            phone: value.companyPhone,
            email: value.companyEmail,
            location: value.companyLocation,
          })
        )
      );
  }

  get content(): HomeContent {
    const language = this.languageService;
    return (
          language.isGreek()   ? { ...greek }
        : language.isEnglish() ? { ...english }
        : language.isSpanish() ? { ...spanish }
        : language.isFrench()  ? { ...french }
        : language.isItalian() ? { ...italian }
        : language.isRussian() ? { ...russian }
        : { ...korean }
    );
  }

  onGetStarted(): void {
    this.router.navigateByUrl('#get-started')
  }
  
  private pdfService = inject(PdfService);

  //* textarea more rows on mobile
  private windowWidth = signal<number>(window.outerWidth);

  textareaRows = computed<number>(() =>
    this.windowWidth() < 800 ? 5 : 3
  );
  
  printOption = signal<ColourOption>('withColour');
  selectedOrientation = signal<Orientation>('vertical');
  
  onColouredPdfOptionChange(value: ColourOption) {
    this.printOption.set(value);
  }

  onOrientationChange(value: Orientation) {
    this.selectedOrientation.set(value);
  }
  
  theOfferHasExpirationDate = signal<OfferExpirationOption>('permanent');

  onExpirationChange(value: OfferExpirationOption): void {

    if (this.theOfferHasExpirationDate() === 'expires')
      this.form.controls.expirationDate.setValue(null);

    this.theOfferHasExpirationDate.set(value);

  }

  notesEnabled = signal<boolean>(false);

  onNotesSelected(): void {
    if (this.notesEnabled())
      this.form.controls.notes.setValue(null);
    
    this.notesEnabled.set(!this.notesEnabled());
  }

  private howManyLinesInTextArea = signal<number>(1);

  //* calculates the textarea textlines and stores the number in line 203;
  trackTextareaLines(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;

    const lineHeight = parseInt(getComputedStyle(textarea).lineHeight, 10);
    const scrollHeight = textarea.scrollHeight;

    this.howManyLinesInTextArea.set(Math.ceil(scrollHeight / lineHeight));

    this.pdfService.updateTextareaLines(this.howManyLinesInTextArea());
  }

  form = new FormGroup({

    companyName: new FormControl(initialCompanyNameValue, required),
    companySubtitle: new FormControl(initialCompanySubtitleValue),
    companyPhone: new FormControl(initialCompanyPhoneValue, required),
    companyEmail: new FormControl(initialCompanyEmailValue, { validators: [Validators.required, emailFormatValidator] }),
    companyLocation: new FormControl(initialCompanyLocationValue, required),

    customer: loadClientFormValues(),

    expirationDate: new FormControl<Date | null>(null),
    notes: new FormControl(null),
    
    products: new FormArray( loadProducts() )
  });

  get qtyOptions() {
    const options = [];

    for (let i = 1; i <= 50; i++)
      options.push(i);

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
    return products.controls as FormGroup<ProductFormControl>[];
  }

  onAddProduct(): void {
    this.theListIsEmpty.set(false);

    const productGroup = new FormGroup({
      name: new FormControl(null, required),
      quantity: new FormControl(null, required),
      price: new FormControl(null, required)
    });

    const products = this.form.controls.products;
    products.push(productGroup as FormGroup);
  }

  onDeleteProduct( index: number ): void {
    const products = this.form.controls.products as FormArray;
    products.removeAt(index);
  }

  theListIsEmpty = signal<boolean>(false);

  onSubmit(): void {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const theProductListIsEmpty = this.form.controls.products.length < 1;
    
    if (theProductListIsEmpty) {
      this.theListIsEmpty.set(true);
      return;
    }

    this.theListIsEmpty.set(false);

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

    if (productArray.length === 0) {
      return;
    }

    const total = (): number => {
      let total = 0;

      productArray.forEach((productGroup: AbstractControl) => {
        const product = (productGroup as FormGroup).value;
        total += product.price * product.quantity;
      });

      return total;
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
      total(),
      notes,
      expirationDate
    );

    this.pdfService.generatePDF(pdf);
  }

  //* mat-button-toggle-group (document orientation) for smaller screens
  buttonsVertical = signal<boolean>(false);
  
  private setButtonOrientation(): void {
    const isMobile = this.windowWidth() < 660;
    this.buttonsVertical.set(isMobile);
  }
  
  private onWindowResize(): void {
    this.windowWidth.set(window.innerWidth);
    this.setButtonOrientation();
  }

}