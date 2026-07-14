import { createReadStream } from 'node:fs'
import fs from 'node:fs/promises'
import http from 'node:http'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist')
const port = Number(process.env.PORT || 3000)
const mimeTypes = {
  '.css': 'text/css; charset=utf-8',
  '.gif': 'image/gif',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.pdf': 'application/pdf',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp'
}

const server = http.createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, `http://${request.headers.host}`).pathname)
    const candidate = path.resolve(root, `.${pathname}`)

    if (!candidate.startsWith(root + path.sep) && candidate !== root) {
      response.writeHead(403).end('Forbidden')
      return
    }

    let file = candidate
    const stat = await fs.stat(file).catch(() => null)
    if (stat?.isDirectory()) file = path.join(file, 'index.html')

    const fileStat = await fs.stat(file).catch(() => null)
    if (!fileStat?.isFile()) {
      response.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' }).end('Not found')
      return
    }

    response.writeHead(200, { 'content-type': mimeTypes[path.extname(file).toLowerCase()] || 'application/octet-stream' })
    createReadStream(file).pipe(response)
  } catch {
    response.writeHead(500, { 'content-type': 'text/plain; charset=utf-8' }).end('Server error')
  }
})

server.listen(port, () => console.log(`Static portfolio available at http://localhost:${port}`))
