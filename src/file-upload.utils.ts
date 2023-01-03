export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(new Error('Only image files are allowed!'), false);
  }
  callback(null, true);
};

export const editFileName = (req, file, cb) => {
  const fileName = file.originalname.split('.')[0];
  const fileExt = file.originalname.split('.')[1];
  cb(null, `${fileName}-${Date.now()}.${fileExt}`);
};

