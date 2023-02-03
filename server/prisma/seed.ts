import { PrismaClient, User } from "@prisma/client";
import { faker } from "@faker-js/faker";
const prisma = new PrismaClient()
const seed = async () => {
   await prisma.user.deleteMany()
   const User: Array<Promise<any>> = []

   for(let i = 0; i < 20; i++) {
        User.push(
          prisma.user.create({
            data: {
              name : faker.name.fullName(),
              email : faker.internet.email()
            }
          })
        )
   }
   const users = await Promise.all(User)
   const userId = users.map((u) => u.id)
   const getRandomUserId = () => userId[Math.floor(Math.random() * userId.length)]
   const Post: Array<Promise<any>> = []
    for(let i = 0; i < 20; i++) {
      Post.push(
         prisma.post.create({
            data: {
                title : faker.lorem.sentence(),
                authorId: getRandomUserId()
            }
         })
      )
    }
    const posts = await Promise.all(Post)
    console.log(posts)
    console.log(users)
}
seed().catch(err => {
  console.log(err)
  process.exit(1)
}).finally(async () => {
 await prisma.$disconnect()
})