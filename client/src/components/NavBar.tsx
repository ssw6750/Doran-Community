import axios from 'axios';
import { TransformPlainToInstance } from 'class-transformer';
import Image from 'next/image';
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { FaSearch } from 'react-icons/fa';
import { useAuthDispatch, useAuthState } from '../context/auth'

const NavBar: React.FC = () => {
    const [isOpen, setOpen] = useState(false)
    const { loading, authenticated } = useAuthState();
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

    const menuDropBox = useRef<HTMLElement>();
    const handleClickOutside = (event: Event) => {    
        if (isOpen === true && !menuDropBox.current?.contains(event.target as Node)) {
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
        <div className='fixed inset-x-0 top-0 z-10 flex items-center justify-between h-14 px-4 bg-white'>
            <div className='text-2xl font-semibold text-gray-400'>
                <Link href="/">
                    {/* Community */}
                    <a>
                        <Image
                            src="/reddit-logo.png"
                            alt="logo"
                            width={90}
                            height={30}
                        >
                        </Image>
                    </a>
                </Link>
            </div>

            <div className='max-w-full px-4'>
                <div className='relative flex items-center h-7 bg-gray-100 border rounded hover:border-gray-700 hover:bg-white'>
                    <FaSearch className='ml-2 text-gray-400' />
                    <input
                        type="text"
                        placeholder='Search Reddit'
                        className='px-3 py-1 bg-transparent rounded focus:outline-none'
                    />
                </div>
            </div>

            {/* loading으로 감싸주지 않으면 Hydration error 발생 (원인을 잘 모르겠음) */}
            {/* md 사이즈 이하 일때 계정 아이콘 표시 */}
            {!loading &&
            <>
                <div className='md:hidden relative' onClick={handleMenu}>
                    <i
                        className='text-gray-500 fas fa-user-circle fa-lg hover:cursor-pointer hover:text-blue-300' />
                    {isOpen &&
                        (<div className='absolute border w-24 right-0 top-10 bg-white ' ref={menuDropBox}>
                            <Link href="/login">
                                <a className='w-full text-center text-sm block py-2 border hover:bg-blue-400 hover:text-white font-semibold'>
                                    로그인
                                </a>
                            </Link>
                            <Link href="/login">
                                <a className='w-full text-center text-sm block py-2 border hover:bg-blue-400 hover:text-white font-semibold'>
                                    로그인
                                </a>
                            </Link>
                            <Link href="/login">
                                <a className='w-full text-center text-sm block py-2 border hover:bg-blue-400 hover:text-white font-semibold'>
                                    로그인
                                </a>
                            </Link>
                        </div>)}
                </div>
            </>
            }

            <div className='hidden md:block'>
                <div className='flex'>
                    {!loading && (
                        authenticated ? (
                            <button
                                className='w-20 px-2 mr-2 text-center text-sm text-white bg-gray-400 rounded h-7'
                                onClick={handleLogout}
                            >
                                로그아웃
                            </button>
                        ) : (
                            <>
                                <Link href="/login">
                                    <a className='w-20 px-2 pt-1 mr-2 text-center text-sm text-blue-500 border border-blue-500 rounded h-7'>
                                        로그인
                                    </a>
                                </Link>
                                <Link href="/register">
                                    <a className='w-20 px-2 pt-1 text-center text-sm text-white bg-gray-400 rounded h-7'>
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