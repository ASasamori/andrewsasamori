'use client'

export interface GardenSection {
  icon: string
  items: string[]
}

const gardenSections: GardenSection[] = [
  {
    icon: "🏫",
    items : [
      "Test", 
      "Professors"
    ]
  },
  {
    icon: "🎖️", 
    items: [
      "Test 2"
    ]
  },
  {
    icon: "/icons/lofi.jpg",
    items: [
      "",
      ""
    ]
  },
  {
    icon: "📚",
    items: [
      ""
    ]
  }
]

export default function DigitalGardenGrid() {

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-center mb-6">
        <img 
        src="/images/garden.png"
        className="w-64 aspect-square object-cover rounded-md"/>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {gardenSections.map((section, index) => (
          <div 
            key={index}
            className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow duration-200"
          >
            <div className="flex items-center gap-3 mb-4">
              {section.icon.startsWith('/') ? (
                <img
                  src={section.icon}
                  className="w-8 h-8 object-cover rounded"
                />
              ) : (
                <span className="w-8 h-8 flex items-center justify-center text-2xl">
                  {section.icon}
                </span>
              )}
            </div>
            
            <div className="space-y-2">
              {section.items.map((item, itemIndex) => (
                <a 
                  key={itemIndex}
                  className="block text-gray-700 dark:text-gray-300 text-sm leading-relaxed hover:text-sky-600 transition-colors"
                  href={`/digital_garden/${item.toLowerCase().replace(/[^a-z0-9]/g, "_").replace(/_+/g, "_").replace(/^_|_$/g, "")}`}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}