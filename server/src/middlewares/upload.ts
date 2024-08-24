import multer, { FileFilterCallback } from "multer";

const storage = multer.memoryStorage(); // 메모리에 파일 저장

const upload = multer({
    storage,
    fileFilter: (_, file: any, callback: FileFilterCallback) => {
        console.log('fileFilter');
        if (
            file.mimetype === "image/jpeg" ||
            file.mimetype === "image/png" ||
            file.mimetype === "image/webp"
        ) {
            callback(null, true);
        } else {
            callback(new Error("이미지가 아닙니다."));
        }
    }
});

export default upload;