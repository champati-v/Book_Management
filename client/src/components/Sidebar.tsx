import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, BookOpen, Plus, X, LogOut } from 'lucide-react'
import { Button } from '../components/ui/button'
import { useAuth } from '../context/AuthContext'
import { toast } from 'sonner'

interface SidebarProps {
  onClose?: () => void
}

const APP_LOGO = '/book.png'

export default function Sidebar({ onClose }: SidebarProps) {
  const location = useLocation()
  const { logout } = useAuth()

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/' },
    { icon: BookOpen, label: 'All Books', href: '/books' },
    { icon: Plus, label: 'Add Book', href: '/add-book' },
  ]

  const handleLogout = async () => {
    try {
      await logout()
      toast.success('Logged out successfully')
      onClose?.()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to logout')
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 md:p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <img src={APP_LOGO} alt="Book Vault logo" className="h-8 w-8 object-cover" />
          <h1 className="font-semibold text-lg">BookVault</h1>
        </div>
        {onClose && (
          <button onClick={onClose} className="md:hidden" aria-label="Close menu">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto p-4">
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.href
            return (
              <Link
                key={item.href}
                to={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 px-4 py-2 rounded-sm transition-colors ${
                  isActive ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-muted'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </nav>

      <div className="p-4 border-t border-border">
        <Button variant="destructive" className="w-full justify-start gap-2 cursor-pointer" onClick={handleLogout}>
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </Button>
      </div>
    </div>
  )
}
