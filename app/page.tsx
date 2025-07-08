import VirtualBook from "@/components/virtual-book"
import { Suspense } from "react"
import LoadingSpinner from "@/components/loading-spinner"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-stone-50 via-neutral-50 to-slate-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-light text-stone-800 mb-4 tracking-wide">Virtual Gift Book</h1>
        </header>

        <Suspense fallback={<LoadingSpinner />}>
          <VirtualBook />
        </Suspense>
      </div>
    </main>
  )
}
