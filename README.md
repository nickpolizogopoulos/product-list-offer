# Product offer to .pdf

This project is a powerful example of utilizing [Angular](https://github.com/angular/angular-cli) signals in combination with the [jsPDF](https://rawgit.com/MrRio/jsPDF/master/docs/) library.  

Launch the project [[ Here ]](https://product-offer-to-pdf.web.app/).  
 
It is an Angular 18 application that dynamically renders content in Greek, English, Spanish, French and Italian based on the user's selection.  
The language can be changed from the nav bar button.  

## Advanced Development  
With Angular Signals, the app offers dynamic updates for form data and interactive elements.  

## Zoneless Environment  
With the adoption of "Angular Zoneless", the app ensures improved performance and reduced complexity  

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
