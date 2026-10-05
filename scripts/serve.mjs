// SPDX-FileCopyrightText: 2026 Oliver Simon
// SPDX-License-Identifier: MIT
import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import { root } from './lib.mjs';

const port = Number(process.env.PORT || 8080);
const types = {
  '.html': 'text/html',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.md': 'text/plain',
};
const server = http.createServer(async (request, response) => {
  try {
    if (!['GET', 'HEAD'].includes(request.method)) {
      response.writeHead(405);
      return response.end();
    }
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    if (pathname.split('/').some((part) => part.startsWith('.') && part !== '')) {
      response.writeHead(403);
      return response.end('Forbidden');
    }
    let filename = path.resolve(root, '.' + pathname);
    if (filename !== root && !filename.startsWith(root + path.sep)) {
      response.writeHead(403);
      return response.end('Forbidden');
    }
    if ((await fs.stat(filename)).isDirectory()) filename = path.join(filename, 'index.html');
    const contents = await fs.readFile(filename);
    response.writeHead(200, {
      'Content-Type':
        (types[path.extname(filename)] || 'application/octet-stream') + '; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
    });
    response.end(request.method === 'HEAD' ? undefined : contents);
  } catch {
    response.writeHead(404);
    response.end('Not found');
  }
});
server.listen(port, '127.0.0.1', () =>
  console.log(
    'Gallery: http://127.0.0.1:' +
      server.address().port +
      '\nSprite examples: http://127.0.0.1:' +
      server.address().port +
      '/examples/sprite.html',
  ),
);
