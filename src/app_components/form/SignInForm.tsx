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
import { UserContext } from "@/context/user";
import {
  handleCheckRecoverCode,
  handleSendVerfyCode,
  handleSignIn,
} from "@/services/authen";
import { SignIn, SignUp } from "@/types/auth_type";
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
import { Eye, EyeClosed } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, useContext, useState } from "react";
import { toast } from "sonner";

function SignInForm() {
  // routes manage
  const router = useRouter();

  // useContext
  const { login } = useContext(UserContext);

  // useState
  const [isCheck, setIsCheck] = useState<boolean>(false);
  const [form, setForm] = useState<SignIn>({
    email_username: "",
    password: "",
  });
  const [recoverInfo, setRecoverInfo] = useState<SignUp>({
    email: "",
    username: "",
    password: "",
    re_password: "",
    verifyCode: "",
  });
  const [verifyCode, setVerifyCode] = useState<string>("");

  // SignIn mutate
  const { mutate: signInMutate } = useMutation({
    mutationFn: handleSignIn,
    onSuccess: (data) => {
      if (data && data.success) {
        toast.success(data.message);
        router.push("/watch/trang-chu");
        login(data.data);
      } else {
        toast.error(data.message);
      }
    },
    onError: (data) => {
      toast.error(data.message);
    },
  });

  // Send code when forget passsword
  const { mutate: sendCodeMutate } = useMutation({
    mutationFn: handleSendVerfyCode,
    onSuccess: () => {
      toast.success("Đã gửi mã!");
    },
    onError: () => {
      toast.error("Email không tồn tại hoặc có lỗi xảy ra, không thể gửi mã!");
    },
  });

  // Check recover code
  const { mutate: recoverMutate } = useMutation({
    mutationFn: handleCheckRecoverCode,
    onSuccess: (data) => {
      if (data && data.success) {
        toast.success(data.message);
        router.push(`/recover?email=${data.data.email}`);
      } else {
        toast.error(data.message);
      }
    },
    onError: (data) => {
      toast.error(data.message);
    },
  });

  // text <-> password toggle
  const handleCheckEye = () => {
    if (isCheck) {
      setIsCheck(false);
    } else {
      setIsCheck(true);
    }
  };

  // Input field change manage
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Input email to verify manage
  const handleVerifyInfoChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRecoverInfo({ ...recoverInfo, [e.target.name]: e.target.value });
  };

  // Sign ins
  const submitForm = () => {
    signInMutate(form);
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
                type="text"
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
                <Dialog>
                  <div className="ml-auto">
                    <DialogTrigger asChild>
                      <p className=" cursor-pointer ml-auto inline-block text-sm underline-offset-4 hover:underline">
                        Quên mật khẩu?
                      </p>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Xác Minh Danh Tính</DialogTitle>
                        <DialogDescription>
                          Vui lòng nhập email mà bạn đã dùng để đăng ký trước
                          đây.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="flex items-center justify-center">
                        <Input
                          type="email"
                          name="email"
                          value={recoverInfo.email}
                          onChange={handleVerifyInfoChange}
                          placeholder="ex: abc@gmail.com"
                        />
                      </div>
                      <DialogFooter>
                        <Button asChild>
                          <Button
                            className="bg-white text-black border-2 hover:bg-white cursor-pointer"
                            variant="outline"
                          >
                            Quay lại
                          </Button>
                        </Button>

                        {/* Input OTP Dialog for recover code */}
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              onClick={() => {
                                sendCodeMutate(recoverInfo);
                              }}
                              className="bg-yellow-500 cursor-pointer"
                            >
                              Xác nhận
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>Mã Khôi Phục</DialogTitle>
                              <DialogDescription>
                                {`Chúng tôi đã gửi mã xác minh đến ${recoverInfo.email}. Vui lòng kiểm tra hòm thư của bạn.`}
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
                                  onClick={() => {
                                    sendCodeMutate(recoverInfo);
                                  }}
                                  className="bg-white text-black border-2 hover:bg-white cursor-pointer"
                                  variant="outline"
                                >
                                  Gửi lại mã
                                </Button>
                              </Button>
                              <Button
                                onClick={() => {
                                  recoverMutate({
                                    ...recoverInfo,
                                    verifyCode: verifyCode,
                                  });
                                }}
                                className="bg-yellow-500 cursor-pointer"
                              >
                                Xác nhận
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </DialogFooter>
                    </DialogContent>
                  </div>
                </Dialog>
              </div>
              <Input
                autoComplete="true"
                id="password"
                name="password"
                type={isCheck ? "text" : "password"}
                required
                value={form.password}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    signInMutate(form);
                  }
                }}
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
