import { createUser } from "@/actions/user.actions"
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

export default function SignUp() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = useCallback(async () => {
    try {
      setLoading(true);
      const username = usernameRef.current?.value;
      const email = emailRef.current?.value;
      const password = passwordRef.current?.value;
      if (username && email && password) {
        const response = await createUser(username, email, password);
        if(response.status === 201){
          toast.success("Account created");
          dispatch(changeAuth(true));
          navigate('/compiler');
        }else{
          toast.error(response.data.message) ;
        }
      } else {
        toast.error("Invalid Input");
      }
    } catch (error) {
      toast.error("Account creation failed");
    }finally {
      setLoading(false);
    }
  }, [usernameRef, emailRef, passwordRef])
  return (
    <div className="flex w-screen h-[calc(100dvh-60px)] justify-center items-center">
      <Card className="w-full max-w-sm relative bottom-8">
        <CardHeader className="w-full flex flex-col items-center">
          <CardTitle className="text-center">Create new account</CardTitle>
          <CardDescription>
            Enter your credentials below to create a new account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Username</Label>
                <Input
                  id="username"
                  ref={usernameRef}
                  type="text"
                  placeholder="JohnDoe"
                  required
                  className="focus-visible:border focus-visible:ring-0"
                />
              </div>
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
            Create Account
          </Button>
          <div className="flex justify-center items-center gap-1">
            <div className="text-muted-foreground text-sm">
              Already have an account ?
            </div>
            <Link to={'/signin'} className="flex">
              <Button variant="link" className="p-0">Sign In</Button>
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
