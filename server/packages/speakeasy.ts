import * as speakeasy from "@levminer/speakeasy"

let secret = speakeasy.generateSecret({ length: 6 })
let token = speakeasy.totp({
	secret: secret.base32,
	encoding: "base32",
})
const expires = speakeasy.totp.verify({
        secret: secret.base32,
        encoding: "base32",
        token: token,
        step: 30,
    })
console.log(token)
console.log(expires)