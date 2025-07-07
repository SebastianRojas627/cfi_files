import * as ejs from 'ejs';
import * as path from 'path';
import * as puppeteer from 'puppeteer';
import {
  RespuestaBusqueda,
} from 'src/files/utils/types/types';

export async function generatePDFBuffer(
  respuesta: RespuestaBusqueda,
): Promise<Buffer> {

  const html = await ejs.renderFile(
    path.join(__dirname, 'templates/layout.ejs'),
    { respuesta },
    { async: false },
  );

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0' });

  const headerHtml = `
  <style>
    .header {
      font-size: 12px;
      color: #666;
      width: 100%;
      text-align: center;
    }
  </style>
  <div class="header">
    Reporte generado por el sistema Nexus
  </div>
`;

  const footerHtml = `
  <style>
    .footer {
      font-size: 10px;
      color: #999;
      width: 100%;
      text-align: right;
      padding-right: 10px;
    }
  </style>
  <div class="footer">
    Página <span class="pageNumber"></span> de <span class="totalPages"></span>
  </div>
`;

  const pdf = await page.pdf({
    format: 'A4',
    printBackground: true,
    displayHeaderFooter: true,
    headerTemplate: headerHtml,
    footerTemplate: footerHtml,
    margin: {
      top: '30px',
      bottom: '15px',
    },
  });

  await browser.close();
  return await Buffer.from(pdf);
}
