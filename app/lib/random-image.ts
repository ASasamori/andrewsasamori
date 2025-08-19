// Random image selection utility
interface Person {
  name: string
  url: string
}

interface ImageData {
  src: string
  caption?: string
  caption2?: string
  people?: Person[]
}

export function getRandomImage(): ImageData {
  const images: ImageData[] = [
    { 
      src: '/images/ts.jpeg',
      caption: '📷 by Albert',
      caption2: '📍 Tanah Lot, ID',
      people:
      [
        {name: "Albert", url: 'https://www.linkedin.com/in/albertzhaoo/'},
        {name: "Tanah Lot, ID", url: 'https://maps.app.goo.gl/ySXcdh8WvFkjpamq5'}
      ]
    },
    { 
      src: '/images/ts2.jpeg',
      caption: '📷 by Ben',
      caption2: '📍 Sete Cidades, Portugal',
      people: 
      [
        {name: "Ben", url: "https://www.linkedin.com/in/bennettetaylor/"},
        {name: 'Sete Cidades, Portugal', url: 'https://maps.app.goo.gl/BLqx8jmeH5dRA5mEA' },
      ]
    },
    { 
      src: '/images/ts3.jpeg', 
      caption: 'With Michael, Ava, and Karston',
      caption2: '📍 Mt Tamalpais, CA',
      people: [
        { name: 'Michael', url: 'https://www.linkedin.com/in/michaelg-fong/' },
        { name: 'Karston', url: 'https://www.linkedin.com/in/karstonrunge/' },
        { name: 'Mt Tamalpais, CA', url: 'https://maps.app.goo.gl/HpsYjhVv43y7TS2J7'}
      ]
    },
    {
      src: '/images/ts4.jpeg',
      caption: 'With Arjun P., Gaurav, Tony, Arjun S., and Avi',
      people: [
        {name: 'Arjun P.', url:'https://www.linkedin.com/in/arjun-patrawala/'},
        {name: 'Gaurav', url:'https://www.linkedin.com/in/gaurav-chakravarty/'},
        {name: 'Tony', url:'https://www.linkedin.com/in/tony-xin/'},
        {name: 'Arjun S.', url:'https://www.linkedin.com/in//arjunsk18/'},
        {name: 'Avi', url:'https://www.linkedin.com/in/avi-gerber/'},
      ]
    }
  ]
  
  return images[Math.floor(Math.random() * images.length)]
}


// Export Person interface for use in components
export type { Person, ImageData }

// Alternative: if you want consistent randomness per request in SSR
export function getRandomImageSeeded(seed?: string): string {
  const images = []
  
  // Simple seeded random - you could use a more sophisticated approach
  const seedValue = seed ? seed.split('').reduce((a, b) => a + b.charCodeAt(0), 0) : Date.now()
  const index = seedValue % images.length
  
  return images[index]
}