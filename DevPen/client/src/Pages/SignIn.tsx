import { loginUser } from "@/actions/user.actions"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { changeAuth } from "@/redux/slices/themeSlice"
import { useCallback, useRef, useState } from "react"
import toast from "react-hot-toast"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

export default function SignIn() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = useCallback(async () => {
    try {
      setLoading(true);
      const email = emailRef.current?.value;
      const password = passwordRef.current?.value;
      if (email && password) {
        const response = await loginUser(email, password);
        if (response.status === 200) {
          toast.success("Login Successful");
          dispatch(changeAuth(true));
          navigate('/compiler');
        } else {
          toast.error(response.data.message);
        }
      } else {
        toast.error("Invalid Input");
      }
    } catch (error) {
      toast.error("Login failed");
    } finally {
      setLoading(false);
    }
  }, [emailRef, passwordRef])
  return (
    <div className="flex w-screen h-[calc(100dvh-60px)] justify-center items-center">
      <Card className="w-full max-w-sm relative bottom-8">
        <CardHeader className="w-full flex flex-col items-center mt-2">
          <CardTitle className="text-center">Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  ref={emailRef}
                  type="email"
                  placeholder="johndoe@example.com"
                  required
                  className="focus-visible:border focus-visible:ring-0"
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input id="password" type="password" required className="focus-visible:border focus-visible:ring-0" ref={passwordRef} />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full" onClick={handleClick} disabled={loading}>
            Login
          </Button>
          <div className="flex justify-center items-center gap-1">
            <div className="text-muted-foreground text-sm">
              Don't have an account ?
            </div>
            <Link to={'/signup'} className="flex">
              <Button variant="link" className="p-0">Sign Up</Button>
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
