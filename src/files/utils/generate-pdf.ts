const PDFDocument = require('pdfkit');
type Doc = InstanceType<typeof PDFDocument>;
import { Buffer } from 'buffer';
import { RespuestaSujeto } from './types/types';
import { drawFooter, drawHeader } from './drawHeader';

function resetX(doc: Doc) {
  doc.x = doc.page.margins.left;
}

function drawSegip(doc: Doc, segip: NonNullable<RespuestaSujeto['segip']>) {
  resetX(doc);
  doc.fontSize(12).text('SEGIP', { underline: true });
  Object.entries(segip).forEach(([k, v]) => {
    resetX(doc);
    doc.text(`${k.replace(/_/g, ' ')}: ${v}`);
  });
  doc.moveDown();
}

function drawSinarap(
  doc: Doc,
  sinarap: NonNullable<RespuestaSujeto['sinarap']>,
) {
  resetX(doc);
  doc.fontSize(12).text('SINARAP', { underline: true });
  ['TRANSITO', 'FELCC', 'FELCN', 'FELCV', 'DIPROVE'].forEach((unidad) => {
    const records = sinarap[unidad as keyof typeof sinarap];
    resetX(doc);
    if (Array.isArray(records)) {
      doc.text(`${unidad}: ${records.length} registros`);
      records.forEach((record, i) => {
        resetX(doc);
        doc.text(`Registro ${i + 1}:`);
        Object.entries(record).forEach(([k, v]) => {
          resetX(doc);
          doc.text(`  ${k}: ${v}`);
        });
      });
    } else {
      doc.text(`${unidad}: ${records}`);
    }
    doc.moveDown();
  });
}

function drawITV(doc: Doc, datos: { [k: string]: string | number }) {
  resetX(doc);
  doc.fontSize(12).text('ITV - Datos Técnicos', { underline: true });
  Object.entries(datos).forEach(([k, v]) => {
    resetX(doc);
    doc.text(`${k.replace(/_/g, ' ')}: ${v}`);
  });
  doc.moveDown();
}

function ensureSpace(
  doc: Doc,
  neededHeight: number,
  onNewPage: () => void,
  pageNumber: number,
  totalPages: number,
) {
  const bottomY = doc.page.height - doc.page.margins.bottom;
  if (doc.y + neededHeight > bottomY) {
    drawFooter(doc, pageNumber, totalPages);
    doc.addPage();
    onNewPage();
  }
}

export async function generatePDFBuffer(
  data: RespuestaSujeto[],
): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 50 });
    const chunks: Buffer[] = [];
    doc.on('data', (c) => chunks.push(c));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', reject);

    let pageNumber = 1;
    const totalPages = data.length + 1;

    // Portada
    drawHeader(doc, pageNumber);
    doc.moveDown(5);
    doc
      .fontSize(18)
      .text('Reporte de Búsqueda de Sujetos', { align: 'center' });
    drawFooter(doc, pageNumber, totalPages);

    data.forEach((sujeto, idx) => {
      // calculamos espacio que necesitaremos (aprox)
      ensureSpace(
        doc,
        120,
        () => {
          pageNumber++;
          drawHeader(doc, pageNumber);
        },
        pageNumber,
        totalPages,
      );

      resetX(doc);
      doc
        .fontSize(14)
        .text(`Sujeto #${idx + 1} - Tipo: ${sujeto.tipo}`, { underline: true });

      if (sujeto.ci) {
        resetX(doc);
        doc.text(`CI: ${sujeto.ci}`);
      }
      if (sujeto.placa) {
        resetX(doc);
        doc.text(`Placa: ${sujeto.placa}`);
      }
      doc.moveDown();

      if (sujeto.segip) drawSegip(doc, sujeto.segip);
      if (sujeto.sinarap) drawSinarap(doc, sujeto.sinarap);

      drawFooter(doc, pageNumber, totalPages);
    });

    doc.end();
  });
}
