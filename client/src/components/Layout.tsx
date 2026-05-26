import { useState } from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-background">
      <div className="hidden md:flex w-64 flex-col border-r border-border">
        <Sidebar />
      </div>

      {isSidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 md:hidden">
          <div className="fixed left-0 top-0 h-screen w-64 flex-col bg-background border-r border-border overflow-y-auto">
            <Sidebar onClose={() => setIsSidebarOpen(false)} />
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} isSidebarOpen={isSidebarOpen} />
        <main className="flex-1 overflow-y-auto p-4 md:p-8">{children}</main>
      </div>
    </div>
  )
}
