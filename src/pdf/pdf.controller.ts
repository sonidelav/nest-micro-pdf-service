import { Controller, Post, Body, Res } from '@nestjs/common';
import { PdfService, PDFRenderOptions } from './pdf.service';
import { Response } from 'express';

@Controller('pdf')
export class PdfController {
  constructor(private readonly pdfMaker: PdfService) {}

  /**
   * Render PDF From Url
   */
  @Post('render-url')
  async postRenderFromUrl(
    @Res() res: Response,
    @Body('url') url: string,
    @Body('filename') filename?: string,
    @Body('json') json?: boolean,
    @Body('options') options?: PDFRenderOptions,
  ) {
    const buffer = await this.pdfMaker.renderPdfFromUrl(url, options);
    this.responseAsPdf(json, buffer, res, filename);
  }

  /**
   * Render PDF From HTML
   */
  @Post('render-html')
  async postRenderFromHtml(
    @Res() res: Response,
    @Body('html') html: string,
    @Body('filename') filename?: string,
    @Body('json') json?: boolean,
    @Body('options') options?: PDFRenderOptions,
  ) {
    const buffer = await this.pdfMaker.renderPdfFromHtml(html, options);
    this.responseAsPdf(json, buffer, res, filename);
  }

  private responseAsPdf(
    json: boolean,
    buffer: Buffer,
    res: Response,
    filename: string,
  ) {
    if (!json) {
      const stream = this.pdfMaker.createReadableStream(buffer);
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=result.pdf');
      if (filename) {
        res.setHeader(
          'Content-Disposition',
          `attachment; filename=${filename}`,
        );
      }
      stream.pipe(res);
    } else {
      res.setHeader('Content-Type', 'application/json;charset=UTF-8');
      res.status(200).send({
        content: buffer.toString('base64'),
        filename: filename || 'result.pdf',
        mimeType: 'application/pdf',
      });
    }
  }
}
