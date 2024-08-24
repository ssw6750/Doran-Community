import {NextFunction, Request, Response} from "express";
import fs from "fs";
import path from "path";
import File from "../entities/File";
import { makeId } from "../utils/helpers";

export const uploadFile = async (req: Request, res: Response, next: NextFunction) => {
    console.log('uploadFile >>> ', req.body.type)
    try {
        const file = req.file;

        if (!file) {
            return res.status(400).json({ error: "파일이 업로드되지 않았습니다." });
        }

        const name = makeId(10);
        const filePath = `public/images/${name}${path.extname(file.originalname)}`;

        // 파일 저장 경로 생성
        fs.writeFileSync(filePath, file.buffer);

        // 데이터베이스에 파일 정보 저장
        const fileEntity = new File();
        fileEntity.name = name;
        fileEntity.file = file.buffer; // 파일 데이터를 bytea 필드에 저장
        fileEntity.type = file.mimetype;
        await fileEntity.save();

        file.buffer = Buffer.alloc(0); // 빈 Buffer를 할당하여 데이터 제거
        fs.unlinkSync(filePath); // 디스크에서 파일 삭제

        // 만약 next를 사용하지 않으면, 직접 응답을 반환
        if (req.body.type === 'image' || req.body.type === 'banner') {
            req.body.savedFileName = name;
            next()
        }

        return res.status(200).json({ message: "파일이 성공적으로 업로드되었습니다.", name: name });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "파일 업로드 중 오류가 발생했습니다." });
    }
};