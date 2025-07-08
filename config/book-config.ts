export interface BookPage {
  id: number
  type: "image" | "text"
  content: string
  title?: string
  textContent?: string
}

export interface BookConfig {
  title: string
  subtitle: string
  coverEmoji: string
  backCoverEmoji: string
  theme: {
    primaryColor: string
    secondaryColor: string
    backgroundColor: string
    textColor: string
  }
  pages: BookPage[]
}

// Default configuration - customize this!
export const defaultBookConfig: BookConfig = {
  title: "My Gift Book",
  subtitle: "For Someone Special",
  coverEmoji: "📖",
  backCoverEmoji: "💝",
  theme: {
    primaryColor: "pink",
    secondaryColor: "purple",
    backgroundColor: "from-pink-50 via-purple-50 to-blue-50",
    textColor: "gray-800",
  },
  pages: [
    {
      id: 1,
      type: "text",
      content: "",
      title: "For My Dearest Friend",
      textContent:
        "Yeh book tumhare liye hai... filled with all our memories and the love I have for you. Turn each page to relive our beautiful journey together! ❤️",
    },
    {
      id: 2,
      type: "image",
      content: "/placeholder.svg?height=600&width=400",
      title: "Our First Adventure",
    },
    {
      id: 3,
      type: "text",
      content: "",
      title: "That Crazy Day",
      textContent:
        "Remember jab hum lost ho gaye the? Hahaha! But it was so much fun exploring those galiyan together. Tu hamesha mujhe hasata rehta hai! 😄",
    },
    {
      id: 4,
      type: "image",
      content: "/placeholder.svg?height=600&width=400",
      title: "Coffee Dates",
    },
    {
      id: 5,
      type: "text",
      content: "",
      title: "Thank You",
      textContent:
        "For being the most amazing friend anyone could ask for. Tere bina life boring hoti! Here's to many more years of friendship and adventures! 🌟",
    },
    {
      id: 6,
      type: "text",
      content: "",
      title: "The End... or Beginning?",
      textContent: "This book might end here, but our friendship story continues forever! Love you, my dear friend! 💕",
    },
  ],
}

// Helper function to add a new page
export const addPage = (config: BookConfig, page: BookPage): BookConfig => {
  return {
    ...config,
    pages: [...config.pages, { ...page, id: config.pages.length + 1 }],
  }
}

// Helper function to remove a page
export const removePage = (config: BookConfig, pageId: number): BookConfig => {
  return {
    ...config,
    pages: config.pages.filter((page) => page.id !== pageId),
  }
}
