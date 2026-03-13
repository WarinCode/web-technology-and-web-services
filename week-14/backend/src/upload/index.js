import multer, { diskStorage } from "multer";

const storage = diskStorage({
    destination: (req, res, cb) => {
        cb(null, "img_mem");
    },
    filename: (req, file, cb) => {
        const filename = `${req.body.memEmail}.jpg`;
        cb(null, filename);
    },
});

const upload = multer({
    storage: storage,
}).single("file");

export default upload;