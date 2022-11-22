import { Module } from '@nestjs/common';
import { PdfModule } from './pdf/pdf.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      renderPath: '/',
    }),
    PdfModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
