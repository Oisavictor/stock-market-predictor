import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient({  log: [
    { level: 'warn', emit: 'event' },
    { level: 'info', emit: 'event' },
    { level: 'error', emit: 'event' },
  ],
  errorFormat: 'pretty',
  rejectOnNotFound: {
    findFirst: {
      User: (err) => new Error('User error'),
      Profile: (err) => new Error('profile error!'),
    },
    findUnique: {
      User: (err) => new Error('User error'),
      Profile: (err) => new Error('profile error!'),
    },
  },

 
})