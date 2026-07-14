// THIS FILE IS NOT CURRENTLY BEING USED RN!

'use client'

import { useEffect, useState } from 'react'

export default function ProjectStatLine({
  stat,
  count,
  maxCount = 365,
  duration = 10000,
}: {
  stat: string
  count: number
  maxCount?: number
  duration?: number
}) {
  const [animate, setAnimate] = useState(false)
  const percentage = Math.min((count / maxCount) * 100, 100)

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="grid grid-cols-6 gap-4 items-center">
      <div className="col-span-2 text-sm text-stone-400">{stat}</div>
      
      <div className="col-span-4 flex items-center gap-2">
        <div className="flex-1 bg-stone-700 rounded-lg h-2 overflow-hidden">
          <div
            className="bg-purple-400 h-full rounded-lg transition-all ease-out"
            style={{
              width: animate ? `${percentage}%` : '0%',
              transitionDuration: `${duration}ms`,
            }}
          />
        </div>
        <div className="min-w-fit text-xs text-purple-400 uppercase">
          {count} days
        </div>
      </div>
    </div>
  )
}