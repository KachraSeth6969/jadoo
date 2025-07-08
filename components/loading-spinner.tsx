export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[600px] space-y-6">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-stone-200 border-t-stone-400 rounded-full animate-spin"></div>
        <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-stone-300 rounded-full animate-spin animation-delay-150"></div>
      </div>
      <div className="text-center space-y-2">
        <p className="text-stone-600 font-medium">Preparing your book...</p>
        <p className="text-sm text-stone-500">Loading interactive pages</p>
      </div>
    </div>
  )
}
