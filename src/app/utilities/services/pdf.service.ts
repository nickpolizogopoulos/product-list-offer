import {
    computed,
    inject,
    Injectable,
    signal
} from '@angular/core';

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

import { LanguageService } from './language/language.service';

import { type PDF } from '../tools/pdf.model';
import { type ColourOption } from './language/types';
import { type Orientation } from '../../pages/home/content/types';

import * as Inter from '../fonts/inter.json';
import * as NotoSansKR from '../fonts/noto-sans-kr.json';
import * as tableWidth from '../tools/pdf-table-cell-with';

@Injectable({
    providedIn: 'root'
})
export class PdfService {
    
    private languageService = inject(LanguageService);
    private printOption = signal<ColourOption>('withColour');
    private orientation = signal<Orientation>('vertical');
    private withColour = computed(() => this.printOption() === 'withColour');
    private withoutColour = computed(() => this.printOption() === 'withoutColour');
    private pdfIsVertical = computed(() => this.orientation() === 'vertical');

    setPrintOption(colourOption: ColourOption): void {
        this.printOption.set(colourOption);
    }
    
    setOrientation(orientation: Orientation): void {
        this.orientation.set(orientation);
    }

    generatePDF( pdf: PDF ): void {

        const language = this.languageService;
        const orientation = this.pdfIsVertical() ? 'portrait' : 'landscape';

        const doc = new jsPDF( {orientation: orientation} );

        //* PDF PAPER SETTINGS ===========================================================
        const pdfWidth = doc.internal.pageSize.getWidth();
        const pdfHeight = doc.internal.pageSize.getHeight();

        //* FONT =========================================================================
        const checkWhichLanguageIsActiveAndEnableTheCorrectFont = () => {

            if (language.isKorean()) {
                doc.addFileToVFS('NotoSansKR.ttf', (NotoSansKR as any).file.data);
                doc.addFont('NotoSansKR.ttf', 'NotoSansKR', 'normal');
                doc.setFont('NotoSansKR');
            }

            else {   
                doc.addFileToVFS('Inter.ttf', (Inter as any).file.data);
                doc.addFont('Inter.ttf', 'Inter', 'normal');
                doc.setFont('Inter');
            }
        };

        checkWhichLanguageIsActiveAndEnableTheCorrectFont();

        const textWidth = ( text: string ): number => {
            return doc.getTextDimensions(text).w;
        };
        
        //* HORIZONTAL LINE WIDTH SETTINGS ===============================================
        const lineWidth = this.pdfIsVertical() ? 200 : 286;
        const x1 = (pdfWidth - lineWidth) / 2;
        const x2 = x1 + lineWidth;

        //* HEADER =======================================================================
        if (this.withColour()) {
            doc.setFillColor(202, 218, 232);

            //* Rectangle (positionX, positionY, width, height, radiusX, radiusY, style) / 'F' = filled.
            doc.roundedRect(5, 5, pdfWidth - 10, 22, 2, 2, 'F');
        };
        
        //* COMPANY INFORMATION ==========================================================
        doc.setFontSize(18);
        doc.text(pdf.companyName, 10, 13);
        doc.setFontSize(10);
        doc.text(pdf.companySubtitle, 10, 18);
        doc.text( pdf.companyPhone, pdfWidth - textWidth(pdf.companyPhone) - 10, 12);
        doc.text(pdf.companyEmail, pdfWidth - textWidth(pdf.companyEmail) - 10, 17);
        doc.text(pdf.companyLocation, pdfWidth - textWidth(pdf.companyLocation) - 10, 22);

        //* FIRST HORIZONTAL LINE ========================================================
        if (this.withColour())
            doc.line(x1, 34, x2, 34);

        //* OFFER TITLE ==================================================================
        doc.setFontSize(15);
        doc.text(
              language.isGreek()   ? 'Προσφορά προς πελάτη:'
            : language.isEnglish() ? 'Offer to client:'
            : language.isSpanish() ? 'Oferta al cliente:'
            : language.isFrench()  ? 'Offre au client :'
            : language.isItalian() ? 'Offerta al cliente:'
            : language.isRussian() ? 'Предложение клиенту:'
            : '클라이언트에게 제안:'
            , 10, 45
        );

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

        const dateRefactored = `${ expirationDay }/${ +expirationMonth! + 1 }/${ expirationYear }`;

        if (expirationDate) {
            doc.setFontSize(10);

            if (language.isGreek() || language.isEnglish())
                doc.text(language.isGreek() 
                    ? `Λήγει στις: ${dateRefactored}`
                    : `Expires on: ${dateRefactored}`
                    , pdfWidth - 46, 45
                );

            else if (language.isSpanish())
                doc.text(`Caduca el: ${dateRefactored}`, pdfWidth - 47, 45);
            
            else if (language.isFrench())
                doc.text(`Expire le : ${dateRefactored}`, pdfWidth - 44, 45);

            else if (language.isItalian())
                doc.text(`Scade il: ${dateRefactored}`, pdfWidth - 42, 45);

            else if (language.isRussian())
                doc.text(`Срок действия до: ${dateRefactored}`, pdfWidth - 60, 45);

            else
                doc.text(`만료일: ${dateRefactored}`, pdfWidth - 38, 45);

        }

        //* SECOND HORIZONTAL LINE =======================================================
        if (this.withColour())
            doc.line(x1, 75, x2, 75);

        //* NOTES ========================================================================
        const wrapLimit = this.pdfIsVertical() ? 237 : 346;
        const wrappedText = doc.splitTextToSize(pdf.notes!, wrapLimit);
        if (pdf.notes) {
            doc.setFontSize(10);

            doc.text(
                  language.isGreek()   ? 'Σημείωση:'
                : language.isEnglish() ? 'Note:'
                : language.isSpanish() ? 'Nota:'
                : language.isFrench()  ? 'Notes :'
                : language.isItalian() ? 'Note:'
                : language.isRussian() ? 'Примечание:'
                : '비고:'
                , 10, 83
            );

            doc.setFontSize(8);
            doc.text(wrappedText, 10, 87);
        }

        //* PRODUCT TABLE ================================================================
        const products: (string | number)[][] = pdf.products
            .map((product, index) => [
                `${index + 1}.`,
                product.name,
                product.price,
                product.quantity,
                product.price * +product.quantity
            ]);
            
        const tableHeader = [
            language.isGreek()   ? ['No.', 'Τίτλος προϊόντος', 'Τιμή μονάδας €', 'Ποσότητα', 'Σύνολο €']
          : language.isEnglish() ? ['No.', 'Product Title', 'Unit Price €', 'Quantity', 'Total Price €']
          : language.isSpanish() ? ['No.', 'Título del Producto', 'Precio unitario €', 'Cantidad', 'Precio total €']
          : language.isFrench()  ? ['N°', 'Titre du produit', 'Prix unitaire (€)', 'Quantité', 'Prix total €']
          : language.isItalian() ? ['Nr.', 'Titolo del Prodotto', 'Prezzo unitario €', 'Quantità', 'Prezzo totale €']
          : language.isRussian() ? ['№', 'Заголовок Продукта', 'Цена за единицу ₽', 'Количество', 'Общая стоимость ₽']
          : ['번호', '제품 제목', '단가 ₩', '수량', '총 가격 ₩']
        ];

        const tableFooter = [
              language.isGreek() ? ['', 'Σύνολο', '', pdf.productsQuantity, pdf.subtotal]

            : language.isEnglish() || language.isSpanish() || language.isFrench()
            ? ['', 'Total', '', pdf.productsQuantity, pdf.subtotal]
            
            : language.isItalian() ? ['', 'Totale', '', pdf.productsQuantity, pdf.subtotal]
            : language.isRussian() ? ['', 'Итого', '', pdf.productsQuantity, pdf.subtotal]
            : ['', '총액', '', pdf.productsQuantity, pdf.subtotal]

        ];

        const tableStartingPosition: number = pdf.notes ? 98 : 85;

        const getColumnWidth = () => {
            return (
                this.pdfIsVertical() 
                ? (
                      language.isGreek()   ? { ...tableWidth.greek }
                    : language.isEnglish() ? { ...tableWidth.english }
                    : language.isSpanish() ? { ...tableWidth.spanish }
                    : language.isFrench()  ? { ...tableWidth.french }
                    : language.isItalian() ? { ...tableWidth.italian }
                    : language.isRussian() ? { ...tableWidth.russian }
                    : { ...tableWidth.korean }
                )
                : (
                      language.isRussian() ? { ...tableWidth.russianHorizontal }
                    : { ...tableWidth.horizontalPdfCellWidth }
                )
            );
        };
        
        autoTable(doc, {
            head: tableHeader,
            body: products,
            foot: tableFooter,
            startY: tableStartingPosition,
            styles: {
                //* both options for the table font will work here.
                //* loading the Noto Sans KR for the Korean language. (Inter doesn't support Korean).
                // font: this.languageService.isKorean() ? 'NotoSansKR' : 'Inter',
                font: checkWhichLanguageIsActiveAndEnableTheCorrectFont() !,
                fontSize: 10,
                lineColor: '#ffffff',
                lineWidth: 0.2,
            },
            tableWidth: 'auto',
            margin: { 
                left: 8,
                right: 8 
            },
            //* Removes the colours from the table if printOption is 'withoutColor'.
            didParseCell: data => {
                if (this.withoutColour())
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
            columnStyles: getColumnWidth(),

            //* CREDITS ======================================================================
            //* it displays in all pages in case the table takes more than one.
            didDrawPage: data => {
                doc.line(5, pdfHeight - 7, pdfWidth - 5, pdfHeight - 7);
            
                doc.setFontSize(6);
                doc.text(
                      language.isGreek() 
                    ? `Το έγγραφο δημιουργήθηκε μέσω της εφαρμογής «Product Offer to .pdf» του Νίκου Πολυζωγόπουλου. Περισσότερες πληροφορίες: https://product-offer-to-pdf.web.app`
    
                    : language.isEnglish()
                    ? `This document was generated using the "Product Offer to .pdf" Web Application made by Nick Polizogopoulos. More information: https://product-offer-to-pdf.web.app`
    
                    : language.isSpanish()
                    ? `Este documento fue generado utilizando la aplicación web "Product Offer to .pdf" creada por Nick Polizogopoulos. Más información: https://product-offer-to-pdf.web.app`
    
                    : language.isFrench()
                    ? `Ce document a été généré à l'aide de l'application Web "Product Offer to .pdf" créée par Nick Polizogopoulos. Plus d'informations : https://product-offer-to-pdf.web.app`
    
                    : language.isItalian()
                    ? `Questo documento è stato creato con l'app "Product Offer to .pdf" di Nick Polizogopoulos. Per info: https://product-offer-to-pdf.web.app`
    
                    : language.isRussian()
                    ? `Документ создан с использованием веб-приложения "Product Offer to .pdf" от Nick Polizogopoulos. Больше информации: https://product-offer-to-pdf.web.app`
    
                    : `이 문서는 Nick Polizogopoulos 가 만든 "Product Offer to .pdf" 웹 애플리케이션을 사용하여 생성되었습니다. 추가 정보: https://product-offer-to-pdf.web.app`

                    , 5, pdfHeight - 3
                );
            }
        });

        //* PAGE COUNT ===================================================================
        const pageCount: number = doc.getNumberOfPages();

        for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            doc.setFontSize(6);

            if (language.isGreek())
                doc.text(`Σελίδα ${i} από ${pageCount}`, pdfWidth - 20, pdfHeight - 3);

            else if (language.isEnglish())
                doc.text(`Page ${i} of ${pageCount}`, pdfWidth - 16, pdfHeight - 3);

            else if (language.isSpanish())
                doc.text(`Página ${i} de ${pageCount}`, pdfWidth - 18.5, pdfHeight - 3);
            
            else if (language.isFrench())
                doc.text(`Page ${i} sur ${pageCount}`, pdfWidth - 17.5, pdfHeight - 3);

            else if (language.isItalian())
                doc.text(`Pagina ${i} di ${pageCount}`, pdfWidth - 17.7, pdfHeight - 3);

            else if (language.isRussian())
                doc.text(`Страница ${i} из ${pageCount}`, pdfWidth - 21, pdfHeight - 3);

            else
                doc.text(`페이지 ${i} / ${pageCount}`, pdfWidth - 15.5, pdfHeight - 3);
                
        }

        //* PDF SAVE =====================================================================
        const replaceSpacesWithHyphens = (input: string): string => {
            return input.replace(/\s+/g, '-');
        }

        const companyName = replaceSpacesWithHyphens(pdf.companyName);
        const clientName = replaceSpacesWithHyphens(pdf.customerName);

        const getFileNameTranslation = (): string => {
            return (
                  language.isGreek()   ? 'προσφορα-σε'
                : language.isEnglish() ? 'offer-to'
                : language.isSpanish() ? 'oferta-a'
                : language.isFrench()  ? 'offre-à'
                : language.isItalian() ? 'offerta-a'
                : language.isRussian() ? 'предложение-к'
                : '제안서'
            );
        }

        const generateDate = (): string => {
            const date = new Date();
            return `${date.getDate()}-${date.getMonth() + 1 }-${date.getFullYear()}`;
        }

        doc.save(`${companyName}-${getFileNameTranslation()}-${clientName}-${generateDate()}.pdf`);
    }

}