import React, { useState, useEffect } from 'react'
import {Post} from '../types'
import {FaArrowUp, FaArrowDown} from "react-icons/fa"
import Link from 'next/link'
import Image from 'next/image'
import dayjs from 'dayjs'
import { useAuthState } from '../context/auth'
import Router, { useRouter } from 'next/router'
import axios from 'axios'
import { useEditor, EditorContent } from '@tiptap/react';
import extenstions from '../util/tiptap/extensions'

interface PostCardProps {
    post: Post
    subMutate?: () => void
    mutate?: () => void
    deletePost?: any
}

const PostCard = ({
    post: {
    identifier, 
    slug, 
    title, 
    body, 
    subName, 
    createdAt, 
    voteScore, 
    userVote, 
    commentCount, 
    url, 
    username, 
    sub
    },
    mutate,
    subMutate,
    deletePost
}: PostCardProps) => {
    const router = useRouter()
    const isInSubPage = router.pathname === '/r/[sub]'
    const { authenticated, user } = useAuthState()
    const [ownPost, setOwnPost] = useState(false);


    const vote = async(value:number) => {
        if(!authenticated) Router.push("/login");

        if(value === userVote) value = 0

        try {
            await axios.post("/votes", {identifier, slug, value})
            if (subMutate) subMutate();
            if (mutate) mutate();
        } catch (error) {
            console.log(error);        
        }
    }

    useEffect(() => {
        if (!user) return;
        setOwnPost(authenticated && user.username === username)

    }, [sub])

    const editor = useEditor({
        extensions: extenstions,
        content: '',
        editable: false,
    });
    
  
    useEffect(() => {
        if (body) {
            editor?.commands.setContent(body);
        }
    }, [editor, body]);


  return (
    <div
        className='flex bg-white rounded border-b border-basic-gray-third mb-0 text-basic-black-second relative'
        id = {identifier}
    >
        {/* 좋아요 싫어요 기능 부분 */}
          <div className='flex-shrink-0 w-10 py-2 text-center rounded-l bg-basic-gray-4'>
          {/* 좋아요 */}
          <div
            className='flex justify-center w-6 mx-auto text-gray-400 rounded cursor-pointer hover:bg-gray-300 hover:text-red-500'
            onClick={()=>vote(1)}
          >
            {userVote === 1 ?
              <FaArrowUp className='text-red-500'/>
              : <FaArrowUp/>}
          </div>
          <p className='text-xs font-bold'>{voteScore}</p>
          {/* 싫어요 */}
          <div
            className='flex justify-center w-6 mx-auto text-gray-400 rounded cursor-pointer hover:bg-gray-300 hover:text-blue-500'
            onClick={()=>vote(-1)}
          >
            {userVote === -1 ?
              <FaArrowDown className='text-blue-500'/>
              : <FaArrowDown/>}
          </div>
        </div>
        {/* 포스트 데이터 부분 */}
        <div className='w-full pl-2 pr-2'>
            <div className='flex items-center'>
            {!isInSubPage && (
                <div className='flex items-center z-0 overflow-h'>
                <Link href={`/r/${subName}`}>
                    <a className='w-3'>
                        {sub&&
                            <Image
                                src={sub.imageUrl}
                                alt='sub'
                                className='rounded-full cursor-pointer'
                                width={12}
                                height={12}
                            />
                        }
                    </a>
                </Link>
                <Link href={`/r/${subName}`}>
                              <a className='ml-2 text-xs font-bold cursor-pointer hover:underline text-basic-black-second whitespace-nowrap overflow-hidden text-ellipsis max-w-post-name'>
                        {subName}
                    </a>                 
                </Link>
                <span className='mx-1 text-xs text-gray-400'>·</span>
            </div>
            )}  

            <p className='text-xs text-gray-400'>
                      <span>Posted&nbsp;by</span>
                <Link href={`/u/${username}`}>
                    <a className='mx-1 hover:underline'>/u/{username}</a>
                </Link>
                <Link href={url}>
                    <a className='mx-1 hover:underline'>{dayjs(createdAt).format('YYYY-MM-DD HH:mm')}</a>
                </Link>
            </p>
            </div>
        
            <Link href={url}>
                  <a className='my-1 text-base font-ptBlack'>{title}</a>
            </Link>
            {body && <EditorContent editor={editor} />}
            <div className='flex'>
                <Link href={url}>
                    <a>
                        <i className='mr-1 fas fa-comment-alt fa-xs'></i>
                          <span className="text-xs">{commentCount}</span>
                    </a>
                </Link>
            </div>
              {ownPost && <div className='absolute right-2 bottom-1 text-sm' onClick={() => { deletePost(event, identifier, slug) }}>삭제</div>}
        </div>

        
    </div>
  )
}

export default PostCard