import multer from "multer";

const storage = multer.diskStorage({
  destination: "upload/",
});

const upload = multer({
  storage,
});

export default upload;