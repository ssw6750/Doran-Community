import axios from 'axios'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import useSWR from 'swr'
import { useAuthState } from '../context/auth'
import styles from '../styles/Home.module.css'
import { Post, Sub } from '../types'
import useSWRInfinite from 'swr/infinite'
import PostCard from '../components/PostCard'
import { useEffect, useState } from 'react'

import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

const Home: NextPage = () => {
  const banners = ['/cat.jpg', '/tree-2249363_1920.jpg', '/cat02.jpg', '/bug01.jpg']  // 배너 테스트용 -> 나중에 데이터로 받아옴

  const { authenticated } = useAuthState();
  const fetcher = async (url: string) => {
    return await axios.get(url).then(res => res.data)
  }
  const address = "/subs/sub/topSubs"

  const getKey = (pageIndex: number, previousPageData: Post[]) => {
    if (previousPageData && !previousPageData.length) return null;
    return `/posts?page=${pageIndex}`
  }

  const { data, error, size: page, setSize: setPage, isValidating, mutate } = useSWRInfinite<Post[]>(getKey);
  const isInitalLoading = !data && !error;
  const posts: Post[] = data ? ([] as Post[]).concat(...data) : [];
  const { data: topSubs } = useSWR<Sub[]>(address, fetcher);

  const [observedPost, setObservedPost] = useState("");
  const [slideNumber, setSlideNumber] = useState(0)


  type slideType = {
    [key: number]: string;
  };

  const gridColumns: slideType = {
    0: "flex justify-content w-[400%] -ml-[0%] transition-all ",
    1: "flex justify-content w-[400%] -ml-[100%] transition-all ",
    2: "flex justify-content w-[400%] -ml-[200%] transition-all ",
    3: "flex justify-content w-[400%] -ml-[300%] transition-all ",
  };

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

  const handleArrowBack = () => {
    if (slideNumber !== 0) {
      setSlideNumber(slideNumber - 1)
    } else setSlideNumber(banners.length - 1)
  }

  const handleArrowForward = () => {
    if (slideNumber !== (banners.length - 1)) {
      setSlideNumber(slideNumber + 1)
    } else setSlideNumber(0)

  }

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



  return (
    <div className="max-w-5xl px-4 pt-5 mx-auto">
      <div className='hidden md:block'>
        <div className='justify-content flex mb-4'>
          {
            banners?.map(banner => (
              <div className='h-36  bg-gray-500 flex-auto first:ml-0 mx-1 last:mr-0 rounded relative'
                style={{
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0) 60%, rgba(0, 0, 0, 0.9)), url(${banner})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
                key={banner}><div className='absolute text-white bottom-0 left-0 right-0 m-2'>
                  <div className='truncate'>배너 테스트 타이틀</div>
                  <div className='truncate w-inherit text-xs'>배너 테스트 내용입니닷!어쩌구 저쩌구 이!어쩌구 저쩌구 이!어쩌구 저쩌구 이!어쩌구 저쩌구 이러쩌구 저쩌구 이!어쩌구 저쩌구 이러쿵</div>
                </div></div>
            )
            )
          }
        </div>
      </div>


      {/* md 사이즈 이하일때 배너(캐러셀형식으로 만들기)  */}
      <div className='overflow-hidden w-inherit relative border mb-3 md:hidden hover:cursor-pointer'>
        <div className={gridColumns[slideNumber]}>
          <div className='absolute z-10 top-[50%] translate-y-[-50%] left-2 bg-gray-500 opacity-50 rounded-full text-white'
            onClick={handleArrowBack}><IoIosArrowBack className='text-4xl' /></div>
          <div className='absolute z-10 top-[50%] translate-y-[-50%] right-2 bg-gray-500 opacity-50 rounded-full text-white'
            onClick={handleArrowForward}><IoIosArrowForward className='text-4xl' /></div>
          {
            banners?.map(banner => (
              <div className='h-36 bg-gray-500 rounded relative flex-none w-[25%]'
                style={{
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0) 60%, rgba(0, 0, 0, 0.9)), url(${banner})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
                key={banner}><div className='absolute text-white bottom-0 left-0 right-0 m-2'>
                  <div className='truncate'>배너 테스트 타이틀</div>
                  <div className='truncate w-inherit text-xs'>배너 테스트 내용입니닷!어쩌구 저쩌구 이!어쩌구 저쩌구 이!어쩌구 저쩌구 이!어쩌구 저쩌구 이러쩌구 저쩌구 이!어쩌구 저쩌구 이러쿵</div>
                </div>
              </div>
            )
            )
          }
        </div>
      </div>



      <div className="flex">
        {/* 포스트리스트 */}
        <div className='w-full md:mr-3 md:w-8/12'>
          {isInitalLoading && <p className='text-lg text-center'>로딩중입니다...</p>}
          {posts?.map(post => (
            <PostCard
              key={post.identifier}
              post={post}
              mutate={mutate}
            />
          ))}
        </div>

        {/* 사이드바 */}
        <div className='hidden w-4/12 ml-3 md:block'>
          <div className='bg-white border rounded mb-6'>
            <div className='p-4 border-b rounded-t'
              style={{
                backgroundImage: `url('/8753.jpg')`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <p className='text-lg font-medium text-center text-white font-serif'>Community Ranking</p>
            </div>

            {/* 커뮤니티 리스트 */}
            <div>
              {topSubs?.map((sub) => (
                <div
                  key={sub.name}
                  className='flex items-center px-4 py-2 text-xs border-b'
                >
                  <Link href={`/r/${sub.name}`}>
                    <a>
                      <Image
                        src={sub.imageUrl}
                        className='rounded-full cursor-pointer'
                        alt="Sub"
                        width={24}
                        height={24}
                      />
                    </a>
                  </Link>
                  <Link href={`/r/${sub.name}`}>
                    <a className='ml-2 font-bold hover:cursor-pointer'>
                      /r/{sub.name}
                    </a>
                  </Link>
                  <p className='ml-auto font-md'>{sub.postCount}</p>
                </div>
              ))}
            </div>

            {authenticated &&
              <div className='w-full py-4 text-center'>
                <Link href="/subs/list">
                  <a className='w-full px-3 py-1 text-center text-white bg-fuchsia-800 rounded text-sm'>
                    전체 커뮤니티
                  </a>
                </Link>
              </div>
            }
          </div>

          <div className='bg-white border rounded'>
            <div className='p-2 border-b rounded-t'
              style={{
                // backgroundImage: `linear-gradient(rgba(135, 80, 156, 0.9), rgba(135, 80, 156, 0.9)), url(/tree-2249363_1920.jpg)`,
                backgroundImage: `url('/8753.jpg')`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <p className='text-lg font-medium text-center text-white font-serif'>Menu</p>
            </div>

            <div className='w-full pt-2 pb-2 text-center border-b border-gray-300 px-2'>
              <a className='text-sm text-gray-700'>
                Reddit 커뮤니티 사이트를 모방한 사이드 프로젝트
              </a>
            </div>
            {authenticated &&
              <div>
                <div className='w-full pt-4 pb-2 text-center'>
                  <Link href="/subs/create">
                    <a className='w-full px-16 py-1 text-center text-white bg-fuchsia-800 rounded-full text-sm'>
                      커뮤니티 생성
                    </a>
                  </Link>
                </div>
                <div className='w-full pt-2 pb-4 text-center'>
                  <Link href="/posts/create">
                    <a className='w-full px-16 py-1 text-center text-fuchsia-800 border border-fuchsia-800 rounded-full text-sm'>
                      포스트 생성
                    </a>
                  </Link>
                </div>
              </div>
            }
            <div>

            </div>
          </div>
        </div>
      </div>



    </div>
  )
}

export default Home
