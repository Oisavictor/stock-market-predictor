import  pino from 'pino'
import pretty from 'pino-pretty'
//Still working on this
const stream = pretty({
  colorize: true,
})
export const logger = pino({ level: 'info' }, stream)
