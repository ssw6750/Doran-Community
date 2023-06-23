import React, { useState } from 'react'
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

function MainImageBanner() {
  const [slideNumber, setSlideNumber] = useState(0)
  const banners = ['/cat.jpg', '/tree-2249363_1920.jpg', '/cat02.jpg', '/bug01.jpg']  // 배너 테스트용 -> 나중에 데이터로 받아옴

  type slideType = {
    [key: number]: string;
  };

  const gridColumns: slideType = {
    0: "flex justify-content w-[400%] -ml-[0%] transition-all ",
    1: "flex justify-content w-[400%] -ml-[100%] transition-all ",
    2: "flex justify-content w-[400%] -ml-[200%] transition-all ",
    3: "flex justify-content w-[400%] -ml-[300%] transition-all ",
  };

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

  return (
    <div>
      {/* 상단 배너 */}
      <div className='hidden md:block'>
        <div className='justify-content flex mb-2'>
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
                  <div className='truncate w-inherit text-xs'>내용입니다.</div>
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
    </div>
  )
}

export default MainImageBanner