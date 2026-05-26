import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Card, CardContent } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Button } from '../components/ui/button'
import { Separator } from '../components/ui/separator'
import { Alert, AlertDescription } from '../components/ui/alert'
import { Loader2, Mail, Lock } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { toast } from 'sonner'

interface LoginFormValues {
  email: string
  password: string
}

const APP_LOGO = '/book.png'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [formError, setFormError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>()

  const onSubmit = async (values: LoginFormValues) => {
    setFormError('')
    try {
      await login(values)
      toast.success('Login successful')
      const redirectPath = (location.state as { from?: { pathname?: string } })?.from?.pathname || '/'
      navigate(redirectPath, { replace: true })
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Login failed'
      setFormError(message)
      toast.error(message)
    }
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      <div className="hidden lg:flex relative overflow-hidden border-r border-border bg-muted/40 p-12">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
        <div className="relative z-10 flex h-full flex-col justify-between">
          <div className="flex items-center gap-3">
            <img src={APP_LOGO} alt="Book Vault logo" className="h-12 w-12 object-cover" />
            <div>
              <h1 className="text-xl font-semibold text-foreground">Book Vault</h1>
              <p className="text-sm text-muted-foreground">Manage your books seamlessly</p>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="max-w-md text-4xl font-semibold leading-tight text-foreground">
              Keep your library organized and accessible.
            </h2>
            <p className="max-w-md text-muted-foreground">
              Track books, update records, and stay in control with a clean workflow.
            </p>
          </div>

          <div className="space-y-3 text-sm text-muted-foreground">
            <p>Fast search and filtering</p>
            <p>Secure account-based access</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center p-6 sm:p-10 lg:p-12">
        <div className="w-full max-w-md space-y-6">
          <div className="lg:hidden flex items-center gap-3">
            <img src={APP_LOGO} alt="Book Vault logo" className="h-12 w-12 object-cover" />
            <div>
              <h1 className="text-lg font-semibold text-foreground">Book Vault</h1>
              <p className="text-xs text-muted-foreground">Manage your books seamlessly</p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-foreground">Welcome back</h2>
            <p className="mt-1 text-sm text-muted-foreground">Sign in to continue</p>
          </div>

          <Card className="border-border/70 shadow-sm">
            <CardContent className="space-y-5 p-6">
              {formError && (
                <Alert variant="destructive">
                  <AlertDescription>{formError}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      className="pl-10"
                      placeholder="user@gmail.com"
                      {...register('email', { required: 'Email is required' })}
                    />
                  </div>
                  {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      className="pl-10"
                      placeholder="••••••••"
                      {...register('password', { required: 'Password is required' })}
                    />
                  </div>
                  {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Login'}
                </Button>
              </form>

              <Separator />

              <p className="text-center text-sm text-muted-foreground">
                Don&apos;t have an account?{' '}
                <Link to="/register" className="underline font-medium text-primary hover:underline">
                  Register
                </Link>
              </p>
            </CardContent>
          </Card>

          <p className="text-center text-xs italic text-muted-foreground">
            Use email - user@gmail.com and password - 123456 for a test account. Else feel free to register!
          </p>
        </div>
      </div>
    </div>
  )
}
