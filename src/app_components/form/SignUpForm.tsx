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
import { SignUp } from "@/types/auth_type";
import { Eye, EyeClosed } from "lucide-react";
import Link from "next/link";
import { ChangeEvent, useState } from "react";
import { toast } from "sonner";

function SignUpForm() {
  const [isCheck, setIsCheck] = useState<boolean>(false);
  const [form, setForm] = useState<SignUp>({
    email: "",
    username: "",
    password: "",
    re_password: "",
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

  const validateForm = () => {
    for (const [key, value] of Object.entries(form)) {
      if (key && !value) {
        toast.error(`Trường ${key} chưa có dữ liệu`);
        return false;
      }
    }

    const regexEmail = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
    if (!regexEmail.test(form.email)) {
      toast.error("Email không đúng định dạng");
      return false;
    }

    if (form.username.length < 8) {
      toast.error("Username phải lớn hơn 8 kí tự");
      return false;
    }

    if (form.password.length < 8) {
      toast.error("Mật khẩu phải lớn hơn 8 kí tự");
      return false;
    }

    if (form.password !== form.re_password) {
      toast.error("Mật khẩu không khớp");
      return false;
    }

    return true;
  };

  const submitForm = () => {
    const isValidate = validateForm();
    if (isValidate) {
      console.log(form);
    }
  };

  return (
    <Card className="w-full max-w-sm shadow-2xl shadow-black">
      <CardHeader>
        <CardTitle>Đăng ký tài khoản</CardTitle>
        <CardDescription>Tạo tài khoản mới</CardDescription>
        <CardAction>
          <Link
            href="/sign-in"
            className="text-sm font-semibold hover:underline"
          >
            Đăng Nhập
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="m@example.com"
                required
                autoComplete="true"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                name="username"
                onChange={handleChange}
                placeholder="megumi12345"
                required
                autoComplete="true"
              />
            </div>
            <div className="grid gap-2 relative">
              <div className="flex items-center">
                <Label htmlFor="password">Mật khẩu</Label>
              </div>
              <Input
                id="password"
                type={isCheck ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                autoComplete="true"
              />
              {isCheck ? (
                <Eye
                  onClick={handleCheckEye}
                  className="absolute cursor-pointer right-1 top-[50%] -translate-y-[5%]"
                />
              ) : (
                <EyeClosed
                  onClick={handleCheckEye}
                  className="absolute cursor-pointer right-1 top-[50%] -translate-y-[5%]"
                />
              )}
            </div>
            <div className="grid gap-2 relative">
              <div className="flex items-center">
                <Label htmlFor="password">Nhập lại mật khẩu</Label>
              </div>
              <Input
                id="re_password"
                type={isCheck ? "text" : "password"}
                name="re_password"
                value={form.re_password}
                onChange={handleChange}
                required
                autoComplete="true"
              />
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
          <span className="text-white">Đăng Ký</span>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default SignUpForm;
