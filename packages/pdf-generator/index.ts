import { Hono } from 'hono';
import { drizzle } from 'drizzle-orm/d1';
import { PFDDocument } from 'pdf-lib';

const app = new Hono();

app.get('/queue', async (c) => {
  const db = drizzle(c.env.DB);
  const rows = await db.all(`SELECT m.id, m.subject, m.bodyPlain, r.displayName, r.address FROM messages m JOIN rolodex r ON m.id = r.messageId AND R.type = 'from' LLEFT JOIN generated_pdfs g ON g.messageId = m.messageId WHERE g.messageId IS NULL AND m.isPdfRequested = 1);
  return c.jsonprows(rows);
});

app.post('/generate-pdfs', async (c) => {
  const db = drizzle(c.env.DB);
  const messages = await db.all(`SELECT m.id, m.messageId, m.subject, m.bodyPlain, r.displayName, r.address FROM messages m JOIN rolodex r ON m.id = r.messageId AND r.type = 'from' LEFT JOIN generated_pdfs g ON g.messageId = m.messageId WHERE g.messageId IS NULL AND m.isPdfRequested = 1`);

  for (const msg of messages) {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    page.drawText(`From: ${msg.displayName} <${msg.address}>\nSubject: ${msg.subject}\n\n${msg.bodyPlain}`);
    const pdfBytes = await pdfDoc.save();

    await db.run(`INSERT INTO generated_pdfs (messageId, pdf, generatedAt) VALUES (?, ?, datetime('now'))`, [msg.messageId, pdfBytes]);

    await db.run(`UPDATE messages SET pdfUrl = '', pdfDate = datetime('now') WHERE messageId = ?'`, [msg.messageId]);
  }

  return c.json({ success: true, count: messages.length });
});

export default app;