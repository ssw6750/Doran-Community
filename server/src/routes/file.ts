import { Router,Request, Response} from "express";
import File from "../entities/File";
import userMiddleware from '../middlewares/user'
import authMiddleware from '../middlewares/auth'
import uploadMiddleware from '../middlewares/upload'
import {uploadFile} from "../controllers/fileController";

const getFile = async (req:Request, res:Response) => {
    console.log('getFile >>> ', req.params.filename)
    const filename = req.params.filename

    try {
        // 데이터베이스에서 파일 정보를 조회
        const file = await File.findOneByOrFail({ name: filename });

        if (!file) {
            return res.status(404).json({ error: "파일을 찾을 수 없습니다." });
        }

        res.setHeader("Content-Type", file.type);
        res.send(file.file);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "파일을 조회하는 중 오류가 발생했습니다." });
    }
}

const router = Router();
router.post("/upload", userMiddleware, authMiddleware, uploadMiddleware.single("file"), uploadFile);
router.get("/:filename", getFile);
export default router;
