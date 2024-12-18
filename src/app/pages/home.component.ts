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
import { PdfService } from "../utilities/services/pdf.service";
import { ProductFormControl } from "../utilities/tools/product-control";
import { MaterialComponents } from "../utilities/tools/material-components";
import { AddRemoveButton } from "../utilities/components/add-remove-button.component";
import { LanguageService } from "../utilities/services/language.service";
import { ErrorMessageComponent } from "../utilities/components/error-message.component";

import { provideNativeDateAdapter } from "@angular/material/core";

@Component({
    selector: 'app-home',
    standalone: true,
    providers: [
      provideNativeDateAdapter()
    ],
    imports: [
        ReactiveFormsModule,
        ErrorMessageComponent,
        AddRemoveButton,
        MaterialComponents
    ],
    template: `
    
        <form [formGroup]="form" (ngSubmit)="onSubmit()">

            <section class="container">
                <h3>{{ selectedLanguage() === 'greek' ? 'Πληροφορίες Εταιρείας' : 'Company Information' }}</h3>
                <section class="info-block">
                    <div class="input-50">
                        <mat-form-field>
                            <mat-label>{{ selectedLanguage() === 'greek' ? 'Όνομα Εταιρείας' : 'Company Name' }}</mat-label>
                            <input matInput formControlName="companyName">
                        </mat-form-field>
                        @if (companyNameIsInvalid) {
                            <span ErrorMessage 
                                greek="Παρακαλώ, εισάγετε όνομα εταιρείας / επωνυμία."
                                english="Please, enter your company name."
                                classes="error-message"
                            ></span>
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
                            <span ErrorMessage 
                                greek="Παρακαλώ, εισάγετε αριθμό τηλεφώνου."
                                english="Please, enter a phone number."
                                classes="error-message"
                            ></span>
                            
                        }
                    </div>
                    <div class="input-25">
                        <mat-form-field>
                            <mat-label>Email</mat-label>
                            <input matInput formControlName="companyEmail" email>
                        </mat-form-field>
                        @if (companyEmailIsInvalid) {
                            <span ErrorMessage 
                                greek="Παρακαλώ, εισάγετε σωστό email."
                                english="Please, enter a valid email."
                                classes="error-message"
                            ></span>
                        }
                    </div>
                    <div class="input-50">
                        <mat-form-field>
                            <mat-label>Location</mat-label>
                            <input matInput formControlName="companyLocation">
                        </mat-form-field>
                        @if (companyLocationIsInvalid) {
                            <span ErrorMessage 
                                greek="Παρακαλώ, εισάγετε τοποθεσία εταιρείας."
                                english="Please, enter your company location."
                                classes="error-message"
                            ></span>
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
                <h3>{{ selectedLanguage() === 'greek' ? 'Πληροφορίες Πελάτη' : 'Client Information' }}</h3>
                <section class="info-block" formGroupName="customer">
                    <div class="input-50">
                        <mat-form-field>
                            <mat-label>Name</mat-label>
                            <input matInput formControlName="customerName">
                        </mat-form-field>
                        @if (customerNameIsInvalid) {
                            <span ErrorMessage 
                                greek="Παρακαλώ, εισάγετε όνομα / επωνυμία πελάτη."
                                english="Please, enter your customer's name."
                                classes="error-message"
                            ></span>
                        }
                    </div>
                    <div class="input-25">
                        <mat-form-field>
                            <mat-label>Phone</mat-label>
                            <input matInput formControlName="customerPhone">
                        </mat-form-field>
                        @if (customerPhoneIsInvalid) {
                            <span ErrorMessage 
                                greek="Παρακαλώ, εισάγετε αριθμό τηλεφώνου."
                                english="Please, enter a phone number."
                                classes="error-message"
                            ></span>
                        }
                    </div>
                    <div class="input-25">
                        <mat-form-field>
                            <mat-label>Email</mat-label>
                            <input matInput formControlName="customerEmail">
                        </mat-form-field>
                        @if (customerEmailIsInvalid) {
                            <span ErrorMessage 
                                greek="Παρακαλώ, εισάγετε σωστό email."
                                english="Please, enter a valid email."
                                classes="error-message"
                            ></span>
                        }
                    </div>
                </section>
            </section>

            <!--// TODO PUT THIS THING IN THE FORM ===================================-->
            <section class="container">
                <section>
                    <h3>{{ selectedLanguage() === 'greek' ? 'Ρυθμίσεις προσφοράς' : 'Offer settings' }}</h3>
                    <section class="settings-block">
                        <mat-radio-group [value]="theOfferHasExpirationDate()" (change)="onExpirationChange($event.value)" aria-label="Select an option">
                            <mat-radio-button color="primary" value="permanent">
                                {{ selectedLanguage() === 'greek' ? 'Η προσφορά είναι μόνιμη' : 'The offer is valid permanently' }}
                            </mat-radio-button>
                            <mat-radio-button color="primary" value="expires">
                                {{ selectedLanguage() === 'greek' ? 'Έχει ημερομηνία λήξης' : 'Has an expiration date' }}
                            </mat-radio-button>
                        </mat-radio-group>
                        <mat-form-field>
                            <mat-label>
                                {{ selectedLanguage() === 'greek' ? 'Διαλέξτε ημερομηνία' : 'Choose a date' }}
                            </mat-label>
                            <input matInput [matDatepicker]="picker" [disabled]="theOfferHasExpirationDate() === 'permanent'">
                            <mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle>
                            <mat-datepicker #picker></mat-datepicker>
                        </mat-form-field>
                    </section>
                </section>
                <!--// TODO PUT THIS THING IN THE FORM ===================================-->


                <section class="notes-block">
                  <button (click)="onNotesSelected()" [color]="!notesEnabled() ? 'primary' : 'warn'" mat-raised-button type="button">
                    <mat-icon>{{ !notesEnabled() ? 'add' : 'remove' }}</mat-icon>
                    @if (!notesEnabled()) {
                      {{
                        selectedLanguage() === 'greek'
                        ? 'Προσθήκη σημειώσεων'
                        : 'Add notes'
                      }}
                    }
                    @else {
                      {{
                        selectedLanguage() === 'greek'
                        ? 'Κατάργηση σημειώσεων'
                        : 'Remove notes'
                      }}
                    }
                  </button>
                  @if (notesEnabled()) {
                    <mat-form-field class="example-full-width" app>
                      <mat-label>
                        {{
                          selectedLanguage() === 'greek'
                          ? 'Σημειώσεις (μέγιστο 140 χαρακτήρες)'
                          : 'Notes (maximum 140 characters)'
                        }}
                      </mat-label>
                      <textarea matInput maxlength="140" rows="2" formControlName="notes"></textarea>
                    </mat-form-field>
                  }
                </section>
            </section>

            <section class="container" formArrayName="products">
                <section class="products-header">
                    <h3>{{ selectedLanguage() === 'greek' ? 'Λίστα προϊόντων' : 'Product List' }}</h3>
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
                                <span ErrorMessage 
                                  greek="Παρακαλώ, εισάγετε όνομα προϊόντος ή διαγράψτε το προϊόν εάν δεν σας χρειάζεται."
                                  english="Please, enter product name or delete the product if not needed."
                                  classes="error-message"
                                ></span>
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
                                <span ErrorMessage 
                                  greek="Παρακαλώ, εισάγετε ποσότητα."
                                  english="Please, add quantity."
                                  classes="error-message"
                                ></span>
                            }
                        </div>
                        <div class="input-25">
                            <mat-form-field>
                                <mat-label>Unit Price €</mat-label>
                                <input matInput formControlName="price" type="number">
                            </mat-form-field>
                            @if (product.controls.price.invalid && product.controls.price.touched) {
                                <span ErrorMessage 
                                  greek="Παρακαλώ εισάγετε τιμή προϊόντος."
                                  english="Please, add product price."
                                  classes="error-message"
                                ></span>
                            }
                        </div>
                        <app-add-remove-button buttonType="delete" (click)="onDeleteProduct($index)" />
                    </section>
                }

                <section class="products-header products-header-mobile">
                    <h5>{{ selectedLanguage() === 'greek' ? 'Προσθήκη προϊόντος' : 'Add Product' }}</h5>
                    <app-add-remove-button buttonType="add" (click)="onAddProduct()" />
                </section>

                <mat-radio-group [value]="selectedRadioOption()" (change)="onOptionChange($event.value)" aria-label="Select an option">
                    <mat-radio-button color="primary" value="1">
                        {{ selectedLanguage() === 'greek' ? 'Κανονική Εκτύπωση (πίνακας με χρώμα)' : 'Normal Print (coloured table)' }}
                    </mat-radio-button>
                    <mat-radio-button color="primary" value="2">
                        {{ selectedLanguage() === 'greek' ? 'Αφαίρεση χρωμάτων (εξοικονόμηση μελανιού)' : 'Remove colours (saves ink)' }}
                    </mat-radio-button>
                </mat-radio-group>
                
                <section class="submit-section">
                    @if (formIsInvalid) {
                        <span ErrorMessage 
                          greek="Παρακαλώ, βεβαιωθείτε ότι όλα τα πεδία είναι συμπληρωμένα σωστά!"
                          english="Please make sure all fields are filled correctly!"
                          classes="form-error-message"
                        ></span>
                    }
                </section>
                <button type="submit" mat-raised-button>
                  {{ selectedLanguage() === 'greek' ? 'Λήψη αρχείου .pdf' : 'Download .pdf file' }}
                </button>
            </section>

        </form>
    
    `
})
export class HomeComponent implements OnInit {

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

  private destroyRef = inject(DestroyRef);

  private pdfService = inject(PdfService);
  private languageService = inject(LanguageService);
        
  selectedLanguage = computed(() => 
      this.languageService.selectedLanguage()
  );
  
  selectedRadioOption = signal<string>('1');

  onOptionChange(value: string) {
    this.selectedRadioOption.set(value);
  }
  
  theOfferHasExpirationDate = signal<'expires' | 'permanent'>('permanent');

  onExpirationChange(value: 'expires' | 'permanent'): void {
    this.theOfferHasExpirationDate.set(value);
    
  }

  notesEnabled = signal<boolean>(false);

  onNotesSelected(): void {
    this.notesEnabled.set(!this.notesEnabled());
  }

  form = new FormGroup({

    companyName: new FormControl(initialCompanyNameValue, required),
    companySubtitle: new FormControl(initialCompanySubtitleValue),
    companyPhone: new FormControl(initialCompanyPhoneValue, required),
    companyEmail: new FormControl(initialCompanyEmailValue, { validators: [Validators.required, mustContainPeriod] }),
    companyLocation: new FormControl(initialCompanyLocationValue, required),

    customer: new FormGroup({
      customerName: new FormControl('Client Name', required),
      customerPhone: new FormControl('0000 000 000', required),
      customerEmail: new FormControl('client@client.com', { validators: [ Validators.required, mustContainPeriod ] }),
    }),

    // expirationDate: new FormControl(''),
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
      notes
    );

    this.pdfService.generatePDF(pdf);
  }

}