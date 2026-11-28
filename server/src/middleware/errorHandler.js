// Consistent JSON error handling for the whole API.
//
// Every error response has the same shape:
//   { "error": "human-readable message" }
// with a suitable HTTP status code — never an HTML error page.

// Small helper so route handlers can fail with a status + message.
export class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

// 404 for any /api route that does not exist.
export function notFoundHandler(req, res) {
  res.status(404).json({ error: `Route not found: ${req.method} ${req.originalUrl}` });
}

// Final error handler (Express recognises it by the 4-argument signature).
// Handles ApiError, malformed JSON bodies (from express.json()) and
// anything unexpected.
// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  // Body-parser / express.json() rejects malformed JSON with a SyntaxError
  // that carries status 400.
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ error: 'Malformed JSON in request body' });
  }
  if (err instanceof ApiError) {
    return res.status(err.status).json({ error: err.message });
  }
  if (err.status && err.status >= 400 && err.status < 500) {
    return res.status(err.status).json({ error: err.message });
  }
  console.error(err);
  return res.status(500).json({ error: 'Internal server error' });
}
