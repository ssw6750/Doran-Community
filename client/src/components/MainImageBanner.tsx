import React, { useState, MouseEventHandler } from 'react'
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

function MainImageBanner() {
  const [slideNumber, setSlideNumber] = useState(0)
  const banners = [
    {
      img: 'https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/bltdc2d1021264f7201/6493ac762429af993ff499d5/Hub_banner_1920_1080_(1).jpg?auto=webp&disable=upscale&width=336',
      title: '[라이엇 스토어] 2023 VCT 마스터스 컬렉션',
      des: '2023 VCT 마스터스 도쿄 상품 컬렉션으로 마스터스 도쿄 대회를 기념하세요!',
      url:'https://playvalorant.com/ko-kr/news/announcements/2023-vct-masters-collection/'
    },
    {
      img: 'https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/blta894009ad6f48193/627b719e2bec9b34ea68c3e3/Notice_VaL.jpg?auto=webp&disable=upscale&width=336',
      title: '발로란트 필수 고지사항 및 VP 정책 변경 안내',
      des: '발로란트 VP 정책 및 계약 관련 필수 고지 사항이 변경될 예정입니다.',
      url: 'https://playvalorant.com/ko-kr/news/announcements/kr-valorant-payment-change-20230628/'
    },
    {
      img: 'https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt0e43c71677e61853/6487cb479601bc52cb0802f3/EP7_announce_article.jpg?auto=webp&disable=upscale&width=252',
      title: '에피소드 7 업데이트 사전예약 안내',
      des: '발로란트의 새로운 시작, 에피소드 7 업데이트에 사전예약하고 특별한 보상도 획득하세요!',
      url: 'https://playvalorant.com/ko-kr/news/announcements/ep7-update-announcement/'
    },
    {
      img: 'https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt57a3b3a513a7fa91/624a4b4d4edd947eefb3c167/deploy.jpg?auto=webp&disable=upscale&width=252',
      title: '2023년 6월 8일 (목) 서버 점검 안내 (완료)',
      des: '2023 VCT 마스터스 도쿄 상품 컬렉션으로 마스터스 도쿄 대회를 기념하세요!',
      url: 'https://playvalorant.com/ko-kr/news/announcements/20230608-deploy/'
    },
   ]  // 배너 테스트용 -> 나중에 데이터로 받아옴

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

  const handleLinkClick= (linkStr: string) => {
    window.location.href = linkStr; // 외부 링크 주소를 여기에 입력합니다.
  };

  return (
    <div>
      {/* 상단 배너 */}
      <div className='hidden md:block'>
        <div className='justify-content flex mb-2'>
          {
            banners?.map((banner, idx) => (
              <button className='h-36  bg-gray-500 flex-auto first:ml-0 mx-1 last:mr-0 rounded relative'
                style={{
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0) 60%, rgba(0, 0, 0, 0.9)), url('${banner.img}')`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
                key={idx}
                onClick={()=>handleLinkClick(banner.url)}
                ><div className='absolute text-white bottom-0 left-0 right-0 m-2'>
                  <div className='truncate'>{banner.title}</div>
                  <div className='truncate w-inherit text-xs'>{banner.des}</div>
                </div></button>
            )
            )
          }
        </div>
      </div>


      {/* md 사이즈 이하일때 배너(캐러셀형식으로 만들기)  */}
      <div className='overflow-hidden w-inherit relative border mb-2 md:hidden hover:cursor-pointer'>
        <div className={gridColumns[slideNumber]}>
          <div className='absolute z-10 top-[50%] translate-y-[-50%] left-2 bg-gray-500 opacity-50 rounded-full text-white'
            onClick={handleArrowBack}><IoIosArrowBack className='text-4xl' /></div>
          <div className='absolute z-10 top-[50%] translate-y-[-50%] right-2 bg-gray-500 opacity-50 rounded-full text-white'
            onClick={handleArrowForward}><IoIosArrowForward className='text-4xl' /></div>
          {
            banners?.map((banner, idx) => (
              <div className='h-36 bg-gray-500 rounded relative flex-none w-[25%]'
                style={{
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0) 60%, rgba(0, 0, 0, 0.9)), url('${banner.img}')`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
                key={idx}><div className='absolute text-white bottom-0 left-0 right-0 m-2'>
                  <div className='truncate'>{banner.title}</div>
                  <div className='truncate w-inherit text-xs'>{banner.des}</div>
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