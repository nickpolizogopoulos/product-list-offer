import { Injectable } from '@angular/core';

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

import { type PDF } from './pdf.model';

@Injectable({
    providedIn: 'root'
})
export class PdfService {

    private date = new Date();
    private day = this.date.getDate();
    private month = this.date.getMonth() + 1;
    private year = this.date.getFullYear();
    private todaysDate = `${this.day}-${this.month}-${this.year}`;

    private doc = new jsPDF();
    private pdfWidth = this.doc.internal.pageSize.getWidth();
    private pdfHeight = this.doc.internal.pageSize.getHeight();

    // private logoLink = signal<string>('');

    // fetchLogo( logoLink: string, logoWidth: number ) {
    //     this.addImageToPdf(logoLink, 10, 10, logoWidth, 100);
    //     this.logoLink.set(logoLink);
    //     console.log(this.logoLink());
    // }

    // private async addImageToPdf(url: string, x: number, y: number, width: number, height: number): Promise<void> {

    //     //* Using Public CORS proxy to fetch the image.
    //     const proxyUrl = 'https://corsproxy.io/?';
    //     const imageUrl = proxyUrl + url;

    //     try {
    //         const response = await fetch(imageUrl);
    //         const blob = await response.blob();
    //         const reader = new FileReader();
    //         reader.onloadend = () => {
    //             const base64data = reader.result as string;
    //             this.doc.addImage(base64data, 'JPEG', x, y, width, height);
    //         };
    //     reader.readAsDataURL(blob);
    //     }
    //     catch (error) {
    //         throw new Error('Error loading image: ' + error);
    //     }
    // }

    //* GENERATE ==========================================================================================
    generatePDF( pdf: PDF ): void {

        this.doc.setFont('helvetica', 'normal');

        const textWidth = ( text: string ): number => {
            return this.doc.getTextDimensions(text).w;
        }
    
        //* COMPANY INFORMATION ==========================================================
        this.doc.text(pdf.companyName, this.pdfWidth - textWidth(pdf.companyName) - 10, 10);
        //TODO put the company subtitle
        this.doc.setFontSize(10);
        this.doc.text(pdf.companyPhone, this.pdfWidth - textWidth(pdf.companyPhone) - 10, 17);
        this.doc.text(pdf.companyEmail, this.pdfWidth - textWidth(pdf.companyEmail) - 10, 23);
        this.doc.text(pdf.companyLocation, this.pdfWidth - textWidth(pdf.companyLocation) - 10, 29);
        
        
        //* HORIZONTAL LINE WIDTH SETTINGS ===============================================
        const lineWidth = 200;
        const x1 = (this.pdfWidth - lineWidth) / 2;
        const x2 = x1 + lineWidth;
        
        //* FIRST HORIZONTAL LINE ========================================================
        const line1Top = 40;
        this.doc.line(x1, line1Top, x2, line1Top);
        
        //* CUSTOMER INFORMATION =========================================================
        this.doc.setFontSize(16);
        this.doc.text('Customer:', 10, 55);
        this.doc.setFontSize(11);
        this.doc.text('Name:', 10, 62);
        this.doc.text('Phone:', 10, 68);
        this.doc.text('Email:', 10, 74);
        this.doc.text(pdf.customerName, 25, 62);
        this.doc.text(pdf.customerPhone, 25, 68);
        this.doc.text(pdf.customerEmail, 25, 74);

        //* SECOND HORIZONTAL LINE =======================================================
        const line2Top = 85;
        this.doc.line(x1, line2Top, x2, line2Top);

        const products: (string | number)[][] = pdf.products
            .map((product, index) => [
                index + 1,
                product.name,
                product.quantity,
                product.price.toString()
            ]);
            
        //* PRODUCT TABLE ================================================================
        const footer = [['', 'Total', '', pdf.subtotal]];
        autoTable(this.doc, {
            head: [['No.', 'Product', 'Quantity', 'Total Price €']],
            body: products,
            foot: footer,
            startY: 96,
            styles: {
                font: 'helvetica',
                fontSize: 10,
                lineColor: '#ffffff',
                lineWidth: 0.2,
            },
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
            columnStyles: {
                0: { cellWidth: 11 },
                1: { cellWidth: 111 },
                2: { cellWidth: 30 },
                3: { cellWidth: 30 }
            }
        });
        
        //* CREDITS ======================================================================
        const bottomMargin = 10;
        const yPosition = (this.pdfHeight - bottomMargin) + 6;
        this.doc.setFontSize(6);
        this.doc.text(
            `This document was generated using the "Product Offer to .pdf" Web Application made by Nick Polizogopoulos. For more information, visit: nick-polizogopoulos.web.app`,
            7,
            yPosition
        );

        //* PDF SAVE =====================================================================
        const name = pdf.customerName.replace(/\s+/g, '-').toLowerCase();
        this.doc.save('offer-to-' + name + '-' + this.todaysDate + '.pdf');
    }

}