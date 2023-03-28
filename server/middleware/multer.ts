import * as multer from 'multer'
import * as express from 'express'
const mime_type  = ["image/jpeg", "image/jpg", "image/png", "image/gif"]
const storage = multer.diskStorage({
    destination : (req, file,cb: any) =>  {
         cb (null, '../upload/')
    },
    filename : (req: any, file: any, cb: any) => {
         cb (null, file.originalname)
    }
    
})
const  fileFilter= (req, file, cb) => {
   if(file.mimetype.includes(mime_type)) {
       cb(null, true)
   }
   cb(new Error("Invaild file uploaded, it should be a type of 'jpeg, jpg, png or gif'"))
}
export const upload = multer({storage, fileFilter})