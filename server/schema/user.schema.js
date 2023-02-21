"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUserOTPSchema = exports.createUserSchema = void 0;
const zod_1 = require("zod");
exports.createUserSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        name: (0, zod_1.string)({
            required_error: "Name is required",
        }),
        email: (0, zod_1.string)({
            required_error: "Email is required",
        }).email("Not a valid email"),
        password: (0, zod_1.string)({
            required_error: "password is required",
        }).min(8, "Password too short - should be atleast 8 character minimum"),
        passwordConfirmation: (0, zod_1.string)({
            required_error: "passwordConfirmation is required",
        }),
    }).refine((data) => data.password === data.passwordConfirmation, {
        message: "Passwords do not match",
        path: ["passwordConfirmation"],
    }),
});
exports.verifyUserOTPSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        email: (0, zod_1.string)({
            required_error: "Email is required",
        }).email("Not a valid email"),
        confirmationCode: (0, zod_1.string)({
            required_error: 'Please enter a valid code'
        })
    })
});
// export type createUserInput = Omit<
//   TypeOf<typeof createUserSchema>,
//   "body.passwordConfirmation"
// >;
