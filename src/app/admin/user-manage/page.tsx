"use client";

import {
  handleDeleteUser,
  handleFindUser,
  handleGetAllUser,
} from "@/services/admin";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChangeEvent, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Trash } from "lucide-react";
import { cloneDeep } from "lodash";
import { toast } from "sonner";
import { User } from "@/types/admin_type";
import ReactPaginate from "react-paginate";

const PAGE_LIMIT = 10;
function UserManagePage() {
  const tableBodyRef = useRef<HTMLTableSectionElement>(null);
  const [userList, setUserList] = useState<User[]>();
  const [deleteItems, setDeleteItems] = useState<string[]>([]);
  const [isManageActive, SetIsManageActive] = useState<boolean>(false);
  const [findUserKeyWord, setFindUserKeyWord] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [isShowPaginate, setisShowPaginate] = useState(true);

  const { data: userResponse, refetch: isUserRefetch } = useQuery({
    queryKey: ["get-all-user", page],
    queryFn: async () => {
      const data = await handleGetAllUser(PAGE_LIMIT, page);
      setUserList(data.data.userList);
      return data;
    },
  });

  const handleDeleteUserArr = (userEmail: string) => {
    const checkUserExist = deleteItems.some((user) => user === userEmail);

    if (checkUserExist) {
      const filmDeleteArr = cloneDeep(deleteItems);
      const existfilmIndex = filmDeleteArr.indexOf(userEmail);
      if (existfilmIndex !== 0) {
        filmDeleteArr.splice(existfilmIndex, existfilmIndex);
        setDeleteItems(filmDeleteArr);
      } else {
        filmDeleteArr.shift();
        setDeleteItems(filmDeleteArr);
      }
    } else {
      setDeleteItems([...deleteItems, userEmail]);
    }
  };

  const isClickTrash = (
    userEmail: string,
    tableRowIndex: number,
    trashIndex: number
  ) => {
    const checkUserExist = deleteItems.some((user) => user === userEmail);

    if (!checkUserExist) {
      tableBodyRef.current?.children[tableRowIndex].children[
        trashIndex
      ].classList.add("text-red-500");
    } else {
      tableBodyRef.current?.children[tableRowIndex].children[
        trashIndex
      ].classList.remove("text-red-500");
    }
  };

  const { mutate: deleteUserMutate } = useMutation({
    mutationFn: handleDeleteUser,
    onSuccess: (data) => {
      if (data && data.success) {
        toast.success(data.message);
        setDeleteItems([]);
        isUserRefetch();
      } else {
        toast.error(data.message);
      }
    },
    onError: (data) => {
      setDeleteItems([]);
      toast.error(data.message);
    },
  });

  const handleFindUserInput = (e: ChangeEvent<HTMLInputElement>) => {
    setFindUserKeyWord(e.target.value);
  };

  const enterToFind = (e: { key: string }) => {
    if (e.key === "Enter") {
      findUserMutate(findUserKeyWord);
    }
  };

  const { mutate: findUserMutate } = useMutation({
    mutationFn: handleFindUser,
    onSuccess: (data) => {
      setUserList(data.data);
      if (data.data.length <= 0 || findUserKeyWord.length <= 0) {
        setisShowPaginate(true);
        isUserRefetch();
      } else {
        setisShowPaginate(false);
      }
      setPage(1);
    },
  });

  const handlePagination = async (e: { selected: number }) => {
    setPage(e.selected + 1);
    try {
      const data = await handleGetAllUser(PAGE_LIMIT, page);
      setUserList(data.data.userList);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="col-span-11 xl:col-span-10 mx-5 pr-2 max-h-screen overflow-y-auto">
      <div className="mt-5 mb-10">
        <h1 className="text-xl font-semibold">User Manage</h1>
        <div className="flex items-center justify-between mt-5">
          <Input
            type="text"
            value={findUserKeyWord}
            onKeyDown={enterToFind}
            onChange={handleFindUserInput}
            placeholder="Find user with email."
            className="w-[20%]"
          />
          <div>
            <Button
              onClick={() => {
                SetIsManageActive(true);
              }}
              className={isManageActive ? "hidden" : "block bg-yellow-500"}
            >
              Manage
            </Button>

            <div className={isManageActive ? "flex" : "hidden"}>
              <Button
                variant="secondary"
                className="cursor-pointer"
                onClick={() => {
                  SetIsManageActive(false);
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  deleteUserMutate(deleteItems);
                  SetIsManageActive(false);
                }}
                className="bg-green-500 cursor-pointer"
              >
                Confirm
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-5">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>No.</TableHead>
                <TableHead>UserID</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Username</TableHead>
                <TableHead>Created Time</TableHead>
                <TableHead>Updated Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody ref={tableBodyRef}>
              {userList &&
                userList !== null &&
                userList.length > 0 &&
                userList.map((user, index) => (
                  <TableRow key={`user-${index}`}>
                    <TableCell>
                      {Math.floor(index + 1 + PAGE_LIMIT * (page - 1))}
                    </TableCell>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.createdAt}</TableCell>
                    <TableCell>{user.updatedAt}</TableCell>
                    {isManageActive && (
                      <TableCell>
                        <Trash
                          onClick={() => {
                            isClickTrash(user.email, index, 6);
                            handleDeleteUserArr(user.email);
                          }}
                          className="size-4 cursor-pointer"
                        />
                      </TableCell>
                    )}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>

        <div className={`mt-5 ${isShowPaginate ? "block" : "hidden"}`}>
          {" "}
          <ReactPaginate
            forcePage={page - 1}
            className=" max-w-screen overflow-hidden flex-wrap px-4 flex items-center justify-center gap-4 md:gap-7  cursor-pointer select-none"
            pageClassName="px-2"
            activeClassName="px-2 text-yellow-400 border-2 rounded bg-white font-semibold"
            previousClassName="text-2xl"
            nextClassName="text-2xl"
            breakLabel="..."
            previousLabel={<ChevronLeft />}
            nextLabel={<ChevronRight />}
            onPageChange={handlePagination}
            pageRangeDisplayed={1}
            pageCount={
              userResponse && userResponse.data
                ? userResponse.data.totalPage
                : 1
            }
            renderOnZeroPageCount={null}
          />
        </div>
      </div>
    </div>
  );
}

export default UserManagePage;
