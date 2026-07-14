import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeRaw from 'rehype-raw'
import rehypeStringify from 'rehype-stringify'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const siteDirectory = path.join(root, 'site')
const postsDirectory = path.join(root, 'content', 'blogs')
const publicDirectory = path.join(root, 'public')
const outputDirectory = path.join(root, 'dist')

const escapeHtml = (value = '') => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;')

const formatDate = (date) => new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  timeZone: 'UTC'
}).format(date)

const slugFromFilename = (filename) => filename.replace(/\.md$/i, '')

async function readPosts() {
  const filenames = (await fs.readdir(postsDirectory)).filter((name) => name.endsWith('.md'))

  return Promise.all(filenames.map(async (filename) => {
    const source = await fs.readFile(path.join(postsDirectory, filename), 'utf8')
    const { data, content } = matter(source)
    const date = new Date(data.date)

    if (!data.title || Number.isNaN(date.getTime())) {
      throw new Error(`${filename} needs valid title and date front matter`)
    }

    const processed = await remark()
      .use(remarkGfm)
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypeRaw)
      .use(rehypeStringify)
      .process(content)

    return {
      slug: slugFromFilename(filename),
      title: String(data.title),
      description: String(data.description || data.title),
      date,
      html: processed.toString().replaceAll('<table>', '<div class="table-wrap"><table>').replaceAll('</table>', '</table></div>')
    }
  }))
}

async function build() {
  const posts = (await readPosts()).sort((a, b) => b.date - a.date)
  const [indexTemplate, blogTemplate, postTemplate] = await Promise.all([
    fs.readFile(path.join(siteDirectory, 'index.html'), 'utf8'),
    fs.readFile(path.join(siteDirectory, 'blog-index.html'), 'utf8'),
    fs.readFile(path.join(siteDirectory, 'post.html'), 'utf8')
  ])

  await fs.rm(outputDirectory, { recursive: true, force: true })
  await fs.mkdir(outputDirectory, { recursive: true })
  await fs.cp(publicDirectory, outputDirectory, { recursive: true })
  await fs.copyFile(path.join(siteDirectory, 'styles.css'), path.join(outputDirectory, 'styles.css'))
  await fs.copyFile(path.join(siteDirectory, 'gallery.js'), path.join(outputDirectory, 'gallery.js'))
  await fs.writeFile(path.join(outputDirectory, 'index.html'), indexTemplate)

  const list = `<ol class="post-list">\n${posts.map((post) => [
    '  <li>',
    `    <a href="/blogs/${post.slug}/">${escapeHtml(post.title)}</a>`,
    `    <time datetime="${post.date.toISOString().slice(0, 10)}">${formatDate(post.date)}</time>`,
    '  </li>'
  ].join('\n')).join('\n')}\n</ol>`

  const blogsOutput = path.join(outputDirectory, 'blogs')
  await fs.mkdir(blogsOutput, { recursive: true })
  await fs.writeFile(path.join(blogsOutput, 'index.html'), blogTemplate.replace('{{POST_LIST}}', list))

  for (const post of posts) {
    const postOutput = path.join(blogsOutput, post.slug)
    const html = postTemplate
      .replaceAll('{{TITLE}}', escapeHtml(post.title))
      .replaceAll('{{DESCRIPTION}}', escapeHtml(post.description))
      .replace('{{ISO_DATE}}', post.date.toISOString().slice(0, 10))
      .replace('{{DISPLAY_DATE}}', formatDate(post.date))
      .replace('{{CONTENT}}', post.html)

    await fs.mkdir(postOutput, { recursive: true })
    await fs.writeFile(path.join(postOutput, 'index.html'), html)
  }

  console.log(`Built static site with ${posts.length} blog post${posts.length === 1 ? '' : 's'} in dist/`)
}

await build()
