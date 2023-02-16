import * as express from 'express'
import {AnyZodObject} from 'zod'

export  const validateResource = (schema: AnyZodObject) => (req, res, next) => {
     try {
        schema.parse({
            body: req.body,
            query: req.query,
            params: req.params
        })
        next()
     } catch(error: any) {
        return res.status(400).json({ok: false, msg: error.message})
     }
}