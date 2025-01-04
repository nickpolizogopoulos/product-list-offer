import {
    inject,
    Injectable,
    signal
} from '@angular/core';

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

import { type PDF } from '../tools/pdf.model';

import * as font from '../tools/custom-font.json';
import { LanguageService } from './language.service';
import { type ColourOption } from '../tools/types';

@Injectable({
    providedIn: 'root'
})
export class PdfService {
    
    private languageService = inject(LanguageService);

    private printOption = signal<ColourOption>('withColour');

    setPrintOption(option: ColourOption): void {
        this.printOption.set(option);
    }

    generatePDF( pdf: PDF ): void {

        const doc = new jsPDF();

        //* PDF PAPER SETTINGS ===========================================================
        const pdfWidth = doc.internal.pageSize.getWidth();
        const pdfHeight = doc.internal.pageSize.getHeight();

        //* HEADER =======================================================================
        if (this.printOption() === 'withColour') {
            doc.setFillColor(202, 218, 232);
            //* Rectangle (x, y, width, height, radiusX, radiusY, style) 'F' = filled.
            doc.roundedRect(5, 5, 200, 22, 2, 2, 'F');
        }

        //* FONT =========================================================================
        doc.addFileToVFS('InterFont.ttf', (font as any).file.data);
        doc.addFont('InterFont.ttf', 'InterFont', 'normal');
        doc.setFont('InterFont');

        const textWidth = ( text: string ): number => {
            return doc.getTextDimensions(text).w;
        }
        
        //* HORIZONTAL LINE WIDTH SETTINGS ===============================================
        const lineWidth = 200;
        const x1 = (pdfWidth - lineWidth) / 2;
        const x2 = x1 + lineWidth;
        
        //* COMPANY INFORMATION ==========================================================
        doc.setFontSize(18);
        doc.text(pdf.companyName, 10, 13);
        doc.setFontSize(10);
        doc.text(pdf.companySubtitle, 10, 18);
        doc.text( pdf.companyPhone, pdfWidth - textWidth(pdf.companyPhone) - 10, 12);
        doc.text(pdf.companyEmail, pdfWidth - textWidth(pdf.companyEmail) - 10, 17);
        doc.text(pdf.companyLocation, pdfWidth - textWidth(pdf.companyLocation) - 10, 22);

        //* FIRST HORIZONTAL LINE ========================================================
        doc.line(x1, 34, x2, 34);

        //* OFFER TITLE ==================================================================
        doc.setFontSize(15);
        if (this.languageService.isGreek())
            doc.text('Προσφορά προς πελάτη:', 10, 45);
        else if (this.languageService.selectedLanguage() === 'english')
            doc.text('Offer to customer:', 10, 45);
        else
            doc.text('Oferta al cliente:', 10, 45);

        //* CUSTOMER INFORMATION =========================================================
        doc.setFontSize(15);
        doc.text(pdf.customerName, 10, 55);
        doc.setFontSize(10);
        doc.text(pdf.customerPhone, 10, 61);
        doc.text(pdf.customerEmail, 10, 67);

        //* EXPIRATION DATE ==============================================================
        const expirationDate = pdf.expirationDate;

        const expirationDay = expirationDate?.getDate();
        const expirationMonth = expirationDate?.getMonth();
        const expirationYear = expirationDate?.getFullYear();

        const dateRefactored = `${expirationDay}/${+expirationMonth! + 1}/${expirationYear}`;

        if (expirationDate) {
            doc.setFontSize(10);
            if (this.languageService.isGreek())
                doc.text(`Λήγει στις: ${dateRefactored}`, pdfWidth - textWidth(pdf.companyPhone) - 22, 45);
            else if (this.languageService.selectedLanguage() === 'english')
                doc.text(`Expires in: ${dateRefactored}`, pdfWidth - textWidth(pdf.companyPhone) - 21, 45);
            else
                doc.text(`Caduca en: ${dateRefactored}`, pdfWidth - textWidth(pdf.companyPhone) - 21, 45);
        }

        //* SECOND HORIZONTAL LINE =======================================================
        doc.line(x1, 75, x2, 75);

        //* NOTES ========================================================================
        const wrappedText = doc.splitTextToSize(pdf.notes as string, 237);
        if (pdf.notes) {
            doc.setFontSize(10);
            if (this.languageService.isGreek())
                doc.text('Σημείωση:', 10, 83);
            else if (this.languageService.selectedLanguage() === 'english')
                doc.text('Note:', 10, 83);
            else
                doc.text('Nota:', 10, 83);
            doc.setFontSize(8);
            doc.text(wrappedText, 10, 87);
        }

        const products: (string | number)[][] = pdf.products
            .map((product, index) => [
                `${index + 1}.`,
                product.name,
                product.price,
                product.quantity,
                product.price * +product.quantity
            ]);
            
        //* PRODUCT TABLE ================================================================
        const footer = [
              this.languageService.isGreek()
            ? ['', 'Σύνολο', '', pdf.productsQuantity, pdf.subtotal]
            : this.languageService.isEnglish()
            ? ['', 'Total', '', pdf.productsQuantity, pdf.subtotal]
            : ['', 'Total', '', pdf.productsQuantity, pdf.subtotal]
        ];

        const header = [
            this.languageService.isGreek()
          ? ['No.', 'Τίτλος προϊόντος', 'Τιμή μονάδας €', 'Ποσότητα', 'Σύνολο €']
          : this.languageService.isEnglish()
          ? ['No.', 'Product Title', 'Unit Price €', 'Quantity', 'Total Price €']
          : ['No.', 'Título del producto', 'Precio unitario €', 'Cantidad', 'Precio total €']
        ];

        const tableStartingPosition: number = pdf.notes ? 98 : 85;
        
        doc.setFont('InterFont', 'normal');
        autoTable(doc, {
            head: header,
            body: products,
            foot: footer,
            startY: tableStartingPosition,
            styles: {
                font: 'InterFont',
                fontSize: 10,
                lineColor: '#ffffff',
                lineWidth: 0.2,
            },
            //* Removes the colours from the table if printOption is 'withoutColor'.
            didParseCell: data => {
                if (this.printOption() === 'withoutColour')
                    data.cell.styles.fillColor = 'white';
                else
                    return;
            },
            //* tableLineColor is the table border.
            tableLineColor: '#969696',
            tableLineWidth: 0.2,
            headStyles: {
                fillColor: '#cadae8',
                textColor: '#000000',
            },
            footStyles: {
                fillColor: '#cadae8',
                textColor: '#000000',
            },
            //* width 182
            columnStyles: {
                //* 0. No.
                0: { cellWidth: 10 },

                //* 1. Product.
                1: { cellWidth: 92 },

                //* 2. Unit Price .
                2: { cellWidth: 32 },

                //* 3. Quantity.
                3: { cellWidth: 21 },

                //* 4. Total Price .
                4: { cellWidth: 27 }
            }
        });
        
        //* CREDITS ======================================================================
        doc.line(x1, 290, x2, 290);

        const bottomMargin = 10;
        const yPosition = (pdfHeight - bottomMargin) + 7;
        doc.setFontSize(6);
        if (this.languageService.isGreek())
            doc.text(
                `Το έγγραφο δημιουργήθηκε μέσω της εφαρμογής «Product Offer to .pdf» του Νίκου Πολυζωγόπουλου. Για περισσότερες πληροφορίες, επισκεφτείτε: https://product-offer-to-pdf.web.app`,
                5,
                yPosition
            );
        else if (this.languageService.isEnglish())
            doc.text(
                `This document was generated using the "Product Offer to .pdf" Web Application made by Nick Polizogopoulos. For more information, visit: https://product-offer-to-pdf.web.app`,
                5,
                yPosition
            );
        else
            doc.text(
                `Este documento fue generado utilizando la aplicación web "Product Offer to .pdf" creada por Nick Polizogopoulos. Para más información, visita: https://product-offer-to-pdf.web.app`,
                5,
                yPosition
            );

        //* PDF SAVE =====================================================================

        const generateDate = (): string => {
            const date = new Date();
            return `${date.getDate()}-${date.getMonth() + 1 }-${date.getFullYear()}`;
        }

        const replaceSpacesWithHyphens = (input: string): string => {
            return input.replace(/\s+/g, '-');
        }

        const companyName = replaceSpacesWithHyphens(pdf.companyName);
        const clientName = replaceSpacesWithHyphens(pdf.customerName);

        doc.save(`${companyName}-offer-to-${clientName}-${generateDate()}.pdf`);
    }

}