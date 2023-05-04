import { db } from "../src/utils/db.server";
import { faker } from "@faker-js/faker";

type department = {
  name: string;
  description: string;
};

type User = {
  fullName: string;
  username: string;
  role: string;
  password: string;
  firstName: string;
  lastName: string;
  DateOfBirth: Date;
  OrganizationRecord;
};

export async function createUsers(): Promise<User> {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const email = faker.internet.email();
  const password = faker.internet.password();
  const DateOfBirth = faker.date.past();

  return {
    fullName: `${firstName} ${lastName}`,
    lastName,
    password,
    DateOfBirth,
  };
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
