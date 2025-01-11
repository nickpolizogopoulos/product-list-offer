import {
    inject,
    Injectable,
    signal
} from '@angular/core';

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

import { type PDF } from '../tools/pdf.model';
import { type ColourOption } from '../tools/types';

import { LanguageService } from './language.service';
import * as font from '../tools/custom-font.json';
import * as fontKR from '../tools/noto-sans-kr.json';

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

        const language = this.languageService;
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

        const checkWhichLanguageIsActiveAndEnableTheCorrectFont = () => {

            if (language.isKorean()) {
                doc.addFileToVFS('NotoSansKR.ttf', (fontKR as any).file.data);
                doc.addFont('NotoSansKR.ttf', 'NotoSansKR', 'normal');
                doc.setFont('NotoSansKR');
            }
    
            else {   
                doc.addFileToVFS('InterFont.ttf', (font as any).file.data);
                doc.addFont('InterFont.ttf', 'InterFont', 'normal');
                doc.setFont('InterFont');
            }
        }

        checkWhichLanguageIsActiveAndEnableTheCorrectFont();

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
        if (this.printOption() === 'withColour') {            
            doc.line(x1, 34, x2, 34);
        }

        //* OFFER TITLE ==================================================================
        doc.setFontSize(15);
        if (language.isGreek())
            doc.text('Προσφορά προς πελάτη:', 10, 45);

        else if (language.isEnglish())
            doc.text('Offer to client:', 10, 45);

        else if (language.isSpanish())
            doc.text('Oferta al cliente:', 10, 45);

        else if (language.isFrench())
            doc.text('Offre au client :', 10, 45);

        else if (language.isItalian())
            doc.text('Offerta al cliente:', 10, 45);

        else if (language.isRussian())
            doc.text('Предложение клиенту:', 10, 45);

        else
            doc.text('클라이언트에게 제안:', 10, 45);


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

            if (language.isGreek())
                doc.text(`Λήγει στις: ${dateRefactored}`, pdfWidth - textWidth(pdf.companyPhone) - 22, 45);
            
            else if (language.isEnglish())
                doc.text(`Expires on: ${dateRefactored}`, pdfWidth - textWidth(pdf.companyPhone) - 21, 45);

            else if (language.isSpanish())
                doc.text(`Caduca el: ${dateRefactored}`, pdfWidth - textWidth(pdf.companyPhone) - 21, 45);
            
            else if (language.isFrench())
                doc.text(`Expire le : ${dateRefactored}`, pdfWidth - textWidth(pdf.companyPhone) - 21, 45);

            else if (language.isItalian())
                doc.text(`Scade il: ${dateRefactored}`, pdfWidth - textWidth(pdf.companyPhone) - 21, 45);

            else if (language.isRussian())
                doc.text(`Срок действия до: ${dateRefactored}`, pdfWidth - textWidth(pdf.companyPhone) - 33, 45);

            else
                doc.text(`만료일: ${dateRefactored}`, pdfWidth - textWidth(pdf.companyPhone) - 21, 45);

        }

        //* SECOND HORIZONTAL LINE =======================================================
        if (this.printOption() === 'withColour') {
            doc.line(x1, 75, x2, 75);
        }

        //* NOTES ========================================================================
        const wrappedText = doc.splitTextToSize(pdf.notes as string, 237);
        if (pdf.notes) {
            doc.setFontSize(10);

            if (language.isGreek())
                doc.text('Σημείωση:', 10, 83);

            else if (language.selectedLanguage() === 'english')
                doc.text('Note:', 10, 83);

            else if (language.isSpanish())
                doc.text('Nota:', 10, 83);

            else if (language.isFrench())
                doc.text('Notes :', 10, 83);

            else if (language.isItalian())
                doc.text('Note:', 10, 83);

            else if (language.isRussian())
                doc.text('Примечание:', 10, 83);

            else
                doc.text('비고:', 10, 83);

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
        const header = [
            language.isGreek()
          ? ['No.', 'Τίτλος προϊόντος', 'Τιμή μονάδας €', 'Ποσότητα', 'Σύνολο €']

          : language.isEnglish()
          ? ['No.', 'Product Title', 'Unit Price €', 'Quantity', 'Total Price €']

          : language.isSpanish()
          ? ['No.', 'Título del Producto', 'Precio unitario €', 'Cantidad', 'Precio total €']

          : language.isFrench()
          ? ['N°', 'Titre du produit', 'Prix unitaire (€)', 'Quantité', 'Prix total €']

          : language.isItalian()
          ? ['Nr.', 'Titolo del Prodotto', 'Prezzo unitario €', 'Quantità', 'Prezzo totale €']
          
          : language.isRussian()
          ? ['№', 'Заголовок Продукта', 'Цена за единицу ₽', 'Количество', 'Общая стоимость ₽']
          
          : ['번호', '제품 제목', '단가 ₩', '수량', '총 가격 ₩']
        ];

        const footer = [
              language.isGreek()
            ? ['', 'Σύνολο', '', pdf.productsQuantity, pdf.subtotal]

            : language.isEnglish() || 
              language.isSpanish() || 
              language.isFrench()
            ? ['', 'Total', '', pdf.productsQuantity, pdf.subtotal]
            
            : language.isItalian()
            ? ['', 'Totale', '', pdf.productsQuantity, pdf.subtotal]

            : language.isRussian()
            ? ['', 'Итого', '', pdf.productsQuantity, pdf.subtotal]

            : ['', '총액', '', pdf.productsQuantity, pdf.subtotal]

        ];

        const tableStartingPosition: number = pdf.notes ? 98 : 85;
        
        doc.setFont('InterFont', 'normal');
        autoTable(doc, {
            head: header,
            body: products,
            foot: footer,
            startY: tableStartingPosition,
            styles: {
                // font: this.languageService.isKorean() ? 'NotoSansKR' : 'InterFont',
                font: checkWhichLanguageIsActiveAndEnableTheCorrectFont() !, //both options will work here.
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

        //* The font must be reset here for some reason.
        checkWhichLanguageIsActiveAndEnableTheCorrectFont();

        const getCreditsText = (): string => {
            return (
              language.isGreek() 
            ? `Το έγγραφο δημιουργήθηκε μέσω της εφαρμογής «Product Offer to .pdf» του Νίκου Πολυζωγόπουλου. Για περισσότερες πληροφορίες, επισκεφτείτε: https://product-offer-to-pdf.web.app`

            : language.isEnglish()
            ? `This document was generated using the "Product Offer to .pdf" Web Application made by Nick Polizogopoulos.  For more information, visit: https://product-offer-to-pdf.web.app`

            : language.isSpanish()
            ? `Este documento fue generado utilizando la aplicación web "Product Offer to .pdf" creada por Nick Polizogopoulos.  Para más información, visita: https://product-offer-to-pdf.web.app`

            : language.isFrench()
            ? `Ce document a été généré à l'aide de l'application Web "Product Offer to .pdf" créée par Nick Polizogopoulos.  Pour plus d'informations, visitez : https://product-offer-to-pdf.web.app`

            : language.isItalian()
            ? `Questo documento è stato generato utilizzando l'applicazione web "Product Offer to .pdf" realizzata da Nick Polizogopoulos.  Per maggiori informazioni, visita: https://product-offer-to-pdf.web.app`

            : language.isItalian()
            ? `Документ создан с использованием веб-приложения "Product Offer to .pdf" от Nick Polizogopoulos. Подробнее: https://product-offer-to-pdf.web.app`

            : `이 문서는 Nick Polizogopoulos 가 만든 "Product Offer to .pdf" 웹 애플리케이션을 사용하여 생성되었습니다. 자세한 정보는 다음을 방문하세요: https://product-offer-to-pdf.web.app`

            );
        }

        doc.text(
            getCreditsText(),
            5,
            yPosition
        );

        //* PDF SAVE =====================================================================
        const replaceSpacesWithHyphens = (input: string): string => {
            return input.replace(/\s+/g, '-');
        }

        const companyName = replaceSpacesWithHyphens(pdf.companyName);
        const clientName = replaceSpacesWithHyphens(pdf.customerName);

        const getFileNameTranslation = (): string => {
            return (
                language.isGreek()   ? `prosfora-se`
              : language.isEnglish() ? `offer-to`
              : language.isSpanish() ? `oferta-a`
              : language.isFrench()  ? `offre-à`
              : language.isItalian() ? `offerta-a`
              : language.isRussian() ? `предложение-к`
              : `제안서`
              );
        }

        const generateDate = (): string => {
            const date = new Date();
            return `${date.getDate()}-${date.getMonth() + 1 }-${date.getFullYear()}`;
        }

        doc.save(`${companyName}-${getFileNameTranslation()}-${clientName}-${generateDate()}.pdf`);
    }

}