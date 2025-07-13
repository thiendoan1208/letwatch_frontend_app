"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SignIn } from "@/types/auth_type";
import { Eye, EyeClosed } from "lucide-react";
import Link from "next/link";
import { ChangeEvent, useState } from "react";

function SignInForm() {
  const [isCheck, setIsCheck] = useState<boolean>(false);
  const [form, setForm] = useState<SignIn>({
    email_username: "",
    password: "",
  });

  const handleCheckEye = () => {
    if (isCheck) {
      setIsCheck(false);
    } else {
      setIsCheck(true);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitForm = () => {
    console.log(form);
  };

  return (
    <Card className="w-full max-w-sm shadow-2xl shadow-black">
      <CardHeader>
        <CardTitle>Đăng nhập vào tài khoản</CardTitle>
        <CardDescription>Nhập email hoặc username để đăng nhập</CardDescription>
        <CardAction>
          <Link
            href="/sign-up"
            className="text-sm font-semibold hover:underline"
          >
            Đăng Ký
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email/Username</Label>
              <Input
                autoComplete="true"
                id="email"
                type="email"
                name="email_username"
                placeholder="m@example.com"
                value={form.email_username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid gap-2 relative">
              <div className="flex items-center">
                <Label htmlFor="password">Mật khẩu</Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input
                autoComplete="true"
                id="password"
                name="password"
                type={isCheck ? "text" : "password"}
                required
                value={form.password}
                onChange={handleChange}
              />
              {isCheck ? (
                <Eye
                  onClick={handleCheckEye}
                  className="absolute cursor-pointer right-1 top-[50%] translate-y-[5%]"
                />
              ) : (
                <EyeClosed
                  onClick={handleCheckEye}
                  className="absolute cursor-pointer right-1 top-[50%] translate-y-[5%]"
                />
              )}
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button
          onClick={submitForm}
          type="submit"
          className="w-full bg-yellow-500"
        >
          <span className="text-white">Đăng Nhập</span>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default SignInForm;
