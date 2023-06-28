import React from 'react'
import PostCard from '../PostCard';
import useSWR from 'swr'
import { Post, Sub } from '../../types'
import useSWRInfinite from 'swr/infinite'
import axios from 'axios'
import { useEffect, useState, MouseEvent } from 'react'
import { useAuthState } from '../../context/auth';


function Posts({ subName }: { subName?: any }) {

  const getKey = (pageIndex: number, previousPageData: Post[]) => {
    if (previousPageData && !previousPageData.length) return null;
    return subName ? `/posts/?page=${pageIndex}&subName=${subName}` : `/posts/?page=${pageIndex}`
  }

  const { data, error, size: page, setSize: setPage, isValidating, mutate } = useSWRInfinite<Post[]>(getKey);
  const isInitalLoading = !data && !error;
  const posts: Post[] = data ? ([] as Post[]).concat(...data) : [];
  const [observedPost, setObservedPost] = useState("");

  useEffect(() => {
    // 포스트가 없다면 return
    if (!posts || posts.length === 0) return;
    // posts 배열안에 마지막 post에 id를 가져옵니다.
    const id = posts[posts.length - 1].identifier;
    if (id !== observedPost) {
      setObservedPost(id);
      observeElement(document.getElementById(id));
    }
  }, [posts])

  const observeElement = (element: HTMLElement | null) => {
    if (!element) return;
    // 브라우저 뷰포트와 설정한 요소를의 교차점을 관찰
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting === true) {
          console.log("마지막 포스트에 왔습니다.");
          setPage(page + 1);
          observer.unobserve(element)
        }
      },
      { threshold: 1 }
    );
    // 대상 요소의 관찰을 시작
    observer.observe(element);
  }

  const deletePost = async (event: MouseEvent<HTMLDivElement>, identifier: string, slug: string) => {
    event.preventDefault();
    try {
      await axios.delete("/posts", { data: { identifier, slug } })
      mutate()
    } catch (error) {
      console.log(error);
    }
  } 

  return (
    <div>
      {isInitalLoading && <p className='text-lg text-center'>로딩중입니다...</p>}
      {posts?.map((post: any) => (
        <PostCard
          key={post.identifier}
          post={post}
          mutate={mutate}
          deletePost={deletePost}
        />
      ))}
    </div>
  )
}

export default Posts