import dayjs from 'dayjs'
import Link from 'next/link'
import React from 'react'
import { useAuthState } from '../context/auth'
import { Sub } from '../types'

type Props = {
    sub: Sub
}

const SideBar = ({sub}: Props) => {
    const {authenticated} = useAuthState()
    
    console.log('sub: ', sub)
    console.log('sub.name: ', sub?.name)
  return (
      <div className='hidden md:block text-basic-black '>
          <div className='rounded bg-basic-white'>
              <div className='rounded-t'
                  style={{
                      background: `linear-gradient(-45deg, #ff4654 50%, #101823 50%)`,
                  }}>
                  <p className='font-semibold font-ptBlack text-xl text-basic-yellow px-4 py-2'>
                    {sub?.name} 게시판</p>
            </div>
              <div className='px-4 py-2'>
                  <p className='mb-3 text-sm'>{sub?.description}</p>
                  <div className='flex mb-3 text-sm font-medium text-basic-black-border'>
                    <div className='w-1/2'>
                        <p>공지 바로가기</p>
                        <p>자세히 보기</p>
                    </div>
                </div>
                  <p className='my-3 text-xs'>
                    <i className='mr-2 fas fa-birthday-cake'></i>
                    {dayjs(sub?.createdAt).format('MM.DD.YYYY')}
                </p>
                {authenticated && (
                    <div>
                        <Link href={`/r/${sub?.name}/create`}>
                              <a className='w-full block text-center p-2 text-sm text-basic-red border border-basic-red rounded text-sm hover:text-basic-white hover:bg-basic-red font-ptBlack rounded'>
                                포스트 생성 
                            </a>
                        </Link>
                    </div>
                )}
            </div>
        </div>


    </div>
  )
}

export default SideBar