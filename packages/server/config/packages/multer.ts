import path from 'path';
import { v1 as uuidv1 } from 'uuid';
import multer from "multer";

export default {
    storage: multer.diskStorage(
        {
            destination: 'public/media',
            filename: function ( req, file, cb ) {
                cb( null, uuidv1() + path.extname(file.originalname));
            }
        }
    ),
    limits: {
        fieldNameSize: 255,
        fileSize: 1024 * 1024 * 2,
    },
};
