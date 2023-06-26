import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router'
import React, { FormEvent, useState } from 'react'
import useSWR, { mutate } from 'swr';
import { Comment, Post } from '../../../../types';
import dayjs from 'dayjs'
import { useAuthState } from '../../../../context/auth';
import classNames from 'classnames';
import {FaArrowUp, FaArrowDown} from "react-icons/fa"
import SideBar from '../../../../components/SideBar';
import Posts from '../../../../components/Posts/Posts';
import Image from 'next/image';
import Category from '../../../../components/Category';

const PostPage = () => {
    const router = useRouter();
    const { identifier, sub:subName, slug} = router.query;
    const {authenticated, user} = useAuthState();
    const [newComment, setNewComment] = useState("")
    const {data: post, error, mutate: postMutate} = useSWR<Post>(
        identifier && slug? `/posts/${identifier}/${slug}`: null);
    const {data: comments, mutate: commentMutate} = useSWR<Comment[]>(
      identifier && slug ? `/posts/${identifier}/${slug}/comments`:null
    )
  const { data: sub, error: subError, mutate } = useSWR(subName ? `/subs/${subName}` : null);

    console.log('comment', comments);
    
    const handleSubmit = async (e: FormEvent) => {
      e.preventDefault();
      if(newComment.trim() === "") {
        return
      }

      try {
        await axios.post(`/posts/${post?.identifier}/${post?.slug}/comments`, {
          body: newComment
        });
        // 캐시 갱신
        commentMutate();
        setNewComment("");
      } catch (error) {
        console.log(error)
      }
    }

    const vote = async (value: number, comment?:Comment) => {
      if(!authenticated) router.push("/login")

      if(
        (!comment && value === post?.userVote) ||
        (comment && comment.userVote === value)
      ) {
        value = 0
      }

      try {
        await axios.post("/votes",{
          identifier,
          slug,
          commentIdentifier: comment?.identifier,
          value
        })
        postMutate(); // 캐시 갱신
        commentMutate();
      } catch (error) {
        console.log(error);
        
      }
    }
  let renderPosts;

  if (!sub) {
    renderPosts = <p className='text-lg text-center'>로딩중...</p>
  } else if (sub.posts.length === 0) {
    renderPosts = <p className='text-lg text-center'>아직 작성된 포스트가 없습니다.</p>
  } else {
    // renderPosts = sub.posts.map((post:Post)=> (
    //     <PostCard key={post.identifier} post={post} subMutate={mutate}/>
    // ))
    renderPosts = <Posts subName={subName} />
  }

  if (sub)
  return (
    <div>
    <div>
      <input type="file" hidden={true} />
      {/* 배너 이미지 */}
      <div className='bg-gray-400'>
        {sub.bannerUrl ? (
          <div
            className='h-80'
            style={{
              backgroundImage: `url(${sub.bannerUrl})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
          </div>
        ) : (
          <div className='h-20 bg-gray-400'></div>
        )}
      </div>

      {/* 커뮤니티 메타 데이터 */}
      <div className='h-20 bg-basic-white'>
        <div className='relative flex max-w-5xl px-5 mx-auto'>
          <div className='absolute' style={{ top: -15 }}>
            {sub.imageUrl && (
              <Image
                src={sub.imageUrl}
                alt="커뮤니티 이미지"
                width={70}
                height={70}
                className="rounded-full"
              />
            )}
          </div>
          <div className='pt-1 pl-24'>
            <div className='flex items-center'>
              <h1 className='text-4xl font-ptBlack text-basic-black-second'>{sub.title}</h1>
            </div>
            <p className='font-bold text-basic-black text-small'>
              /r/{sub.name}
            </p>
          </div>
        </div>
      </div>
    </div>

     <div className='flex max-w-5xl px-4 pt-5 mx-auto'>
       <div className='w-full md:mr-3 md:w-8/12'>
       <div className='bg-white rounded'>
           {post && (
            <>
              <div className='flex'>
                {/* 좋아요 싫어요 기능 부분 */}
                <div className='flex-shrink-0 w-10 py-2 text-center rounded-l'>
                  {/* 좋아요 */}
                  <div
                    className='flex justify-center w-6 mx-auto text-gray-400 rounded cursor-pointer hover:bg-gray-300 hover:text-red-500'
                    onClick={()=>vote(1)}
                  >
                    {post.userVote === 1 ?
                      <FaArrowUp className='text-red-500'/>
                      : <FaArrowUp/>}
                  </div>
                  <p className='text-xs font-bold'>{post.voteScore}</p>
                  {/* 싫어요 */}
                  <div
                    className='flex justify-center w-6 mx-auto text-gray-400 rounded cursor-pointer hover:bg-gray-300 hover:text-blue-500'
                    onClick={()=>vote(-1)}
                  >
                    {post.userVote === -1 ?
                      <FaArrowDown className='text-blue-500'/>
                      : <FaArrowDown/>}
                  </div>
                </div>

                <div className='py-2 pr-2 '>
                    <div className='flex items-center '>
                      <p className='text-xs text-gray-400'>
                      Posted by
                      <Link href={`/u/${post.username}`}>
                          <a className='mx-1 hover::underline text-basic-black-second'>
                          /u/{post.username}
                        </a>
                      </Link>
                      <Link href={`/u/${post.url}`}>
                        <a className='mx-1 hover::underline'>
                          {dayjs(post.createdAt).format("YYYY-MM-DD HH:mm")}
                        </a>
                      </Link>
                    </p>
                  </div>
                  <h1 className='my-1 text-xl font-ptBlack'>{post.title}</h1>
                  <p className='my-3 text-base'>{post.body}</p>
                  <div className='flex'>
                    <button>
                      <i className='mr-1 fas fa-comment-alt fa-xs'></i>
                        <span className='font-bold text-sm'>
                        {post.commentCount} Comments
                      </span>
                    </button>
                  </div>
                </div>
              </div>
              <div>
                {/* 댓글 작성 구간 */}
                <div className='pr-6 b-4 pl-9'>
                  {authenticated ?
                  (<div>
                    <p className='mb-1 text-xs'>
                      <Link href={`/u/${user?.username}`}>
                        <a className='font-semibold text-blue-500'>
                          {user?.username}
                        </a>
                      </Link>
                      {" "}으로 댓글 작성  
                    </p>
                    <form onSubmit={handleSubmit}>
                      <textarea 
                        className='w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-gray-600 text-sm'
                        onChange={e=> setNewComment(e.target.value)}
                        value={newComment}
                      >
                      </textarea>
                      <div className='flex justify-end'>
                        <button 
                          className='px-3 py-1 text-white bg-basic-red rounded text-sm mb-2'
                          disabled={newComment.trim() ===""}>
                          댓글작성
                        </button>
                      </div>
                    </form>
                  </div>)
                  :
                  (<div className='flex items-center justify-between px-2 py-4 border border-gray-200 rounded'>
                    <p className='fond-semibold text-gray-400'>
                      댓글 작성을 위해서 로그인 해주세요.
                    </p>
                    <div>
                      <Link href={'/login'}>
                        <a className='px-3 py-1 text-white bg-gray-400 gounded'>
                          로그인
                        </a>
                      </Link>
                    </div>
                  </div>)
                  }
                </div>
                {/* 댓글 리스트 부분 */}
                {comments?.map(comment => (
                  <div className='flex' key={comment.identifier}>
                    {/* 좋아요 싫어요 기능 부분 */}
                    <div className='flex-shrink-0 w-10 py-2 text-center rounded-l'>
                      {/* 좋아요 */}
                      <div
                        className='flex justify-center w-6 mx-auto text-gray-400 rounded cursor-pointer hover:bg-gray-300 hover:text-red-500'
                        onClick={()=>vote(1,comment)}
                      >
                        {comment.userVote === 1 ?
                      <FaArrowUp className='text-red-500'/>
                      : <FaArrowUp/>}
                      </div>
                      <p className='text-xs font-bold'>{comment.voteScore}</p>
                      {/* 싫어요 */}
                      <div
                        className='flex justify-center w-6 mx-auto text-gray-400 rounded cursor-pointer hover:bg-gray-300 hover:text-blue-500'
                        onClick={()=>vote(-1, comment)}
                      >
                        {comment.userVote === -1 ?
                      <FaArrowDown className='text-blue-500'/>
                      : <FaArrowDown/>}
                      </div>
                    </div>
                    <div className='py-1 pr-4'>
                      <p className='mb-1 text-xs leading-none'>
                        <Link href={`/u/${comment.username}`}>
                          <a className='mr-1 font-bold hover:underline'>
                            {comment.username}
                          </a>
                        </Link>
                        <span className='text-gray-600'>
                          {`
                            ${comment.voteScore}
                            posts
                            ${dayjs(comment.createdAt).format("YYYY_MM_DD HH:mm")}
                          `}
                        </span>
                      </p>
                      <p>{comment.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
        <div className='w-full md:mr-3 mt-2'>{renderPosts}</div>
      </div>
        <div className='hidden w-4/12 ml-3 md:block'>
      <SideBar sub={sub}></SideBar>
      <div className='mt-4'>
        <Category></Category>
          </div>
        </div>
    </div>
    </div >
  )
}

export default PostPage