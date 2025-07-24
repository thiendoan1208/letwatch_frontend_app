"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import {
  handleGetAllContributeForm,
  handleGetAllUser,
  handleUpdateContributeForm,
} from "@/services/admin";
import { getNewFilmList } from "@/services/film";
import { useMutation, useQueries } from "@tanstack/react-query";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { cloneDeep } from "lodash";
import { cn } from "@/lib/utils";

const PAGE_LIMIT = "10";
const NEW_FILM_PAGE_LIMIT = "24";

function AdminPage() {
  // useState
  const [isFormManage, setIsFormManage] = useState<boolean>(false);
  const [formStatus, setFormStatus] = useState<
    {
      id: number;
      status: string;
    }[]
  >([
    {
      id: 0,
      status: "In Progress",
    },
  ]);

  // Fetch users, contribute form, film list with useQuery
  const results = useQueries({
    queries: [
      {
        queryKey: ["get-all-user"],
        queryFn: async () => {
          return await handleGetAllUser(Number(PAGE_LIMIT), 1);
        },
      },
      {
        queryKey: ["new-film-list", 1],
        queryFn: async () => {
          return await getNewFilmList(1, PAGE_LIMIT);
        },
      },
      {
        queryKey: ["get-all-contribute-form"],
        queryFn: async () => {
          const data = await handleGetAllContributeForm();
          const getStatus: {
            id: number;
            status: string;
          }[] = [];
          data.data.map((item) => {
            getStatus.push({ id: item.id, status: item.status });
          });
          setFormStatus(getStatus);
          return data;
        },
      },
    ],
  });

  // useQueries result
  const [allUser, allFilms, allContributeForm] = results;

  // Change status manage
  const handleStatusChange = (formID: number, value: string) => {
    const cloneFormStatus = cloneDeep(formStatus);
    const findStatusForm = cloneFormStatus.find(
      (item) => item.id === formID
    ) as { id: number; status: string };
    findStatusForm!.status = value;

    const cutStatusFormIndex = cloneFormStatus.findIndex(
      (item) => item.id === formID
    );
    if (cutStatusFormIndex !== 0) {
      cloneFormStatus.splice(cutStatusFormIndex, cutStatusFormIndex);
      setFormStatus([...cloneFormStatus, findStatusForm]);
    } else {
      cloneFormStatus.shift();
      setFormStatus([...cloneFormStatus, findStatusForm]);
    }
  };

  // Update contribute form status
  const { mutate: updateContributeFormMutate } = useMutation({
    mutationFn: handleUpdateContributeForm,
    onSuccess: () => {
      allContributeForm.refetch();
    },
  });

  return (
    <div className=" col-span-11 xl:col-span-10 ml-5 pr-2 max-h-screen overflow-y-auto">
      {/* Information Card */}
      <div className="grid grid-cols-9 gap-2 mt-5">
        {/* User Card */}
        <Card className=" col-span-9 xl:col-span-3">
          <CardHeader className="-mb-5">
            <CardTitle>Total User</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <span className="text-xl font-semibold">
                {allUser &&
                  allUser.data &&
                  allUser.data.success === true &&
                  allUser.data.data !== null &&
                  allUser.data.data.totalUser}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Film card */}
        <Card className=" col-span-9  xl:col-span-3">
          <CardHeader className="-mb-5">
            <CardTitle>Film Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <div>
                Total film:{" "}
                <span>
                  {allFilms.data &&
                    allFilms.data.success &&
                    allFilms.data.data.items !== null &&
                    allFilms.data.data.pagination.totalItems}
                </span>
              </div>
              <div>
                Total item per page: <span>{NEW_FILM_PAGE_LIMIT}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contribute Card*/}
        <Card className=" col-span-9  xl:col-span-3">
          <CardHeader className="-mb-5">
            <CardTitle>Contribute Information </CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <div>
                Total form submit:{" "}
                <span>
                  {allContributeForm &&
                    allContributeForm.data?.data !== null &&
                    allContributeForm.data?.data.length}
                </span>
                <h1 className="font-semibold">Status:</h1>
                <ul className="flex gap-4">
                  <li>
                    In Progress:{" "}
                    <span className=" font-semibold text-yellow-500">
                      {
                        formStatus.filter(
                          (item) => item.status === "In Progress"
                        ).length
                      }
                    </span>
                  </li>
                  <li>
                    Done:{" "}
                    <span className=" font-semibold text-green-500">
                      {
                        formStatus.filter((item) => item.status === "Done")
                          .length
                      }
                    </span>
                  </li>
                  <li>
                    Reject:{" "}
                    <span className=" font-semibold text-red-500">
                      {" "}
                      {
                        formStatus.filter((item) => item.status === "Reject")
                          .length
                      }
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Information Table */}
      <div className="mt-2 mb-10">
        {/* Film Info table */}
        <div className="my-2">
          <h1 className="text-xl font-semibold">
            New Film List Information Table
          </h1>
          <div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">TMDB ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Year</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Episode Current</TableHead>
                  <TableHead>Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allFilms.data &&
                  allFilms.data.success &&
                  allFilms.data.data.items !== null &&
                  allFilms.data.data.items.map((item, index) => (
                    <TableRow key={`newfilm-${index}`}>
                      <TableCell>
                        {item.tmdb.id !== null ? item.tmdb.id : "N/A"}
                      </TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.year}</TableCell>
                      <TableCell>{item.status}</TableCell>
                      <TableCell>{item.episode_current}</TableCell>
                      <TableCell>{item.modified.time}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </div>
        <Separator className="bg-red-500" />
        {/* Contribute Info table */}
        <div className="mt-4 mb-2">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold">
              <span className="text-yellow-500">In Progress</span> Contribute
              Information Table
            </h1>
            <div>
              <Button
                onClick={() => {
                  setIsFormManage(true);
                }}
                className={
                  isFormManage ? "hidden" : "bg-yellow-500 cursor-pointer mr-5"
                }
              >
                Manage
              </Button>

              <div className={isFormManage ? "flex" : "hidden"}>
                <Button
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() => {
                    setIsFormManage(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-green-500 cursor-pointer"
                  onClick={() => {
                    setIsFormManage(false);
                    updateContributeFormMutate(formStatus);
                  }}
                >
                  Confirm
                </Button>
              </div>
            </div>
          </div>
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
                {allContributeForm.data &&
                  allContributeForm.data.success &&
                  allContributeForm.data.data !== null &&
                  allContributeForm.data.data
                    .filter((item) => item.status === "In Progress")
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
                          <div
                            className={`${isFormManage ? "block" : "hidden"}`}
                          >
                            <Select
                              onValueChange={(value) => {
                                handleStatusChange(form.id, value);
                              }}
                              defaultValue={form.status}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="In Progress">
                                  In Progress
                                </SelectItem>
                                <SelectItem value="Done">Done</SelectItem>
                                <SelectItem value="Reject">Reject</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <span
                            className={`${isFormManage ? "hidden" : "block"}`}
                          >
                            <span
                              className={cn(
                                "text-black font-semibold",
                                form.status === "In Progress" &&
                                  "text-yellow-500",
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
                                  className={`${
                                    isFormManage ? "block" : "hidden"
                                  } bg-yellow-500 cursor-pointer`}
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

export default AdminPage;
