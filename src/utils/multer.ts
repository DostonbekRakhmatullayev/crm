import path from 'path';
import multer from 'multer';
import { Request } from 'express';
const storage = multer.diskStorage({
  destination: function (req: Request, file, cb) {
    cb(null, path.resolve('uploads'));
  },
  filename: function (req: Request, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);

    cb(
      null,
      uniqueSuffix +
        `.${
          file.originalname.split('.')[file.originalname.split('.').length - 1]
        }`,
    );
  },
});

const upload = multer({ storage: storage });
export default upload;
