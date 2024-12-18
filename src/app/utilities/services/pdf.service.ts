import {
    computed,
    inject,
    Injectable,
    signal
} from '@angular/core';

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

import { type PDF } from '../tools/pdf.model';

import * as font from '../tools/greek-font.json';
import { LanguageService } from './language.service';


@Injectable({
    providedIn: 'root'
})
export class PdfService {
    
    private languageService = inject(LanguageService);

    private isGreek = computed(() =>
        this.languageService.selectedLanguage() === 'greek'
    );

    private printOption = signal<string>('1');

    setPrintOption(option: string): void {
        this.printOption.set(option);
    }

    generatePDF( pdf: PDF ): void {

        const doc = new jsPDF();

        //* PDF PAPER SETTINGS ===========================================================
        const pdfWidth = doc.internal.pageSize.getWidth();
        const pdfHeight = doc.internal.pageSize.getHeight();

        //* HEADER =======================================================================
        if (this.printOption() === '1') {
            doc.setFillColor(202, 218, 232);
            //* Rectangle (x, y, width, height, radiusX, radiusY, style) - 'F' = filled rectangle.
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
        doc.text(pdf.companyPhone, pdfWidth - textWidth(pdf.companyPhone) - 10, 12);
        doc.text(pdf.companyEmail, pdfWidth - textWidth(pdf.companyEmail) - 10, 17);
        doc.text(pdf.companyLocation, pdfWidth - textWidth(pdf.companyLocation) - 10, 22);

        //* FIRST HORIZONTAL LINE ========================================================
        const line1Top = 34;
        doc.line(x1, line1Top, x2, line1Top);

        //* OFFER TITLE ==================================================================
        doc.setFontSize(18);
        if (this.isGreek())
            doc.text('Προσφορά προς πελάτη:', 10, 45);
        else
            doc.text('Offer to customer:', 10, 45);

        //* CUSTOMER INFORMATION =========================================================
        doc.setFontSize(15);
        doc.text(pdf.customerName, 10, 55);
        doc.setFontSize(10);
        doc.text(pdf.customerPhone, 10, 61);
        doc.text(pdf.customerEmail, 10, 67);

        //TODO //* EXPIRATION DATE ==================================================================================
        // const expirationDate = '';
        // if (true) {
        //     doc.setFontSize(10);
        //     if (this.isGreek())
        //         doc.text('Λήγει στις: DD/MM/YYY', pdfWidth - textWidth(pdf.companyPhone) - 22, 45);
        //     else
        //         doc.text('Expires in: DD/MM/YYY', pdfWidth - textWidth(pdf.companyPhone) - 21, 45);
        // }
        //TODO //* EXPIRATION DATE ==================================================================================

        //* SECOND HORIZONTAL LINE =======================================================
        const line2Top = 75;
        doc.line(x1, line2Top, x2, line2Top);

        //* NOTES ========================================================================
        if (pdf.notes) {
            doc.setFontSize(10);
            if (this.isGreek())
                doc.text('Σημείωση:', 10, 83);
            else
                doc.text('Note:', 10, 83);
            doc.setFontSize(8);
            doc.text(pdf.notes!, 10, 87);
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
            this.isGreek()
            ? ['', 'Σύνολο', '', pdf.productsQuantity, pdf.subtotal]
            : ['', 'Total', '', pdf.productsQuantity, pdf.subtotal]
        ];

        const header = [
            this.isGreek()
          ? ['No.', 'Τίτλος προϊόντος', 'Τιμή μονάδας €', 'Ποσότητα', 'Σύνολο €']
          : ['No.', 'Product Title', 'Unit Price €', 'Quantity', 'Total Price €']
        ];

        const tableStartingPosition: number = pdf.notes ? 95 : 85;
        
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
            //* To remove the colours tablewide if printOption is '2'.
            didParseCell: data => {
                if (this.printOption() === '2')
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
        const bottomMargin = 10;
        const yPosition = (pdfHeight - bottomMargin) + 6;
        doc.setFontSize(6);
        if (this.isGreek())
            doc.text(
                `Το έγγραφο δημιουργήθηκε μέσω της εφαρμογής «Product Offer to .pdf» από τον Νίκο Πολυζωγόπουλο. Περισσότερες πληροφορίες, επισκεφθείτε: nick-polizogopoulos.web.app`,
                4,
                yPosition
            );
        else
            doc.text(
                `This document was generated using the "Product Offer to .pdf" Web Application made by Nick Polizogopoulos. For more information, visit: nick-polizogopoulos.web.app`,
                4,
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