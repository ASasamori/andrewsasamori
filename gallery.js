const images = [
  {
    src: '/public/images/ts.jpeg',
    alt: 'Tanah Lot in Indonesia',
    focus: '50% 50%',
    caption: '📷 by <a href="https://www.linkedin.com/in/albertzhaoo/">Albert</a><br>📍 <a href="https://maps.app.goo.gl/ySXcdh8WvFkjpamq5">Tanah Lot, ID</a>'
  },
  {
    src: '/public/images/ts2.jpeg',
    alt: 'Sete Cidades in Portugal',
    focus: '100% 51%',
    caption: '📷 by <a href="https://www.linkedin.com/in/bennettetaylor/">Ben</a><br>📍 <a href="https://maps.app.goo.gl/BLqx8jmeH5dRA5mEA">Sete Cidades, Portugal</a>'
  },
  {
    src: '/public/images/ts3.jpeg',
    alt: 'Friends at Mount Tamalpais in California',
    focus: '65% 49%',
    caption: 'With <a href="https://www.linkedin.com/in/michaelg-fong/">Michael</a>, Ava, and <a href="https://www.linkedin.com/in/karstonrunge/">Karston</a><br>📍 <a href="https://maps.app.goo.gl/HpsYjhVv43y7TS2J7">Mt Tamalpais, CA</a>'
  },
  {
    src: '/public/images/ts4.jpeg',
    alt: 'Friends together in the San Francisco Bay Area',
    focus: '56% 41%',
    caption: 'With <a href="https://www.linkedin.com/in/arjun-patrawala/">Arjun P.</a>, <a href="https://www.linkedin.com/in/gaurav-chakravarty/">Gaurav</a>, <a href="https://www.linkedin.com/in/tony-xin/">Tony</a>, <a href="https://www.linkedin.com/in/arjunsk18/">Arjun S.</a>, and <a href="https://www.linkedin.com/in/avi-gerber/">Avi</a><br>Faithful to the Bay!'
  },
  {
    src: '/public/images/ts5.JPG',
    alt: 'North Dome in Yosemite, California',
    focus: '50% 66%',
    caption: '📷 by <a href="https://www.linkedin.com/in/mone-sekiguchi/">Mone</a><br>📍 <a href="https://maps.app.goo.gl/2dh6xkvCacoqfcEE9">North Dome, Yosemite, CA</a>'
  }
]

const selected = images[Math.floor(Math.random() * images.length)]
const photo = document.querySelector('[data-gallery-image]')
const caption = document.querySelector('[data-gallery-caption]')
const baseUrl = window.siteBaseUrl || ''

if (photo && caption) {
  photo.src = `${baseUrl}${selected.src}`
  photo.alt = selected.alt
  photo.style.objectPosition = selected.focus
  caption.innerHTML = selected.caption

  for (const link of caption.querySelectorAll('a')) {
    link.target = '_blank'
    link.rel = 'noopener noreferrer'
  }
}
