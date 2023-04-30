import { db } from "../utils/db.server";

type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  DateOfBirth: Date;
  role: string;
};

export const listUsers = async (): Promise<User[]> => {
  return db.user.findMany({
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      password: true,
      DateOfBirth: true,
      role: true,
    },
  });
};

export const getUser = async (id: number): Promise<User | null> => {
  return db.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      password: true,
      DateOfBirth: true,
      role: true,
    },
  });
};

export const createUser = async (user: Omit<User, "id">): Promise<User> => {
  const { firstName, lastName, email, password, DateOfBirth } = user;
  return db.user.create({
    data: {
      firstName,
      lastName,
      email,
      password,
      DateOfBirth,
      role,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      password: true,
      DateOfBirth: true,
      role: true,
    },
  });
};
