import { Request, response, Response, Router } from "express";
import userMiddleware from '../middlewares/user'
import authMiddleware from '../middlewares/auth'
import Sub from "../entities/Sub";
import Post from "../entities/Post";
import Comment from "../entities/Comment";
import { DataSource, EntityManager } from "typeorm";
import { AppDataSource } from "../data-source";
import Vote from "../entities/Vote";

const getPosts = async(req: Request, res:Response) => {
    const currentPage: number = (req.query.page || 0) as number;
    const perPage: number = (req.query.count ||  8) as number;
    const subName: any = req.query.subName;
    const order: any = req.query.order;

    try {
        const posts = await Post.find({
          where: { subName },
          order: { createdAt: "DESC" },
          relations: ["sub", "votes", "comments"],
          skip: currentPage * perPage,
          take: perPage,
        });

        // 일단은 인기순으로 통합
        if (
          order === "popularity" ||
          order === "recommendation" ||
          order === "top"
        )
          posts.sort((a, b) => b.voteScore - a.voteScore);

        if(res.locals.user) {
            posts.forEach(p=>p.setUserVote(res.locals.user))
        }

        return res.json(posts);
    } catch (error) {
        console.log(error);
        return res.status(500).json({error:"문제가 발생했습니다."})
    }
}

const getPost = async (req:Request, res: Response) => {
    const { identifier, slug } = req.params;
    try {
        const post = await Post.findOneOrFail({
            where: {identifier, slug},
            relations: ["sub", "votes"]
        })

        if (res.locals.user) {
            post.setUserVote(res.locals.user)
        }

        return res.send(post)
    } catch (error) {
        console.log(error);
        return res.status(404).json({error:'게시물을 찾을 수 없습니다.'})
        
    }
}

const createPost = async (req: Request, res: Response) => {
    const {title, body, sub} = req.body;
    if(title.trim() === "") {
        return res.status(400).json({title:"제목은 비워둘 수 없습니다."})
    }

    const user = res.locals.user;
    try {
        const subRecord = await Sub.findOneByOrFail({name: sub});
        const post = new Post();
        post.title = title;
        post.body = body;
        post.user = user;
        post.sub = subRecord;

        await post.save();
        
        return res.json(post);
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "문제가 발생했습니다."})
    }
};

const getPostComment = async(req:Request, res:Response) => {
    const {identifier, slug} = req.params;
    try {
        const post = await Post.findOneByOrFail({identifier, slug})
        const comments = await Comment.find({
            where: {postId:post.id},
            order: {createdAt:"DESC"},
            relations: ["votes"]
        })
        if (res.locals.user) {
            comments.forEach((c) => c.setUserVote(res.locals.user))
        }
        return res.json(comments);
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "문제가 발생했습니다."})
        
    }
}

const createPostComment = async (req:Request, res: Response) => {
    const {identifier, slug} = req.params;
    const body = req.body.body;
    try {
        const post = await Post.findOneByOrFail({identifier, slug});
        const comment = new Comment();
        comment.body = body;
        comment.user = res.locals.user;
        comment.post = post;

        if (res.locals.user) {
            post.setUserVote(res.locals.user)
        }

        await comment.save()
        return res.json(comment);
    } catch (error) {
        console.log(error);
        return res.status(404).json({error: "게시물을 찾을 수 없습니다."})
        
    }
};


const deletePost = async (req: Request, res: Response) : Promise<any> => {
  const { identifier, slug, commentIdentifier, value } = req.body;

  const queryRunner = await AppDataSource.createQueryRunner();

  await queryRunner.connect();

  await queryRunner.startTransaction(); // 3

  const post = await queryRunner.manager.findOneOrFail(Post, {
    where: { identifier, slug },
  });

  try {
    await queryRunner.manager.delete(Vote, {
      post: post,
    });

    await queryRunner.manager.delete(Comment, {
      post: post,
    });

    await queryRunner.manager.delete(Post, { identifier: identifier, slug: slug });

    await queryRunner.commitTransaction();

    return res.json("삭제완료");

  } catch (error) {
    await queryRunner.rollbackTransaction();
    console.log(error);
    return res
      .status(404)
      .json({ error: "삭제 과정에서 문제가 발생하였습니다." });
  } finally {
        await queryRunner.release();
    }
};

const router = Router();
router.get("/:identifier/:slug", userMiddleware, getPost)
router.post("/", userMiddleware, authMiddleware, createPost);
router.get("/", userMiddleware, getPosts)

router.get("/:identifier/:slug/comments", userMiddleware, getPostComment)
router.post("/:identifier/:slug/comments",  userMiddleware, createPostComment)

router.delete("/", deletePost);
export default router