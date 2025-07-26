"use client";

import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Textarea } from "@/components/ui/textarea";
import { ChangeEvent, useContext, useState } from "react";
import { UserContext } from "@/context/user";
import { ContributeFormType } from "@/types/review_type";
import { useMutation } from "@tanstack/react-query";
import { handleSendContributeForm } from "@/services/contribute";
import { toast } from "sonner";

function ContributeFrom() {
  // useContext
  const { user } = useContext(UserContext);

  // useState
  const [form, setForm] = useState<ContributeFormType>({
    userID: user.id,
    type: "",
    description: "",
    status: "In Progress",
  });

  // Send form mutate
  const { mutate: contributeFormSendMutate } = useMutation({
    mutationFn: handleSendContributeForm,
    onSuccess: (data) => {
      if (data && data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    },
    onError: (data) => {
      toast.error(data.message);
    },
  });

  // Validate function
  const validate = () => {
    for (const [key, value] of Object.entries(form)) {
      if (key && !value) {
        if (key === "userID") {
          break;
        } else {
          toast.error(`Vui lòng không bỏ trống bất kì trường nào.`);
          return false;
        }
      }
    }

    return true;
  };
  return (
    <Dialog>
      <DialogTrigger className="w-full text-start cursor-pointer">
        Góp ý
      </DialogTrigger>
      <DialogContent className="z-[9999] max-h-[70%] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Đóng góp ý kiến.</DialogTitle>
          <DialogDescription>
            Việc này sẽ giúp chúng tôi nâng cao trải nghiệm người dùng cũng như
            phát triển thêm các tính năng nhằm mang lại trải nghiệm xem phim tốt
            nhất.
          </DialogDescription>
        </DialogHeader>
        <div>
          <CardContent className="px-0">
            <form>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label>Chủ để đóng góp</Label>
                  <Select
                    onValueChange={(value) => {
                      setForm({ ...form, type: value });
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Lựa chọn" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="error">Báo cáo lỗi</SelectItem>
                      <SelectItem value="film_request">Yêu cầu phim</SelectItem>
                      <SelectItem value="ex_optimize">
                        Tối ưu hóa trải nghiệm
                      </SelectItem>
                      <SelectItem value="func_need">Thêm tính năng</SelectItem>
                      <SelectItem value="others">Khác</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="username">Mô tả</Label>
                  <Textarea
                    value={form.description}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                      setForm({ ...form, description: e.target.value });
                    }}
                    placeholder="Mô tả..."
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="mt-4 px-0">
            <Button
              onClick={() => {
                const isValidate = validate();
                if (isValidate) {
                  contributeFormSendMutate(form);
                }
              }}
              className="bg-[var(--bg-color)] cursor-pointer w-full"
            >
              Xác nhận
            </Button>
          </CardFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ContributeFrom;
