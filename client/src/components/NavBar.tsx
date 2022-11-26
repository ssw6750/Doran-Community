import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { FaSearch } from 'react-icons/fa';
import { useAuthDispatch, useAuthState } from '../context/auth'

const NavBar: React.FC = () => {
    const [myPageIsOpen, setMyPageOpen] = useState(false)
    const [menuIsOpen, setMenuOpen] = useState(false)
    const [searchBarPosition, setSearchBarPosition] = useState(0)
    const { loading, authenticated, user } = useAuthState();
    const dispatch = useAuthDispatch();

    type gridColumnsType = {
        [key: number]: string;
    };

    const gridColumns: gridColumnsType = {
        0: "fixed inset-x-0 top-0 z-10 flex items-center justify-center h-12 px-4 bg-white border-b transition-all rounded-b md:top-12`",
        1: "fixed inset-x-0 top-12 z-10 flex items-center justify-center h-12 px-4 bg-white border-b transition-all rounded-b md:top-12`",
    };

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

    const handleMyPage = () => {
        return setMyPageOpen(!myPageIsOpen)
    }

    const handleMenu = () => {
        return setMenuOpen(!menuIsOpen)
    }

    // 하드 코딩 수정 필요,,
    const handleSearchBar = () => {
        if (searchBarPosition === 0) {
            setSearchBarPosition(searchBarPosition+1)
            console.log(searchBarPosition);
                
        }
        else {
            setSearchBarPosition(searchBarPosition-1)
            console.log(searchBarPosition);
}
 
    }

    const myPageDropBox = useRef<HTMLDivElement>(null);
    const handleClickOutsideMyPage = (event: Event) => {
        console.log(myPageDropBox.current?.contains)    
        if (!myPageDropBox.current?.contains(event.target as Node)) {
            return setMyPageOpen(false);
        }
    };

    const menuDropBox = useRef<HTMLDivElement>(null);
    const handleClickOutsideMenu = (event: Event) => {
        console.log(menuDropBox.current?.contains)
        if (!menuDropBox.current?.contains(event.target as Node)) {
            return setMenuOpen(false);
        }
    };



    useEffect(() => {
        document.addEventListener("click", handleClickOutsideMyPage, true);
        return () => {
            document.removeEventListener("click", handleClickOutsideMyPage, true);
        };
    }, []);

    useEffect(() => {
        document.addEventListener("click", handleClickOutsideMenu, true);
        return () => {
            document.removeEventListener("click", handleClickOutsideMenu, true);
        };
    }, []);

    return (
        <>
        <div className='fixed inset-x-0 top-0 z-20 flex items-center justify-between h-12 px-4 bg-white'>
            <div className='flex min-w-fit'>
                <div className='text-2xl font-semibold text-gray-400 min-w-fit'>
                <Link href="/">
                    {/* Community */}
                    <a className='flex'>
                        <Image
                            src="/11.png"
                            alt="logo"
                            width={90}
                            height={30}     
                        >
                        </Image>
                    </a>
                </Link>
            </div>
            {/* md 사이즈 이하 일때 계정 아이콘 표시 */}
            {!loading &&
                <>
                    <div className='md:hidden relative border hover:cursor-pointer text-gray-500 hover:text-fuchsia-800 min-w-fit' onClick={handleMenu} ref={menuDropBox}>
                        <i
                            className='fas fa-align-justify fa-lg my-1 mx-2 text-inherit' />
                        <i
                            className='fas fa-angle-double-down fa-sm mx-2 mb-1 text-inherit' />
                        {menuIsOpen && 
                            (<div className='absolute border w-48 left-0 top-10 bg-white rounded'>
                                {authenticated &&
                                <div className='mb-1'>
                                        <div className='pb-2 hover:cursor-default'>
                                            <a className='text-xs ml-2 text-gray-400 font-mono'>MY Community (임시)</a>
                                </div>
                                    {/* map함수로 반복문 돌려서 리스트 표현 -> 미구현 */}
                                    <div className='hover:bg-gray-100'>
                                            <Link href={`/r/발로란트`}>
                                        <a className='w-full  text-sm block p-2 text-gray-600 font-normal'>
                                            /r/발로란트
                                        </a>
                                    </Link>
                                    </div>
                                    <div className='hover:bg-gray-100'>
                                            <Link href={`/r/축구`}>
                                        <a className='w-full  text-sm block p-2 text-gray-600'>
                                            /r/축구
                                        </a>
                                    </Link>
                                        </div>
                                        <div className='hover:bg-gray-100'>
                                            <Link href={`/r/test`}>
                                                <a className='w-full  text-sm block p-2 text-gray-600'>
                                                    /r/test
                                                </a>
                                            </Link>
                                        </div>
                                        <div className='pb-2 hover:cursor-default'>
                                            <a className='text-xs ml-2 text-gray-400 font-mono'>MENU</a>
                                        </div>
                                        <div className='text-gray-600'>
                                            <div className='hover:bg-gray-100 flex items-center'>
                                                <div className='pl-1'>
                                                    <i
                                                        className='fas fa-door-open fa-lg' />
                                                </div>
                                                <Link href={`/subs/create`}>
                                                    <a className='w-full text-sm block p-2 text-gray-600 font-thin'>
                                                        커뮤니티 생성
                                                    </a>
                                                </Link>
                                            </div>
                                            <div className='hover:bg-gray-100 flex items-center'>
                                                <div className='pl-2'>
                                                    <i
                                                        className='fas fa-pencil-alt fa-lg' />
                                                </div>
                                                <Link href={`/posts/create`}>
                                                    <a className='w-full  text-sm block p-2 text-gray-600 font-thin'>
                                                        포스트 생성
                                                    </a>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>}
                                <div className='pb-2 hover:cursor-default'>
                                    <a className='text-xs ml-2 text-gray-400 font-mono'>FEEDS</a>
                                </div>
                                <div className='text-gray-600'>
                                <div className='hover:bg-gray-100 flex items-center'>
                                    <div className='pl-1'>
                                        <i
                                            className='fas fa-home fa-lg' />
                                    </div>
                                    <Link href={`/`}>
                                            <a className='w-full text-sm block p-2 text-gray-600 font-thin'>
                                            Home
                                        </a>
                                    </Link>
                                </div>
                                <div className='hover:bg-gray-100 flex items-center'>
                                    <div className='pl-2 pr-1'>
                                        <i
                                            className='fas fa-fire fa-lg' />
                                    </div>
                                    <Link href={`/subs/list`}>
                                        <a className='w-full  text-sm block p-2 text-gray-600 font-thin'>
                                            Popular
                                        </a>
                                    </Link>
                                </div>
                                </div>
                                
                            </div>)
                        }
                    </div>
                </>
            }
                <div className='px-4 md:hidden'>
                    <div 
                        className='relative flex items-center h-8 w-14 justify-center border hover:bg-fuchsia-800 hover:text-white rounded-full text-gray-500'
                            onClick={handleSearchBar}>
                        <FaSearch className='m-2 text-inreit' />
                    </div>
                </div>
                
            </div>

            

            

            <div className='max-w-full px-4 hidden md:block'>
                <div className='relative flex items-center h-7 bg-gray-100 border rounded hover:border-fuchsia-800 hover:bg-white'>
                    <FaSearch className='ml-2 text-gray-400' />
                    <input
                        type="text"
                        placeholder='Search...'
                        className='px-3 py-1 bg-transparent rounded focus:outline-none text-sm'
                    />
                </div>
            </div>



            {/* loading으로 감싸주지 않으면 Hydration error 발생 (원인을 잘 모르겠음) */}
            {/* md 사이즈 이하 일때 계정 아이콘 표시 */}
            {!loading &&
            <>
                <div className='md:hidden relative border hover:cursor-pointer text-gray-500 hover:text-fuchsia-800 min-w-fit' onClick={handleMyPage} ref={myPageDropBox}>
                    <i
                        className='fas fa-user-circle fa-lg my-1 mx-2 text-inherit' />
                    <i
                        className='fas fa-angle-double-down fa-sm mx-2 mb-1 text-inherit' />
                    {myPageIsOpen && (authenticated ? 
                        (<div className='absolute border w-36 right-0 top-10 bg-white rounded'>
                                <a 
                                className='w-full text-center text-sm block py-2 hover:bg-fuchsia-800 hover:text-white font-semibold text-gray-600'
                                    onClick={handleLogout}>
                                    로그아웃
                                </a>
                            <Link href={`/u/${user?.username}`}>
                                <a className='w-full text-center text-sm block py-2 hover:bg-fuchsia-800 hover:text-white font-semibold text-gray-600'>
                                    마이페이지
                                </a>
                            </Link>
                        </div>) 
                        : (<div className='absolute border w-36 right-0 top-10 bg-white rounded'>
                            <Link href="/login">
                                <a className='w-full text-center text-sm block py-2 hover:bg-fuchsia-800 hover:text-white font-semibold text-gray-600'>
                                    로그인
                                </a>
                            </Link>
                            <Link href="/register">
                                <a className='w-full text-center text-sm block py-2 hover:bg-fuchsia-800 hover:text-white font-semibold text-gray-600'>
                                    회원가입
                                </a>
                            </Link>
                        </div>))
                        }
                </div>
            </>
            }

            <div className='hidden md:block'>
                <div className='flex'>
                    {!loading && (
                        authenticated ? (
                            <button
                                className='w-20 px-2 mr-2 text-center text-sm text-white bg-fuchsia-800 rounded h-7'
                                onClick={handleLogout}
                            >
                                로그아웃
                            </button>
                        ) : (
                            <>
                                <Link href="/login">
                                    <a className='w-20 px-2 pt-1 mr-2 text-center text-sm text-fuchsia-800 border border-fuchsia-800 rounded h-7'>
                                        로그인
                                    </a>
                                </Link>
                                <Link href="/register">
                                        <a className='w-20 px-2 pt-1 text-center text-sm text-white bg-fuchsia-800 rounded h-7'>
                                        회원가입
                                    </a>
                                </Link>
                            </>
                        )
                    )}
                </div>
            </div>
        </div>
            <div className={gridColumns[searchBarPosition]}>
                <div className='relative flex items-center h-7 bg-gray-100 border rounded hover:border-fuchsia-800 hover:bg-white'>
                    <FaSearch className='ml-2 text-gray-400' />
                    <input
                        type="text"
                        placeholder='Search...'
                        className='px-3 py-1 bg-transparent rounded focus:outline-none text-sm'
                    />
                </div>
            </div>
        </>
    )
}

export default NavBar