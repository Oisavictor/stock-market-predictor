import * as multer from 'multer'
const storage = multer.diskStorage({
    destination : (req, file,cb: any) =>  {
         cb (null, './storage/') 
    },
    filename : (req: any, file: any, cb: any) => {
         cb (null, file.originalname)
    }
    
})
export const upload = multer({storage, 
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
          cb(null, true);
        } else {
          cb(null, false);
          return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
      }
})