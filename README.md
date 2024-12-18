# ProductListOffer

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.0.

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
If you use a table like in this Application, make sure you include your FontName in the table styles:  
```
styles: {
    font: 'FontName',
    fontSize: 10,
}
```