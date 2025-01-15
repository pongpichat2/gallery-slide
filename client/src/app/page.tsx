import ImageGallery from '@/components/image-gallery'


export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">
      <div className="py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Image Gallery</h1>
        <ImageGallery />
      </div>
    </main>
  )
}
