import { db } from "../src/utils/db.server";

type Role = {
  name: string;
  description: string;
};

type User = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  DateOfBirth: Date;
};

function getUsers(): User[] {
  return [
    {
      email: "test@gmail.com",
      password: "testPassword",
      firstName: "Test",
      lastName: "Mctest",
      DateOfBirth: new Date(1990, 1, 1),
    },
    {
      email: "user2",
      password: "user2Password",
      firstName: "User2",
      lastName: "Mcuser2",
      DateOfBirth: new Date(1990, 1, 1),
    },
    {
      email: "user3",
      password: "user3Password",
      firstName: "User3",
      lastName: "Mcuser3",
      DateOfBirth: new Date(1990, 1, 1),
    },
    {
      email: "user4",
      password: "user4Password",
      firstName: "User4",
      lastName: "Mcuser4",
      DateOfBirth: new Date(1990, 1, 1),
    },
    {
      email: "user5",
      password: "user5Password",
      firstName: "User5",
      lastName: "Mcuser5",
      DateOfBirth: new Date(1990, 1, 1),
    },
  ];
}

function getRoles(): Role[] {
  return [
    {
      name: "admin",
      description: "Has full access to the application",
    },
    {
      name: "manager",
      description:
        "Has access to manage buildings, units, tenants, payments, invoices and leases",
    },
    {
      name: "tenant",
      description: "Has access to view their own information and make payments",
    },
    {
      name: "agent",
      description:
        "Has access to schedule showings and take contact info for prospective tenants",
    },
    {
      name: "accounting",
      description: "Has access to manage invoices and payments",
    },
    {
      name: "guest",
      description: "Has access to public information only",
    },
  ];
}

async function seed() {
  await Promise.all(
    getRoles().map((role) => {
      return db.role.create({
        data: {
          name: role.name,
          description: role.description,
        },
      });
    })
  );

  const role = await db.role.findFirst({
    where: {
      name: "admin",
    },
  });

  if (!role) {
    console.error("Admin role not found in database");
    return;
  }

  await Promise.all(
    getUsers().map((user) => {
      const { email, password, firstName, lastName, DateOfBirth } = user;
      return db.user.create({
        data: {
          email,
          password,
          firstName,
          lastName,
          DateOfBirth,
          roleId: role.id,
        },
      });
    })
  );
}

seed();
