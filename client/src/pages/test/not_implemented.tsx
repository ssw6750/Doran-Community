import Image from 'next/image'
import React from 'react'

const NotImplemented = () => {
  return (
    <div
          className='flex justify-center m-20'>
            <div>
            <a className='flex'>
              <Image
                  src="/bug01.jpg"
                  alt="logo"
                  width={400}
                  height={300}
              >
              </Image>
          </a>
          <div>
            미구현 페이지입니다
          </div>
          </div>
    </div>
  )
}

export default NotImplemented