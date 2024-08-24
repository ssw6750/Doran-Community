import axios from 'axios';
import { GetServerSideProps } from 'next';
import Editor from '../../../components/Editor'
import React, {FormEvent, useState} from 'react';
import {Post} from "../../../types";
import {useRouter} from "next/router";

const PostCreate = () => {
    const router = useRouter();
    const { sub: subName } = router.query;

    const submitPost = async ({e,title, body} : {e: FormEvent<HTMLFormElement>, title:string, body:string}) => {
        e.preventDefault();
        if (title.trim() === '' || !subName) return;
        try {
            const { data: post } = await axios.post<Post>('/posts', {
                title: title.trim(),
                body,
                sub: subName,
            });

            router.push(`/r/${subName}/${post.identifier}/${post.slug}`);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='flex flex-col justify-center pt-16'>
            <div className='w-10/12 mx-auto'>
                <div className='p-4 bg-white rounded'>
                    <h1 className='mb-3 text-lg'>포스트 생성하기</h1>
                    <Editor submitPost={submitPost}></Editor>
                </div>
            </div>
        </div>
    );
};

export default PostCreate;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    try {
        const cookie = req.headers.cookie;
        if (!cookie) throw new Error('쿠키가 없습니다.');
        await axios.get(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/auth/me`, {
            headers: { cookie },
        });
        return { props: {} };
    } catch (error) {
        res.writeHead(307, { Location: '/login' }).end();
        return { props: {} };
    }
};
