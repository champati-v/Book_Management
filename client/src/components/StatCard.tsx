import type { LucideIcon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

interface StatCardProps {
  title: string
  value: number | string
  icon: LucideIcon
  subtitle?: string
  trend?: string
  accentClassName?: string
}

export default function StatCard({
  title,
  value,
  icon: Icon,
  subtitle,
  trend,
  accentClassName,
}: StatCardProps) {
  return (
    <Card className="border-border shadow-sm transition-all duration-300 hover:-translate-y-0.5">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className={`rounded-md p-2 ${accentClassName ?? 'bg-muted'}`}>
          <Icon className="w-4 h-4 text-foreground" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {(subtitle || trend) && (
          <p className="text-xs text-muted-foreground mt-2">
            {subtitle && <span>{subtitle}</span>}
            {trend && <span className="text-green-600 dark:text-green-400">{trend}</span>}
          </p>
        )}
      </CardContent>
    </Card>
  )
}
