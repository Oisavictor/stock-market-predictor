const user_interface_1 = require('../Interface/user.interface');
('use strict');
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.createUser = void 0;
const createUser = (payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_interface_1.UserPrisma.user.create({
      data: payload,
    });
    if (!user) throw { ok: false, msg: 'Not created' };
    return user;
  });
exports.createUser = createUser;