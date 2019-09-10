import { Module } from '@nestjs/common';
import { PdfModule } from './pdf/pdf.module';

@Module({
  imports: [PdfModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
