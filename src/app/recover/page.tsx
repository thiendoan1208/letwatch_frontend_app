"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { handleUpdatePassword } from "@/services/authen";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { useProgress } from "@bprogress/next";

function RecoverPage() {
  // Mange URL information and routes
  const userEmail = useSearchParams().get("email");
  const router = useRouter();

  const { start } = useProgress();

  // useState
  const [newPassword, setNewPassword] = useState<string>("");

  // Validate function
  const validate = () => {
    const regexCheckSpace = /^(?!.*\s).+$/;

    if (newPassword.length < 8 || newPassword.length > 15) {
      toast.error("Mật khẩu phải lớn hơn 8 và nhỏ hơn 15 kí tự");
      return false;
    }

    if (!regexCheckSpace.test(newPassword)) {
      toast.error(`Trường mật khẩu không được chứa khoảng trắng.`);
      return false;
    }

    return true;
  };

  // Update password mutate
  const { mutate: updatePasswordMutate } = useMutation({
    mutationFn: handleUpdatePassword,
    onSuccess: (data) => {
      if (data && data.success) {
        toast.success(data.message);
        start();
        router.push("/sign-in");
      } else {
        toast.error(data.message);
      }
    },
    onError: (data) => {
      toast.error(data.message);
    },
  });

  return (
    <div className="min-h-screen w-screen flex flex-col items-center justify-start md:justify-center">
      <div className="mt-30 md:mt-0">
        <Image
          className="w-[200px]"
          src="/logo_name.png"
          alt="logo-name"
          width={100}
          height={100}
          priority
        />
      </div>

      <div className="w-full flex justify-center px-4">
        <Card className="w-full max-w-sm shadow-2xl shadow-black">
          <CardHeader>
            <CardTitle>Cập nhật mật khẩu mới</CardTitle>
            <CardDescription>
              Xác minh thành công, vui lòng cập nhật mật khẩu mới của bạn.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="new_password">Mật khẩu mới</Label>
                  <Input
                    autoComplete="true"
                    id="new_password"
                    type="text"
                    name="new_password"
                    placeholder="abc1234"
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        const validatepassword = validate();
                        if (validatepassword) {
                          updatePasswordMutate({
                            email: userEmail,
                            password: newPassword,
                          });
                        }
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button
              onClick={() => {
                const validatepassword = validate();
                if (validatepassword) {
                  updatePasswordMutate({
                    email: userEmail,
                    password: newPassword,
                  });
                }
              }}
              className="w-full bg-yellow-500"
            >
              <span className="text-white">Xác nhận</span>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default RecoverPage;
