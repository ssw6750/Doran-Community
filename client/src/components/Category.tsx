import Link from 'next/link'
import React from 'react'
import { useAuthDispatch, useAuthState } from '../context/auth';
import axios from 'axios';

function Category() {
  const { authenticated } = useAuthState();
  const dispatch = useAuthDispatch();

  const handleLogout = () => {
    axios.post("/auth/logout")
      .then(() => {
        dispatch("LOGOUT");
        window.location.reload();
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div className='bg-basic-white border rounded'>
      <div className='w-full text-center'>
        <Link href="/subs/create">
          {authenticated ? 
          <a className='w-auto p-2 m-4 flex justify-center items-center text-white text-sm bg-basic-red rounded font-ptBlack'
              onClick={handleLogout}
          >
            로그아웃
            </a> : <Link href="/login">
              <a className='w-auto p-2 m-4 flex justify-center items-center text-white text-sm bg-basic-red rounded font-ptBlack'>
              로그인
            </a>
            </Link>}
        </Link>
      </div>

      <div className='w-full text-start pl-4 text-basic-gray-third flex-col pt-2 border-t border-basic-gray-second'>
        <p className='text-sm text-basic-black-second'>홈</p>
        <Link href="/">
          <a className='w-auto m-2 rounded block text-basic-black-second'>
            전체
          </a>
        </Link>
      </div>

      <div className='w-full text-start pl-4 text-basic-gray-third flex-col pt-2 border-t border-basic-gray-second'>
        <p className='text-sm text-basic-black-second'>정보</p>
        <Link href="/r/요원">
          <a className='w-auto m-2 rounded block text-basic-black-second'>
            요원
          </a>
        </Link>
        <Link href="/r/팁과 노하우">
          <a className='w-auto m-2 rounded block text-basic-black-second'>
            팁과 노하우
          </a>
        </Link>
        <Link href="/r/유저 뉴스">
          <a className='w-auto m-2 rounded block text-basic-black-second'>
            유저 뉴스
          </a>
        </Link>
      </div>

      <div className='w-full text-start pl-4 text-basic-gray-third flex-col pt-2 border-t border-basic-gray-second'>
        <p className='text-sm text-basic-black-second'>커뮤니티</p>
        <Link href="/r/자유">
          <a className='w-auto m-2 rounded block text-basic-black-second'>
            자유
          </a>
        </Link>
        <Link href="/r/유머">
          <a className='w-auto m-2 rounded block text-basic-black-second'>
            유머
          </a>
        </Link>
        <Link href="/r/영상">
          <a className='w-auto m-2 rounded block text-basic-black-second'>
            영상
          </a>
        </Link>
        <Link href="/r/유저찾기">
          <a className='w-auto m-2 rounded block text-basic-black-second'>
            유저찾기
          </a>
        </Link>
        <Link href="/r/사건 신고">
          <a className='w-auto m-2 rounded block text-basic-black-second'>
            사건 신고
          </a>
        </Link>
        <Link href="/r/팬아트">
          <a className='w-auto m-2 rounded block text-basic-black-second'>
            팬아트
          </a>
        </Link>
      </div>

      {authenticated &&
              <div>
                <div className='p-4 text-center'>
                  <Link href="/subs/create">
              <a className='w-full block py-1 text-center text-basic-red border border-basic-red rounded text-sm hover:text-basic-white hover:bg-basic-red'>
                      커뮤니티 생성
                    </a>
                  </Link>
                </div>
              </div>
            }
    </div>
  )
}

export default Category