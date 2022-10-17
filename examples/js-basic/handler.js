/**
 * Builds a reply to the given request
 */
const reply = (request) => {
  if (request.method != "GET") {
    // Don't allow other methods.
    // Here you can see how to return a custom status
    return new Response("Method not allowed", {
      status: 405
    });
  }

  // Body response
  const body = `<!DOCTYPE html>
<head>
  <title>Wasm Workers Server</title>
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta charset="UTF-8">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/water.css@2/out/water.css">
  <style>
    body { max-width: 1000px; }
    main { margin: 5rem 0; }
    h1, p { text-align: center; }
    h1 { margin-bottom: 2rem; }
    pre { font-size: .9rem; }
    pre > code { padding: 2rem; }
    p { margin-top: 2rem; }
  </style>
</head>
<body>
  <main>
    <h1>Hello from Wasm Workers Server 👋</h1>
    <pre><code>Replying to ${request.url}
Method: ${request.method}
User Agent: ${request.headers.get("userAgent")}
Payload: ${request.body || "-"}</code></pre>
    <p>
      This page was generated by a JavaScript file running in WebAssembly.
    </p>
  </main>
</body>`;

  // Build a new response
  let response = new Response(body);

  // Add a new header
  response.headers.set("x-generated-by", "wasm-workers-server");

  return response;
}

// Subscribe to the Fetch event
addEventListener("fetch", event => {
  return event.respondWith(reply(event.request));
});