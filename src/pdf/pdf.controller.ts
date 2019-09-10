import { Controller, Post, Body, Header, Res } from "@nestjs/common";
import { PdfService, PDFRenderOptions } from "./pdf.service";
import { Response } from "express";


@Controller('pdf')
export class PdfController {
    constructor(
        private readonly pdfMaker: PdfService
    ) {}
    /**
     * Render PDF From Url 
     */
    @Post('render-url')
    @Header('Content-Type', 'application/pdf')
    @Header('Content-Disposition', 'attachment; filename=result.pdf')
    async postRenderFromUrl(
        @Res() res: Response,
        @Body('url') url: string,
        @Body('filename') filename?: string,
        @Body('options') options?: PDFRenderOptions
    ) {
        const buffer = await this.pdfMaker.renderPdfFromUrl(url, options);
        const stream = this.pdfMaker.createReadableStream(buffer);

        if(filename) {
            res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
        }

        stream.pipe(res);
    }
    /**
     * Render PDF From HTML
     */
    @Post('render-html')
    @Header('Content-Type', 'application/pdf')
    @Header('Content-Disposition', 'attachment; filename=result.pdf')
    async postRenderFromHtml(
        @Res() res: Response,
        @Body('html') html: string,
        @Body('filename') filename?: string,
        @Body('options') options?: PDFRenderOptions
    ) {
        const buffer = await this.pdfMaker.renderPdfFromHtml(html, options);
        const stream = this.pdfMaker.createReadableStream(buffer);

        if(filename) {
            res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
        }

        stream.pipe(res);
    }
}