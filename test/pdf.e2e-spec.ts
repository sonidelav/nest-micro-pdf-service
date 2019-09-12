import * as request from 'supertest'
import { INestApplication } from "@nestjs/common"
import { Test } from "@nestjs/testing"
import { PdfModule } from "../src/pdf/pdf.module"

describe('PDF Module', () => {
    let app: INestApplication

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: [PdfModule]
        }).compile();

        app = module.createNestApplication();
        await app.init();
    })

    it('/POST pdf/render-url without filename', () => {
        return request(app.getHttpServer())
            .post('/pdf/render-url')
            .send({
                url: "https://www.google.gr",
                options: {
                    screen: false,
                    page: {
                        format: "A4",
                        landscape: false,
                        height: null,
                        width: null
                    }
                }
            })
            .expect('Content-Type', /pdf/)
            .expect('Content-Disposition', 'attachment; filename=result.pdf')
            .expect(201)
    })

    it('/POST pdf/render-url with filename', () => {
        return request(app.getHttpServer())
            .post('/pdf/render-url')
            .send({
                url: "https://www.google.gr",
                filename: "test.pdf",
                options: {
                    screen: false,
                    page: {
                        format: "A4",
                        landscape: false,
                        height: null,
                        width: null
                    }
                }
            })
            .expect('Content-Type', /pdf/)
            .expect('Content-Disposition', 'attachment; filename=test.pdf')
            .expect(201)
    })

    it('/POST pdf/render-html without filename', () => {
        return request(app.getHttpServer())
            .post('/pdf/render-html')
            .send({
                html: "<h1>HELLO WORLD</h1>",
                options: {
                    screen: false,
                    page: {
                        format: "A4",
                        landscape: false,
                        height: null,
                        width: null
                    }
                }
            })
            .expect('Content-Type', /pdf/)
            .expect('Content-Disposition', 'attachment; filename=result.pdf')
            .expect(201)
    })

    it('/POST pdf/render-html with filename', () => {
        return request(app.getHttpServer())
            .post('/pdf/render-html')
            .send({
                html: "<h1>HELLO WORLD</h1>",
                filename: 'test.pdf',
                options: {
                    screen: false,
                    page: {
                        format: "A4",
                        landscape: false,
                        height: null,
                        width: null
                    }
                }
            })
            .expect('Content-Type', /pdf/)
            .expect('Content-Disposition', 'attachment; filename=test.pdf')
            .expect(201)
    })

    afterAll(async () => {
        await app.close();
    })
})