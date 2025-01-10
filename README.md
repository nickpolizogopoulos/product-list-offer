# Product offer to .pdf

This project is a powerful example of utilizing [Angular](https://github.com/angular/angular-cli) signals in combination with the [jsPDF](https://rawgit.com/MrRio/jsPDF/master/docs/) library.  

Launch the project [[ Here ]](https://product-offer-to-pdf.web.app/).  
 
It is an Angular 19 Application that dynamically renders content in Greek, English, Spanish, French, Italian, Russian and Korean languages based on the user's selection from the nav bar button.  

## Signals & Zoneless Angular Development  
With Angular Signals enabling dynamic updates for form data and interactive elements, and the adoption of Angular Zoneless ensuring improved performance and reduced complexity, the app delivers a highly responsive and efficient user experience.  

## Angular Material & SASS  
The elegant and flexible Angular Material, combined with SASS, offers a clean and modern design  

## Setting a custom font for jsPDF

Assuming you already have your favorite font .ttf file:  
Convert your .ttf file to Base64 using the [Base64.Guru](https://base64.guru/converter/encode/file) free tool.  
Choose JSON as the Output Format and copy the code to a new .json file in your project. Expect lag, the output is big.  

Import all as font:
```
import * as font from 'your/path/to/json/file/here';
```  
Use the code:  
```
doc.addFileToVFS('FontName.ttf', (font as any).file.data);
doc.addFont('FontName.ttf', 'FontName', 'normal');
doc.setFont('FontName');
```
If you use a table like in this Application, make sure you include your font in the table styles:  
```
styles: {
    font: 'FontName',
    fontSize: 10,
}
```
