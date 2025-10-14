'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { getRandomImage } from '../lib/random-image'
import { CaptionWithLinks } from './caption-with-links'

export function RandomImageClient() {
  const [imageData, setImageData] = useState(getRandomImage())
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Generate new random image on client side
    setImageData(getRandomImage())
    setIsLoading(false)
  }, [])

  if (isLoading) {
    // Show a placeholder or the server-side image while loading
    return (
      <div className="mt-8 flex flex-col items-center">
        <div className="w-full max-w-[600px] h-64 bg-gray-200 dark:bg-gray-700 rounded-lg shadow-lg animate-pulse"></div>
      </div>
    )
  }

  return (
    <div className="mt-8 flex flex-col items-center">
      <Image
        src={imageData.src}
        alt="Random gallery image"
        width={600}
        height={400}
        className="max-w-full h-auto object-contain rounded-lg shadow-lg"
        priority
      />
      {imageData.caption && (
        <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 text-center">
          <CaptionWithLinks 
            caption={imageData.caption}
            caption2={imageData.caption2}
            people={imageData.captionLink}
          /> 
        </p>
      )}
    </div>
  )
}