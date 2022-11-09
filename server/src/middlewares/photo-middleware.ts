import { v4 as uuidv4 } from 'uuid';
import multer from 'multer';
import PhotoError from '../exeptions/photo-error';

const fileFilter = (_, file, cb) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
    cb(null, true);
  } else {
    cb(PhotoError.ErrorUpload());
  }
};

const storage = multer.diskStorage({
  destination: 'public',
  filename: (_, file, cb) => {
    console.log(file);
    const fileName = uuidv4() + '.' + file.originalname.split('.')[-1];
    cb(null, fileName);
  },
});

export const multerUploadPhoto = multer({ storage, fileFilter }).single('photo');
