import { AbstractControl, Validators } from "@angular/forms";

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

export const localStorageItemData: string = 'product-offer-to-pdf-item';
 
//* WONT WORK IN SSR
export let initialCompanyNameValue: string = '';
export let initialCompanyLogoLinkValue: string = '';
export let initialCompanyPhoneValue: string = '';
export let initialCompanyEmailValue: string = '';
export let initialCompanyLocationValue: string = '';
export let initialLogoWidthValue: number = 140;
export let initialLogoIncludeValue: boolean = initialCompanyLogoLinkValue ? true : false;

const savedInformation = window.localStorage.getItem(localStorageItemData);

if (savedInformation) {
  const loadedFormData = JSON.parse(savedInformation);
  
  initialCompanyNameValue = loadedFormData.name
  initialCompanyLogoLinkValue = loadedFormData.logo;
  initialCompanyPhoneValue = loadedFormData.phone;
  initialCompanyEmailValue = loadedFormData.email;
  initialCompanyLocationValue = loadedFormData.location;
  initialLogoWidthValue = loadedFormData.logoWidth;
  initialLogoIncludeValue = loadedFormData.logoInclude;
  
}

export const required = { validators: [Validators.required] };
