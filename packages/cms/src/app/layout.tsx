import type { Metadata } from 'next'
import { DeployButton } from '@/components/DeployButton'
import './globals.css'

export const metadata: Metadata = {
  title: 'Portfolio CMS',
  description: 'Manage your portfolio content',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="flex h-screen">
          {/* Sidebar */}
          <aside className="w-64 bg-gray-900 text-white p-6 flex flex-col h-screen">
            <div className="flex-1">
              <h1 className="text-2xl font-bold mb-8">Portfolio CMS</h1>
              <nav className="space-y-4">
                <a href="/" className="block hover:text-gray-300">Dashboard</a>
                <a href="/profile" className="block hover:text-gray-300">Profile</a>
                <a href="/projects" className="block hover:text-gray-300">Projects</a>
                <a href="/skills" className="block hover:text-gray-300">Skills</a>
                <a href="/experience" className="block hover:text-gray-300">Experience</a>
                <a href="/blog" className="block hover:text-gray-300">Blog</a>
                <a href="/contact" className="block hover:text-gray-300">Contact</a>
              </nav>
            </div>
            <div className="border-gray-700">
              <DeployButton />
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 overflow-auto">
            <div className="p-8">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  )
}
