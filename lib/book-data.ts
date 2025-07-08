export interface BookPage {
  id: number
  type: "image" | "text"
  content: string
  title?: string
  textContent?: string
  caption?: string
  date?: string
}

export const bookPages: BookPage[] = [
  {
    id: 1,
    type: "text",
    content: "",
    title: "Dear Friend... 💕",
    textContent: `Yeh book tumhare liye hai, mere pyaare dost!

Jab bhi tum sad feel karo ya khushi share karni ho, 
yeh pages tumhare saath hain.

Har page mein humari memories aur pyaar hai. 
I hope yeh tumhe smile deta rahe! ✨`,
    date: "With love, always",
  },
  {
    id: 2,
    type: "text",
    content: "",
    title: "Our First Meeting 🌟",
    textContent: `Remember jab hum pehli baar mile the?

Tum itne nervous the, aur main bhi! 
But somehow we just clicked instantly.

That day I knew ki tum special ho, 
aur ab look - we're such good friends! 😊`,
    date: "That magical day",
  },
  {
    id: 3,
    type: "image",
    content: "/placeholder.svg?height=500&width=400",
    title: "Our First Photo Together",
    caption: "Look how happy we were! This moment will always be special 📸",
  },
  {
    id: 4,
    type: "text",
    content: "",
    title: "All Our Adventures 🎉",
    textContent: `From late night chats to crazy adventures,
From sharing secrets to making memories,
From laughing till our stomach hurts 
to being there in tough times...

Har moment has been so special with you! 
Thank you for being such an amazing friend. 💖`,
    date: "Forever grateful",
  },
  {
    id: 5,
    type: "image",
    content: "/placeholder.svg?height=500&width=400",
    title: "Adventure Time!",
    caption: "That crazy day when we got lost but had so much fun! 😂",
  },
  {
    id: 6,
    type: "text",
    content: "",
    title: "Thank You 🙏",
    textContent: `For being you,
For being there,
For all the laughs,
For all the support,
For being the best friend anyone could ask for!

I'm so lucky to have you in my life. 
This book is just a small way to say THANK YOU! ✨`,
    date: "Always and forever",
  },
]
