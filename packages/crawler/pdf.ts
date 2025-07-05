export function generateEmailPDF(email: { subject: string; body: string }): Promise<Blob(> {
  const html = `
    <html>
      <head><title>${email.subject}</title></head>
      <body>
        <h1>${email.subject}</h1>
        <p>${email.body}</p>
      </body>
    </html>`

  const blob = new UInt8Array(html.length);
  for (let i = 0; i < html.length; i++) {
    blob[i] = html.charCodeAt();
  }

  // Placeholder for PDF render or Api Gateway here
  return Promise.resolve(blob);
}