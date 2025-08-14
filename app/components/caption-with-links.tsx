import React from 'react'
import { Person } from '../lib/random-image'

interface CaptionWithLinksProps {
  caption: string
  caption2?: string
  people?: Person[]
  className?: string
}

export function CaptionWithLinks({ caption, caption2, people, className = "" }: CaptionWithLinksProps) {
  const processCaption = (text: string) => {
    if (!people || people.length === 0) {
      return text
    }

    // Split caption into parts and replace names with links
    let parts: React.ReactNode[] = [text]
    
    people.forEach((person, index) => {
      parts = parts.flatMap(part => {
        if (typeof part !== 'string') return part
        
        const splitParts = part.split(person.name)
        const result: React.ReactNode[] = []
        
        splitParts.forEach((textPart, i) => {
          result.push(textPart)
          if (i < splitParts.length - 1) {
            result.push(
              <a
                key={`${person.name}-${index}-${i}`}
                href={person.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-sky-600"
              >
                {person.name}
              </a>
            )
          }
        })
        
        return result
      })
    })

    return parts
  }

  return (
    <span className={className}>
      {processCaption(caption)}
      {caption2 && (
        <>
          <br />
          {processCaption(caption2)}
        </>
      )}
    </span>
  )
}