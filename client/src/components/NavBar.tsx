import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { FaSearch } from 'react-icons/fa';
import { useAuthDispatch, useAuthState } from '../context/auth'

const NavBar: React.FC = () => {
    const [isOpen, setOpen] = useState(false)
    const { loading, authenticated, user } = useAuthState();
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

    // 작동 제대로 안됨
    const handleMenu = () => {
        console.log(isOpen);
        return setOpen(!isOpen)
    }

    const menuDropBox = useRef<HTMLDivElement>(null);
    const handleClickOutside = (event: Event) => {
        console.log("AAAAA")
        console.log(menuDropBox.current?.contains)    
        if (!menuDropBox.current?.contains(event.target as Node)) {
            console.log("AAA")
            return setOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClickOutside, true);
        return () => {
            document.removeEventListener("click", handleClickOutside, true);
        };
    }, []);

    return (
        <div className='fixed inset-x-0 top-0 z-10 flex items-center justify-between h-12 px-4 bg-white'>
            <div className='text-2xl font-semibold text-gray-400'>
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

            <div className='max-w-full px-4'>
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
                <div className='md:hidden relative border hover:cursor-pointer text-gray-500 hover:text-fuchsia-800 min-w-fit' onClick={handleMenu} ref={menuDropBox}>
                    <i
                        className='fas fa-user-circle fa-lg my-1 mx-2 text-inherit' />
                    <i
                        className='fas fa-angle-double-down fa-sm mx-2 mb-1 text-inherit' />
                    {isOpen && (authenticated ? 
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
    )
}

export default NavBar