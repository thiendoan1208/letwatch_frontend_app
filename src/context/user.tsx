"use client";

import { User } from "@/types/auth_type";
import { createContext, ReactElement, useState } from "react";

const UserContext = createContext({
  user: { id: 0, email: "", username: "", role: 0 },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  login: (userInfo: User) => {},
});

function UserProvider({ children }: { children: ReactElement }) {
  const [user, setUser] = useState<User>({
    id: 0,
    email: "",
    username: "",
    role: 0,
  });

  const login = (userInfo: User) => {
    setUser(userInfo);
  };

  return (
    <UserContext.Provider value={{ user, login }}>
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };
