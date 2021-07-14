import Mongoose from "mongoose"
import { GridFsStorage } from "multer-gridfs-storage";
import keys from "../config/keys";

var instance = null;
var imageStorage = null;
var imageBucket = null;
const ImageMimeTypeRegex = /^[Ii][Mm][Aa][Gg][Ee]\/\w{1,}$/;

export const getDatabase = async () => {
  if (instance === null) {
    instance = await Mongoose.connect(keys.mongoURI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
  }

  return instance;
}

export const getImageStorage = async () => {
  const db = await getDatabase();

  if (imageStorage === null) {
    imageStorage = GridFsStorage({
      db: db.connection.db,
      client: db.connection.getClient(),
      //url: keys.mongoURI,
      cache: true,
      file: (req, file) => {
        return new Promise((resolve, reject) => {  
          // if you are using a separate collection to store data 
          // there is no need to save this information on the metadata
          // because you'll probably never use it
            console.log({mimetype: file.mimetype, test: ImageMimeTypeRegex.test(file.mimetype)});
          if (ImageMimeTypeRegex.test(file.mimetype))
          {
            console.log('Hello');
            const filename = file.originalname;//req.body.fileName + path.extname(file.originalname);
            console.log(filename);
            const fileInfo = {
              filename: filename,
              bucketName: 'images'
            }
            console.log({fileInfo});
            resolve(fileInfo);
          }
          // console.log({file});
          reject(new Error(`Unsupported image format: ${file.mimeType}`));
        })
      }
    })
  }

  return imageStorage;
}

export const ImageStorageMiddleware = (req, res, next) => {
  getImageStorage().then((imageStorage) => {
    req.imageStorage = imageStorage;
    next();
  });
}

export const getImageBucket = async () => {
  if (imageBucket === null) {
    const db = await getDatabase();
    imageBucket = Mongoose.mongo.GridFSBucket(db.connection.db, {
      bucketName: 'images'
   })
  }

  return imageBucket;
}