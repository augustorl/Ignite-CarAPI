import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import UsersTokensRepositoryInMemory from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import MailProviderInMemory from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";

import SendForgotPasswordMailUseCase from "./SendForgotPasswordMailUseCase";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let userTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let mailProvider: MailProviderInMemory;

describe("Send Forgot password Mail", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    mailProvider = new MailProviderInMemory();
    userTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();

    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      userTokensRepositoryInMemory,
      dateProvider,
      mailProvider
    );
  });
  it("should be able to send a forgot password e-mail to user", async () => {
    const sendMail = spyOn(mailProvider, "sendMail");

    await usersRepositoryInMemory.create({
      driver_license: "353867",
      email: "nu@fip.jo",
      name: "Olivia Matthews",
      password: "1234",
    });

    await sendForgotPasswordMailUseCase.execute("nu@fip.jo");

    expect(sendMail).toHaveBeenCalled();
  });

  it("should not be able to send a forgot password e-mail if user does not exists", async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute("lifu@wad.ss")
    ).rejects.toEqual(new AppError("User does not exists!"));
  });

  it("should be able to create a user token", async () => {
    const generateTokenMail = spyOn(userTokensRepositoryInMemory, "create");

    usersRepositoryInMemory.create({
      driver_license: "740018",
      email: "powno@jad.ir",
      name: "Melvin Hernandez",
      password: "1234",
    });

    await sendForgotPasswordMailUseCase.execute("powno@jad.ir");

    expect(generateTokenMail).toBeCalled();
  });
});
