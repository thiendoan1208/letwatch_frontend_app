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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useMutation } from "@tanstack/react-query";
import { handleSendVerfyCode, handleSignUp } from "@/services/authen";
import { useRouter } from "next/navigation";

function SignUpForm() {
  const router = useRouter();
  const [isCheck, setIsCheck] = useState<boolean>(false);
  const [isDialogActive, setIsDialogActive] = useState(false);
  const [form, setForm] = useState<SignUp>({
    email: "",
    username: "",
    password: "",
    re_password: "",
    verifyCode: "",
  });
  const [verifyCode, setVerifyCode] = useState<string>("");

  const { mutate: sendCodeMutate } = useMutation({
    mutationFn: handleSendVerfyCode,
    onSuccess: () => {
      toast.success("Đã gửi mã!");
    },
    onError: () => {
      toast.error("Email không tồn tại hoặc có lỗi xảy ra, không thể gửi mã!");
    },
  });

  const { mutate: signUpMutate } = useMutation({
    mutationFn: handleSignUp,
    onSuccess: (data) => {
      if (data && data.success) {
        toast.success(data.message);
        router.push("/sign-in");
      } else {
        toast.error(data.message);
      }

      setIsDialogActive(true);
    },
    onError: (data) => {
      toast.error(data.message);
    },
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
    const regexCheckSpace = /^(?!.*\s).+$/;
    const regexEmail = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;

    for (const [key, value] of Object.entries(form)) {
      if (key && !value) {
        if (key === "verifyCode") {
          break;
        } else {
          toast.error(`Trường ${key} chưa có dữ liệu`);
          return false;
        }
      }

      if (key && value) {
        if (key === "verifyCode") {
          break;
        } else {
          if (!regexCheckSpace.test(value)) {
            toast.error(`Trường ${key} không được chứa khoảng trắng.`);
            return false;
          }
        }
      }
    }

    if (!regexEmail.test(form.email)) {
      toast.error("Email không đúng định dạng");
      return false;
    }

    if (form.username.length < 5 || form.username.length > 15) {
      toast.error("Username phải lớn hơn 5 và nhỏ hơn 15 kí tự");
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

  const sendValidateCode = () => {
    const isValidate = validateForm();

    if (isValidate) {
      sendCodeMutate(form);
      setIsDialogActive(true);
    }
  };

  const submitForm = () => {
    setIsDialogActive(true);
    const isValidate = validateForm();
    if (isValidate) {
      signUpMutate({ ...form, verifyCode: verifyCode });
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
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    sendValidateCode();
                  }
                }}
                onChange={handleChange}
                required
                autoComplete="true"
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Dialog
          open={isDialogActive}
          onOpenChange={() => {
            if (isDialogActive) {
              setIsDialogActive(false);
            }
          }}
        >
          <form className="w-full">
            <DialogTrigger asChild>
              <Button
                onClick={sendValidateCode}
                className="w-full bg-yellow-500"
              >
                Đăng Ký
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Mã Xác Minh</DialogTitle>
                <DialogDescription>
                  {`Chúng tôi đã gửi mã xác minh đến ${form.email}. Vui lòng kiểm tra hòm thư của bạn.`}
                </DialogDescription>
              </DialogHeader>
              <div className="flex items-center justify-center">
                <InputOTP
                  value={verifyCode}
                  onChange={(value) => {
                    setVerifyCode(value);
                  }}
                  maxLength={6}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
              <DialogFooter>
                <Button asChild>
                  <Button
                    onClick={sendValidateCode}
                    className="bg-white text-black border-2 hover:bg-white cursor-pointer"
                    variant="outline"
                  >
                    Gửi lại mã
                  </Button>
                </Button>
                <Button
                  onClick={submitForm}
                  className="bg-yellow-500 cursor-pointer"
                >
                  Xác nhận
                </Button>
              </DialogFooter>
            </DialogContent>
          </form>
        </Dialog>
      </CardFooter>
    </Card>
  );
}

export default SignUpForm;
