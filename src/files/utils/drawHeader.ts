import PDFDocument from 'pdfkit';
type Doc = InstanceType<typeof PDFDocument>;

export function cm(n: number): number {
  return n * 28.3465; // 1 cm ≈ 28.3465 puntos
}

export function drawHeader(doc: Doc, pageNumber: number, logoPath?: string) {
  doc.font('Helvetica-Bold').fontSize(15);

  // Logo placeholder
  /*
  if (logoPath) {
    doc.image(logoPath, cm(0.4), cm(0.2), { width: cm(2.6), height: cm(2.6) });
  }
  */

  doc
    .fillColor('rgb(85,107,47)')
    .fontSize(15)
    .text('POLICIA', cm(3.2), cm(1.5))
    .text('BOLIVIANA', cm(3.2), cm(2.1));

  doc
    .save()
    .lineWidth(0.8)
    .strokeColor('rgb(85,107,47)')
    .moveTo(cm(7.5), cm(0.3))
    .lineTo(cm(7.5), cm(2.7))
    .stroke()
    .restore();

  doc
    .font('Helvetica-Bold')
    .fontSize(10)
    .fillColor('rgb(85,107,47)')
    .text('prueba de titulo', cm(8.5), cm(1.5));

  doc.fontSize(8).fillColor('black').text('Serie:', cm(8.5), cm(2));
  doc.font('Helvetica-Bold').text('prueba de fud', cm(9.7), cm(2));

  doc
    .lineWidth(0.8)
    .strokeColor('rgb(85,107,47)')
    .moveTo(cm(0.5), cm(3.2))
    .lineTo(cm(17.5), cm(3.2))
    .stroke();
  doc.moveDown(3);
}

export function drawFooter(doc: Doc, pageNumber: number, totalPages: number) {
  const textLeft = 'CFI de la FELCC Bolivia';
  const textRight = `${pageNumber} de ${totalPages}`;
  const y = doc.page.height - cm(3.5);

  doc
    .lineWidth(0.8)
    .strokeColor('rgb(85,107,47)')
    .moveTo(cm(0.5), y)
    .lineTo(cm(17.5), y)
    .stroke();

  doc
    .fontSize(10)
    .fillColor('black')
    .text(textLeft, cm(0.5), y + cm(0.1));

  doc.text(textRight, cm(15), y + cm(0.1), { align: 'right' });
}
