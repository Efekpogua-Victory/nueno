import UserEntity from "@business-logic/User";

describe("user", () => {
  it("can create a user with correct details", async () => {
    const params = {
      name: "Victory",
      email: "vic@mail.com",
      password: "password",
    };
    const entity = new UserEntity();
    const result = await entity.create(params);
    expect(result.message).toBe("User created");
  });

  it("cannot create a user with wrong email address", async () => {
    const params = {
      name: "Victory",
      email: "vicmail.com",
      password: "password",
    };
    const entity = new UserEntity();
    await expect(async () => {
      await entity.create(params);
    }).rejects.toThrowError("Invalid email");
  });

  it("cannot create a user with short password", async () => {
    const params = {
      name: "Victory",
      email: "vic@mail.com",
      password: "paa",
    };
    const entity = new UserEntity();
    await expect(async () => {
      await entity.create(params);
    }).rejects.toThrowError("Invalid input - password should be at least 7 characters long.");
  });

  it("throw error if user already found with same email address", async () => {
    const params = {
      name: "Victory",
      email: "vic@mail.com",
      password: "password",
    };

    const entity = new UserEntity();

    await expect(async () => {
      await entity.create(params);
    }).rejects.toThrowError("Email address is already registered.");
  });
});
