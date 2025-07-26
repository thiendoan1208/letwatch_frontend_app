"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  handleDeleteContributeForm,
  handleGetAllContributeForm,
} from "@/services/admin";
import { useState } from "react";
import { Trash } from "lucide-react";
import { cloneDeep } from "lodash";
import { toast } from "sonner";

function ContributeFormManagePage() {
  // useState
  const [formID, setFormID] = useState<number[]>([]);

  // Fetch data with useQuery

  /* Get all contribute forms */
  const { data: allContributeForm, refetch: isContributeFormRefetch } =
    useQuery({
      queryKey: ["get-all-contribute-form"],
      queryFn: async ({ signal }) => {
        return await handleGetAllContributeForm(signal);
      },
    });

  /* Manage contribute form */
  const handlePushFormID = (id: number) => {
    const checkID = formID.some((formid) => formid === id);

    if (checkID) {
      const cloneArr = cloneDeep(formID);
      const findIndex = formID.indexOf(id);
      if (findIndex === 0) {
        cloneArr.shift();
        setFormID(cloneArr);
      } else {
        cloneArr.splice(findIndex, findIndex);
        setFormID(cloneArr);
      }
    } else {
      setFormID([...formID, id]);
    }
  };

  /* Delete contribute form mutate */
  const { mutate: deleteContributeFormMutate } = useMutation({
    mutationFn: handleDeleteContributeForm,
    onSuccess: (data) => {
      if (data && data.success) {
        toast.success(data.message);
        setFormID([]);
        isContributeFormRefetch();
      } else {
        toast.error(data.message);
      }
    },
    onError: (data) => {
      setFormID([]);
      toast.error(data.message);
    },
  });

  return (
    <div className="col-span-11 xl:col-span-10 mx-5 pr-2 max-h-screen overflow-y-auto">
      <div className="mt-5 mb-10">
        <h1 className="text-lg font-semibold">Contribute Form Status</h1>

        {/* Delete manage button */}
        <div className={formID.length > 0 ? "flex justify-between" : "hidden"}>
          <div className="flex gap-2">
            Delete:{" "}
            {formID.map((item) => (
              <h1 key={item}>{item}</h1>
            ))}
          </div>
          <div>
            <Button
              variant="outline"
              className="mr-2 cursor-pointer"
              onClick={() => {
                setFormID([]);
              }}
            >
              Cancel
            </Button>
            <Button
              className="bg-[var(--bg-color)]"
              onClick={() => {
                deleteContributeFormMutate(formID);
              }}
            >
              Confirm
            </Button>
          </div>
        </div>

        {/* Done status table */}
        <div className="mt-5">
          <h1 className="text-green-500 font-semibold">Done</h1>
          <Separator />
          <div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead>UserID</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Created Time</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allContributeForm &&
                  allContributeForm.data &&
                  allContributeForm.success &&
                  allContributeForm.data !== null &&
                  allContributeForm.data
                    .filter((item) => item.status === "Done")
                    .map((form, index) => (
                      <TableRow key={`form-${index}`}>
                        <TableCell>{form.id}</TableCell>
                        <TableCell>{form.userID}</TableCell>
                        <TableCell>{form.type}</TableCell>
                        <TableCell className="max-w-[100px] overflow-hidden text-left">
                          {form.description}
                        </TableCell>
                        <TableCell>{form.createdAt}</TableCell>
                        <TableCell>
                          <span>
                            <span
                              className={cn(
                                "text-black font-semibold",
                                form.status === "In Progress" &&
                                  "text-[var(--text-color)]",
                                form.status === "Done" && "text-green-500",
                                form.status === "Reject" && "text-red-500"
                              )}
                            >
                              {form.status}
                            </span>
                          </span>
                        </TableCell>
                        <TableCell>
                          <Dialog>
                            <form>
                              <DialogTrigger asChild>
                                <Button
                                  className={` bg-[var(--bg-color)] cursor-pointer`}
                                >
                                  Detail
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[425px] max-h-[70%] overflow-y-auto">
                                <DialogHeader>
                                  <DialogTitle>Detail</DialogTitle>
                                  <DialogDescription>
                                    See full information.
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4">
                                  <div className="grid gap-3">
                                    <Label>Type</Label>
                                    <Input
                                      className="cursor-default"
                                      name="type"
                                      defaultValue={form.type}
                                    />
                                  </div>
                                  <div className="grid gap-3">
                                    <Label>Description</Label>
                                    <Textarea
                                      name="description"
                                      defaultValue={form.description}
                                    />
                                  </div>
                                </div>
                                <DialogFooter>
                                  <DialogClose asChild>
                                    <Button variant="outline">Close</Button>
                                  </DialogClose>
                                </DialogFooter>
                              </DialogContent>
                            </form>
                          </Dialog>
                        </TableCell>
                        <TableCell>
                          <Trash
                            className="size-4 text-red-500 cursor-pointer"
                            onClick={() => {
                              handlePushFormID(form.id);
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Reject status table */}
        <div className="mt-5">
          <h1 className="text-red-500 font-semibold">Reject</h1>
          <Separator />
          <div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead>UserID</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Created Time</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allContributeForm &&
                  allContributeForm.data &&
                  allContributeForm.success &&
                  allContributeForm.data !== null &&
                  allContributeForm.data
                    .filter((item) => item.status === "Reject")
                    .map((form, index) => (
                      <TableRow key={`form-${index}`}>
                        <TableCell>{form.id}</TableCell>
                        <TableCell>{form.userID}</TableCell>
                        <TableCell>{form.type}</TableCell>
                        <TableCell className="max-w-[100px] overflow-hidden text-left">
                          {form.description}
                        </TableCell>
                        <TableCell>{form.createdAt}</TableCell>
                        <TableCell>
                          <span>
                            <span
                              className={cn(
                                "text-black font-semibold",
                                form.status === "In Progress" &&
                                  "text-[var(--text-color)]",
                                form.status === "Done" && "text-green-500",
                                form.status === "Reject" && "text-red-500"
                              )}
                            >
                              {form.status}
                            </span>
                          </span>
                        </TableCell>

                        <TableCell>
                          <Dialog>
                            <form>
                              <DialogTrigger asChild>
                                <Button
                                  className={` bg-[var(--bg-color)] cursor-pointer`}
                                >
                                  Detail
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[425px] max-h-[70%] overflow-y-auto">
                                <DialogHeader>
                                  <DialogTitle>Detail</DialogTitle>
                                  <DialogDescription>
                                    See full information.
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4">
                                  <div className="grid gap-3">
                                    <Label>Type</Label>
                                    <Input
                                      className="cursor-default"
                                      name="type"
                                      defaultValue={form.type}
                                    />
                                  </div>
                                  <div className="grid gap-3">
                                    <Label>Description</Label>
                                    <Textarea
                                      name="description"
                                      defaultValue={form.description}
                                    />
                                  </div>
                                </div>
                                <DialogFooter>
                                  <DialogClose asChild>
                                    <Button variant="outline">Close</Button>
                                  </DialogClose>
                                </DialogFooter>
                              </DialogContent>
                            </form>
                          </Dialog>
                        </TableCell>
                        <TableCell>
                          <Trash
                            className="size-4 text-red-500"
                            onClick={() => {
                              handlePushFormID(form.id);
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContributeFormManagePage;
