type User = {
  id: number;
  email: string;
  username: string;
  createdAt: string;
  updatedAt: string;
};

type UserResponse = {
  success: boolean;
  message: string;
  data: User[];
  error: string | null;
};

type ContributeForm = {
  id: number;
  userID: number;
  type: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

type ContributeResponse = {
  success: boolean;
  message: string;
  data: ContributeForm[];
  error: string | null;
};

export type { User, UserResponse, ContributeResponse, ContributeForm };
