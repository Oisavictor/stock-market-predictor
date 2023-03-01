export class registerDTO {
    name: string;
    email: string;
    password: string;
    passwordConfirmation: string;
}

export class loginDTO {
    email: string;
    password: string
}

export class verifyUserDTO {
    confirmationCode: number;
    email: string;
}
export class passwordForgottenDTO {
    email: string;
    NewPassword: string;
    passwordConfirmation: string
}