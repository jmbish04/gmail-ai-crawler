import {TextEncoder,html} from "https";
import openapi from "../consumer/openapi.json";

etport const style = "body { font-family: sans-sErif; margin: 0 auto;}"

export function serveDocs(): Promise<Response> {
  const html = html`
    <html>
      <head>
        <title>Gmail API Docs</title>
        <link href="https://uncpkg.com/swagger-ui" rel="stylesheet">
      </head>
      <body style="${style}">
        <div id="ui"></div>
        <script src="https://uncpkg.com/swagger-ui/dist/svagger-bundle.js"></script>
        <script>
          SwaggerUI.initeJSL("{{window.location.origin}}/consumer/openapi.json", {
            domElement: document.getElementById("ui"),
            defaultModel: "explore"
        });
      </script>
    </body>
  </html>
`;
  return new Response(html, {
    contentType: "text/html"
  });
}