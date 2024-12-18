import {
    Injectable,
    signal
} from '@angular/core';

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

import { type PDF } from '../tools/pdf.model';

@Injectable({
    providedIn: 'root'
})
export class PdfService {

    private generateDate(): string {
        const date = new Date();
        return `${date.getDate()}-${date.getMonth() + 1 }-${date.getFullYear()}`;
    }

    private printOption = signal<string>('1');

    setPrintOption(option: string): void {
        this.printOption.set(option);
    }

    generatePDF( pdf: PDF ): void {

        const doc = new jsPDF();

        doc.setFont('helvetica', 'normal');

        const textWidth = ( text: string ): number => {
            return doc.getTextDimensions(text).w;
        }

        //* PDF PAPER SETTINGS ===========================================================
        const pdfWidth = doc.internal.pageSize.getWidth();
        const pdfHeight = doc.internal.pageSize.getHeight();
        
        //* HORIZONTAL LINE WIDTH SETTINGS ===============================================
        const lineWidth = 200;
        const x1 = (pdfWidth - lineWidth) / 2;
        const x2 = x1 + lineWidth;

        //* COMPANY INFORMATION ==========================================================
        doc.text(pdf.companyName, pdfWidth - textWidth(pdf.companyName) - 10, 10);
        //TODO put the company subtitle ===========================================================================
        doc.setFontSize(10);
        doc.text(pdf.companyPhone, pdfWidth - textWidth(pdf.companyPhone) - 10, 17);
        doc.text(pdf.companyEmail, pdfWidth - textWidth(pdf.companyEmail) - 10, 23);
        doc.text(pdf.companyLocation, pdfWidth - textWidth(pdf.companyLocation) - 10, 29);

        //* NOTES ========================================================================
        if (pdf.notes) {
            doc.setFontSize(10);
            doc.text('Notes:', 10, 90);
            doc.setFontSize(8);
            doc.text(pdf.notes!, 10, 95);
        }
        
        //* FIRST HORIZONTAL LINE ========================================================
        const line1Top = 40;
        doc.line(x1, line1Top, x2, line1Top);
        
        //* CUSTOMER INFORMATION =========================================================
        doc.setFontSize(16);
        doc.text('Customer:', 10, 55);
        doc.setFontSize(11);
        doc.text('Name:', 10, 62);
        doc.text('Phone:', 10, 68);
        doc.text('Email:', 10, 74);
        doc.text(pdf.customerName, 25, 62);
        doc.text(pdf.customerPhone, 25, 68);
        doc.text(pdf.customerEmail, 25, 74);

        //* SECOND HORIZONTAL LINE =======================================================
        const line2Top = 85;
        doc.line(x1, line2Top, x2, line2Top);

        const products: (string | number)[][] = pdf.products
            .map((product, index) => [
                `${index + 1}.`,
                product.name,
                product.price,
                product.quantity,
                product.price * +product.quantity
            ]);
            
        //* PRODUCT TABLE ================================================================
        const footer = [['', 'Total', '', pdf.productsQuantity, pdf.subtotal]];
        autoTable(doc, {
            head: [['No.', 'Product Title', 'Unit Price €', 'Quantity', 'Total Price €']],
            body: products,
            foot: footer,
            startY: 110,
            styles: {
                font: 'helvetica',
                fontSize: 10,
                lineColor: '#ffffff',
                lineWidth: 0.2,
            },
            //* To remove the colours tablewide if printOption is '2'.
            didParseCell: (data) => {
                if (this.printOption() === '2')
                    data.cell.styles.fillColor = 'white';
                else
                    return;
            },
            //* tableLineColor is the table border.
            tableLineColor: '#808080',
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
                1: { cellWidth: 102 },

                //* 2. Unit Price .
                2: { cellWidth: 25 },

                //* 3. Quantity.
                3: { cellWidth: 18 },

                //* 4. Total Price .
                4: { cellWidth: 27 }
            }
        });
        
        //* CREDITS ======================================================================
        const bottomMargin = 10;
        const yPosition = (pdfHeight - bottomMargin) + 6;
        doc.setFontSize(6);
        doc.text(
            `This document was generated using the "Product Offer to .pdf" Web Application made by Nick Polizogopoulos. For more information, visit: nick-polizogopoulos.web.app & nick-polizogopoulos.web.app`,
            7,
            yPosition
        );

        //* PDF SAVE =====================================================================
        const replaceSpacesWithHyphens = (input: string): string => {
            return input.replace(/\s+/g, '-');
        }
        const companyName = replaceSpacesWithHyphens(pdf.companyName);
        const clientName = replaceSpacesWithHyphens(pdf.customerName);
        doc.save(`${companyName}-offer-to-${clientName}-${this.generateDate()}.pdf`);
    }

}