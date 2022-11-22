import { Injectable, Logger } from '@nestjs/common';
import { Readable } from 'stream';
import puppeteer from 'puppeteer';

export interface PDFRenderOptions {
  page: Partial<puppeteer.PDFOptions>;
  screen?: boolean;
}

@Injectable()
export class PdfService {
  private readonly logger: Logger = new Logger(PdfService.name);

  /**
   * Render PDF From URL
   * @param url
   * @param options
   */
  async renderPdfFromUrl(url: string, options?: PDFRenderOptions) {
    this.logger.log('Try to open puppeteer browser...');
    const browser = await puppeteer.launch();

    this.logger.log('Try to open browser new page...');
    const page = await browser.newPage();

    this.logger.log(`Navigate to ${url}...`);
    await page.goto(url);

    await this.emulateMediaType(options, page);

    this.logger.log(`Generate PDF...`);
    const pdfContent = await page.pdf(options.page);

    this.logger.log(`Close Browser...`);
    await browser.close();

    return pdfContent;
  }
  /**
   * Render PDF From HTML
   * @param html
   * @param options
   */
  async renderPdfFromHtml(html: string, options?: PDFRenderOptions) {
    this.logger.log('Try to open puppeteer browser...');
    const browser = await puppeteer.launch();

    this.logger.log('Try to open browser new page...');
    const page = await browser.newPage();

    this.logger.log(`Load HTML...`);
    await page.setContent(html, {
      waitUntil: 'domcontentloaded',
      timeout: 0,
    });

    await this.emulateMediaType(options, page);

    this.logger.log(`Generate PDF...`);
    const pdfContent = await page.pdf(options.page);

    this.logger.log(`Close Browser...`);
    await browser.close();

    return pdfContent;
  }

  private async emulateMediaType(
    options: PDFRenderOptions,
    page: puppeteer.Page,
  ) {
    if (options) {
      await page.emulateMediaType(options.screen ? 'screen' : 'print');
    }
  }

  /**
   * Create Readable Stream
   * @param buffer
   */
  createReadableStream(buffer: Buffer) {
    const stream: Readable = new Readable();
    stream.push(buffer);
    stream.push(null);
    return stream;
  }
}
