"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const faker_1 = require("@faker-js/faker");
const prisma = new client_1.PrismaClient();
const seed = () => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.user.deleteMany();
    const User = [];
    for (let i = 0; i < 20; i++) {
        User.push(prisma.user.create({
            data: {
                name: faker_1.faker.name.fullName(),
                email: faker_1.faker.internet.email(),
            },
        }));
    }
    const users = yield Promise.all(User);
    console.log(users);
});
seed()
    .catch((err) => {
    console.log(err);
    process.exit(1);
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}));
