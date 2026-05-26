import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Card, CardContent } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Button } from '../components/ui/button'
import { Separator } from '../components/ui/separator'
import { Alert, AlertDescription } from '../components/ui/alert'
import { Loader2, Mail, Lock, User } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { toast } from 'sonner'

interface RegisterFormValues {
  name: string
  email: string
  password: string
}

const APP_LOGO = '/book.png'

export default function Register() {
  const { register: registerUser } = useAuth()
  const navigate = useNavigate()
  const [formError, setFormError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>()

  const onSubmit = async (values: RegisterFormValues) => {
    setFormError('')
    try {
      await registerUser(values)
      toast.success('Registration successful')
      navigate('/', { replace: true })
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Registration failed'
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
              Build your personal library workspace.
            </h2>
            <p className="max-w-md text-muted-foreground">
              Create your account and start organizing books with a clean, focused experience.
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
            <div className="h-11 w-11 rounded-xl overflow-hidden ring-1 ring-primary/20 bg-background">
              <img src={APP_LOGO} alt="Book Vault logo" className="h-full w-full object-cover" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">Book Vault</h1>
              <p className="text-xs text-muted-foreground">Manage your books seamlessly</p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-foreground">Create your account</h2>
            <p className="mt-1 text-sm text-muted-foreground">Start managing your books today</p>
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
                  <Label htmlFor="name">Name</Label>
                  <div className="relative">
                    <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="name"
                      className="pl-10"
                      placeholder="John Doe"
                      {...register('name', { required: 'Name is required' })}
                    />
                  </div>
                  {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      className="pl-10"
                      placeholder="you@example.com"
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
                      {...register('password', {
                        required: 'Password is required',
                        minLength: { value: 6, message: 'Password must be at least 6 characters' },
                      })}
                    />
                  </div>
                  {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Register'}
                </Button>
              </form>

              <Separator />

              <p className="text-center text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link to="/login" className="font-medium text-primary hover:underline">
                  Login
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
