# Product offer to .pdf

This project is a powerful example of utilizing [Angular](https://github.com/angular/angular-cli) signals in combination with the jsPDF library.  
It is a Zoneless Angular 18 application that dynamically renders content in Greek and English, with plans to support additional languages in the future.  
The application allows companies to effortlessly generate bilingual product offer PDFs by filling out a form, which can then be sent directly to clients or customers.  

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