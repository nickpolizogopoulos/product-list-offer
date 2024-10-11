import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MaterialComponents } from './utilities/tools/material-components';
import { FooterComponent } from './components/footer.component';
import { HeaderComponent } from './components/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    FormsModule,
    HeaderComponent,
    FooterComponent,
    MaterialComponents
  ],
  template: `
  
    <div class="container">
      <header appHeader></header>
    </div>

    <div class="container">
      <h3>Company Information</h3>
      <section class="info-block">
        <mat-form-field class="input-50">
          <mat-label>Company Name</mat-label>
          <input matInput>
        </mat-form-field>
        <mat-form-field class="input-50">
          <mat-label>Logo link</mat-label>
          <!-- <input matInput [value]="companyLogo()" (input)="onLogoChange($event)"> -->
          <input matInput [value]="companyLogo()" (input)="onLogoChange($event)">
        </mat-form-field>
      </section>
      
      <section class="info-block">
        <mat-form-field class="input-25">
          <mat-label>Phone</mat-label>
          <input matInput>
        </mat-form-field>
        <mat-form-field class="input-25">
          <mat-label>Email</mat-label>
          <input matInput>
        </mat-form-field>
        <mat-form-field class="input-50">
          <mat-label>Location</mat-label>
          <input matInput>
        </mat-form-field>
      </section>

      <section class="company-details">
      <!-- <img [src]="companyLogo()" [style.width.px]="logoWidth()"> -->
      <img [src]="companyLogo()">
        <article>
          <h4>Company name</h4>
          <h6>Phone</h6>
          <h6>Email</h6>
          <h6>Location</h6>
        </article>
      </section>
      <!-- <mat-slider min="150" max="500" (input)="onSliderChange($event)">
        <input matSliderThumb [value]="logoWidth()">
      </mat-slider> -->
    </div>


    <div class="container">
      <h3>Customer Information</h3>
      <section class="info-block">
        <mat-form-field class="input-50">
          <mat-label>Name</mat-label>
          <input matInput>
        </mat-form-field>
        <mat-form-field class="input-25">
          <mat-label>Phone</mat-label>
          <input matInput>
        </mat-form-field>
        <mat-form-field class="input-25">
          <mat-label>Email</mat-label>
          <input matInput>
        </mat-form-field>
      </section>
    </div>


    <div class="container">
      <section class="product-list">
        <h3>Product List</h3>
        <button class="icon-btn add">
          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
          </svg>
        </button>
      </section>
      
      <section class="info-block">
        <mat-form-field class="input-50">
          <mat-label>Product name</mat-label>
          <input matInput>
        </mat-form-field>
        <mat-form-field class="input-25">
          <mat-label>Quantity</mat-label>
          <mat-select>
            @for ( option of allQtyOptions; track $index ) {
            <mat-option value="{{ option }}">{{ option }}</mat-option>
            }
          </mat-select>
        </mat-form-field>
        <mat-form-field class="input-25">
          <mat-label>Price €</mat-label>
          <input matInput>
        </mat-form-field>

        <button class="icon-btn delete">
          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
          </svg>
        </button>
        <mat-divider></mat-divider>
      </section>

      <button mat-raised-button>Generate .pdf</button>
    </div>

    <div class="container">
      <footer appFooter></footer>
    </div>
  `
})
export class AppComponent {

  companyLogo = signal<string>('https://st3.depositphotos.com/43745012/44906/i/450/depositphotos_449066958-stock-photo-financial-accounting-logo-financial-logo.jpg');

  // logoWidth = signal<number>(150);

  // onSliderChange(event: any) {
  //   const newWidth = event.target.value; // Get the slider's value
  //   this.logoWidth.set(newWidth);        // Update the signal with the new value
  // }

  onLogoChange( event: Event ): void {
    const inputElement = event.target as HTMLInputElement | null;
    if (inputElement)
      this.companyLogo.set(inputElement.value);
  }

  get allQtyOptions(): string[] {
    return [...this.qtyOptions()];
  }

  private qtyOptions = signal<string[]>(this.generateQtyOptions());

  private generateQtyOptions(): string[] {
    const options: string[] = [];
    for (let i = 1; i <= 50; i++) {
      options.push(i.toString());
    }
    return options;
  }

}
