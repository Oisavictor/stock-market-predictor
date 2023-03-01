import { object, string } from "zod";

export const createUserSchema = object({
  body: object({
    name: string({
      required_error: "Name is required",
    }),

    email: string({
      required_error: "Email is required",
    }).email("Not a valid email"),
    
    password: string({
      required_error: "password is required",
    }).min(8, "Password too short - should be atleast 8 character minimum"),
    
    passwordConfirmation: string({
      required_error: "passwordConfirmation is required",
    }),

  }).refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
  }),

});

export const verifyUserOTPSchema = object({
  body: object({
    email: string({
      required_error: "Email is required",
    }).email("Not a valid email"),
    
    confirmationCode: string({
      required_error: "Please enter a valid code",
    }),

  }),

});

export const LoginSchema = object({
  body: object({
    email: string({
      required_error: "Email is required",
    }).email("Not a valid email"),
    
    password: string({
      required_error: "Password is required",
    }),

  }),

});

export const forgotPasswordSchema = object({
  body: object({
    email: string({
      required_error: "Email is required",
    }).email("Not a valid email"),
  }),
  
});
