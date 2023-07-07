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
import { FaFire } from "react-icons/fa";
import { FaSun } from "react-icons/fa";
import { FaThumbsUp } from "react-icons/fa";
import { FaAngleDoubleUp } from "react-icons/fa";
import MainImageBanner from '../components/MainImageBanner'
import Posts from '../components/Posts/Posts'
import Category from '../components/Category'

const Home: NextPage = () => {
  const { authenticated } = useAuthState();
  const fetcher = async (url: string) => {
    return await axios.get(url).then(res => res.data)
  }
  const address = "/subs/sub/topSubs"

  const { data: topSubs } = useSWR<Sub[]>(address, fetcher);

  const [selectedOption, setSelectedOption] = useState('latest');

  const handleOptionChange = (option:string) => {
    setSelectedOption(option);
  };
  
  return (
    <div className="max-w-5xl px-4 pt-2 mx-auto">
      <MainImageBanner/>   
      <div className="flex">
        {/* 포스트리스트 */}  
        <div className='w-full md:mr-3 md:w-8/12'>

          {/* 포스트 메뉴 */}
          <div className="flex p-4 items-end w-full h-24 border border-basic-gray-third bg-white mb-2 relative gap-6 text-gray-400">
            <p className='absolute top-4 text-lg text-basic-black-second font-ptBlack'>전체</p>
            <label className={`flex justify-center items-center hover:text-basic-red text-sm ${selectedOption === 'latest' ? 'text-basic-red' : ''}`}>
              <input
                type="radio"
                value="latest"
                className="appearance-none"
                checked={selectedOption === 'latest'}
                onChange={() => handleOptionChange('latest')}
              />
              <FaSun className="text-lg" />
              <span className="ml-2">최신</span>
            </label>
            <label className={`flex justify-center items-center hover:text-basic-red text-sm ${selectedOption === 'popularity' ? 'text-basic-red' : ''}`}>
              <input
                type="radio"
                value="popularity"
                className="appearance-none"
                checked={selectedOption === 'popularity'}
                onChange={() => handleOptionChange('popularity')}
              />
              <FaFire className="text-lg" />
              <span className="ml-2">인기</span>
            </label>
            <label className={`flex justify-center items-center hover:text-basic-red text-sm ${selectedOption === 'recommendation' ? 'text-basic-red' : ''}`}>
              <input
                type="radio"
                value="recommendation"
                className="appearance-none"
                checked={selectedOption === 'recommendation'}
                onChange={() => handleOptionChange('recommendation')}
              />
              <FaThumbsUp className="text-lg" />
              <span className="ml-2">추천</span>
            </label>
            <label className={`flex justify-center items-center hover:text-basic-red text-sm ${selectedOption === 'top' ? 'text-basic-red' : ''}`}>
              <input
                type="radio"
                value="top"
                className="appearance-none"
                checked={selectedOption === 'top'}
                onChange={() => handleOptionChange('top')}
              />
              <FaAngleDoubleUp className="text-lg" />
              <span className="ml-2">TOP</span>
            </label>
       
            
          </div>

          <div className="flex items-end w-full h-24 border mb-2 border-basic-gray-third relative text-basic-white "
            style={{
              backgroundImage: `url(https://cdn.gameinsight.co.kr/news/photo/202202/24053_61496_3054.jpg)`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: '50% 52%',
            }}
            onClick={() => {
              window.location.href = 'https://playvalorant.com/ko-kr/'; // 외부 링크 주소를 여기에 입력합니다.
            }}>
            <div className="hover-overlay w-full h-full bg-basic-red opacity-0 hover:opacity-100 transition-opacity duration-500 ease-in-out"
              style={{
                backgroundImage: `url(https://cdna.artstation.com/p/assets/images/images/030/940/370/small/lorenzo-lanfranconi-west-studio-lorenzo-lanfranconi-valorant-1.jpg?1602102081)`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: '50% 45%',
              }}>
            </div>
            <p className='absolute bottom-0 right-0 mr-2 mb-1 text-xs '>홈페이지 바로가기</p>   
          </div>
          <Posts order={selectedOption}/>
        </div>

        {/* 사이드바 */}
        <div className='hidden w-4/12 ml-3 md:block'>
          <div className='bg-white rounded mb-6'>
            <div className='p-3 rounded-t bg-basic-black-second'
              style={{
                background: `linear-gradient(-45deg, #ff4654 50%, #101823 50%)`,
              }}
            >
              <p className='text-xl text-basic-white font-ptBlack'>인기 게시판</p>
            </div>

            {/* 커뮤니티 리스트 */}
            <div>
              {topSubs?.map((sub, idx) => (
                <div
                  key={sub.name}
                  className='flex items-center text-xs bg-basic-gray-second border-b border-basic-gray-third relative h-10'
                >
                  <div className='text-sm font-ptBlack bg-basic-gray w-8 h-full flex items-center justify-center mr-2'>{idx+1}</div>
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
                  <div className='text-xs bg-basic-gray w-12 h-full flex items-center justify-end absolute right-0'>
                    <p className='absolute right-2'>{sub.postCount}개</p>
                  </div>
                  {/* <p className='absolute right-2 font-md'>{sub.postCount}</p> */}
                </div>
              ))}
            </div>

            {/* {authenticated &&
              <div className='w-full py-4 text-center'>
                <Link href="/subs/list">
                  <a className='w-full px-3 py-1 text-center text-white bg-fuchsia-800 rounded text-sm'>
                    전체 커뮤니티
                  </a>
                </Link>
              </div>
            } */}
          </div>

          <Category></Category>
        </div>
      </div>



    </div>
  )
}

export default Home
