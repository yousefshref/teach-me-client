'use client'
import React from 'react'
import { server } from "../../utlits"
import Image from "next/image"
import { ApiContextProvider } from "@/Context/ApiContext"
import { useContext } from "react"
import { usePathname } from 'next/navigation'
import Link from 'next/link'

import { AiOutlineFile, AiOutlineVideoCamera } from 'react-icons/ai'
import { BsBook } from 'react-icons/bs'
import { BiLogOut } from 'react-icons/bi'

const Navigator = () => {
    const context = useContext(ApiContextProvider)
    const pathname = usePathname()
    return (
        <>
            {/* md and lg */}
            <div className='
                slider_navigator hidden
                from-orange-100 to-rose-200 bg-gradient-to-tl h-[100vh] text-end md:min-w-[100px]
                md:flex md:flex-col md:gap-2 py-3 px-1 lg:min-w-[250px] lg:text-end
            '>
                <Link href={'/profile'} className='md:flex md:flex-col lg:gap-2 md:justify-center lg:flex-row-reverse'>
                    <div className='md:flex md:justify-center'>
                        <Image className='hover:rounded-full transition-all cursor-pointer' alt="" width={40} height={40} src={context?.student?.image ? `${server + context?.student?.image}` : '/avatar-.jpg'} />
                    </div>
                    <p className='md:hidden lg:block lg:my-auto'>{context?.student?.name}</p>
                </Link>
                <hr />
                <div className='h-[40%] flex flex-col gap-10 justify-center'>
                    <Link href={'/'} className={`flex justify-center text-2xl
                    
                    hover:bg-neutral-800 hover:text-white transition-all p-1 hover:py-2 hover:rounded-full

                    ${pathname == '/' ? 'bg-neutral-800 text-white transition-all p-1 py-2 rounded-full' : ''}
                    `}>
                        <div className='lg:flex lg:justify-end lg:gap-3 lg:text-lg'>
                            <span className='lg:my-auto'>
                                <BsBook />
                            </span>
                            <h3 className='md:hidden lg:block'>الواجبات</h3>
                        </div>
                    </Link>
                    <Link href={'/lessons'} className={`flex justify-center text-2xl
                    
                    hover:bg-neutral-800 hover:text-white transition-all p-1 hover:py-2 hover:rounded-full
                    
                    ${pathname == '/lessons' || pathname.includes('/lessons') ? 'bg-neutral-800 text-white transition-all p-1 py-2 rounded-full' : ''}
                    `}>

                        
                        <div className='lg:flex lg:justify-end lg:gap-3 lg:text-lg'>
                            <span className='lg:my-auto'>
                                <AiOutlineVideoCamera />
                            </span>
                            <h3 className='md:hidden lg:block'>الدروس</h3>
                        </div>
                    </Link>
                    <Link href={'/media'} className={`flex justify-center text-2xl

                        ${pathname == '/media' || pathname.includes('/media') ? 'bg-neutral-800 text-white transition-all p-1 py-2 rounded-full' : ''}
                    
                    hover:bg-neutral-800 hover:text-white transition-all p-1 hover:py-2 hover:rounded-full`}>
                        <div className='lg:flex lg:justify-end lg:gap-2 lg:text-lg'>
                            <span className='lg:my-auto'>
                                <AiOutlineFile />
                            </span>
                            <h3 className='md:hidden lg:block'>الملفات والكتب</h3>
                        </div>
                    </Link>
                </div>
                <div className='mt-auto'>
                    <Link href={'/'} className='flex justify-center text-2xl
                    
                    hover:bg-neutral-800 hover:text-white transition-all p-1 hover:py-2 hover:rounded-full
                    
                    mt-auto
                    lg:flex lg:justify-between lg:text-sm
                    '>
                        <span className='lg:my-auto'>
                            <BiLogOut />
                        </span>
                        <h3 className='md:hidden lg:block'>تسجيل الخروج</h3>
                    </Link>
                </div>
            </div>
            {/* sm and smaller */}
            <div className='bottom_navigator md:hidden shadow-xl z-50
            justify-between bottom-0 fixed rounded-t-2xl py-2 px-5 flex flex-row-reverse from-red-200 
            to-orange-200 bg-gradient-to-t bg-opacity-60
            w-[100%] text-white'>
                <Link href={'/'} className='flex flex-col justify-center'>
                    <div 
                        className={`
                        bg-neutral-800 p-2 text-neutral-50 text-lg rounded-full cursor-pointer transition-all
                        hover:bg-neutral-700 hover:text-white
                        mx-auto
                        ${pathname == '/' ? ' to-orange-200 from-red-200 bg-gradient-to-t text-neutral-800 border border-neutral-700' : null}
                        `}
                    >
                        <BsBook />
                    </div>
                    <strong className='mx-auto text-neutral-800'>الواجبات</strong>
                </Link>
                <Link href={'/lessons'} className='flex flex-col justify-center'>
                    <div 
                        className={`
                        bg-neutral-800 p-2 text-neutral-50 text-lg rounded-full cursor-pointer transition-all
                        hover:bg-neutral-700 hover:text-white
                        mx-auto
                        ${pathname == '/lessons' || pathname.includes('/lessons') ? ' to-orange-200 from-red-200 bg-gradient-to-t text-neutral-800 border border-neutral-700' : null}
                        `}
                    >
                        <AiOutlineVideoCamera />
                    </div>
                    <strong className='mx-auto text-neutral-800'>الدروس</strong>
                </Link>
                <Link href={'/media'} className='flex flex-col justify-center'>
                    <div 
                        className={`
                        bg-neutral-800 p-2 text-neutral-50 text-lg rounded-full cursor-pointer transition-all
                        hover:bg-neutral-700 hover:text-white mx-auto
                        ${pathname == '/media' ? ' to-orange-200 from-red-200 bg-gradient-to-t text-neutral-800 border border-neutral-700' : null}
                        `}
                    >
                        <AiOutlineFile />
                    </div>
                    <strong className='mx-auto text-neutral-800'>الملفات</strong>
                </Link>
                <Link href={'/profile'} className='flex flex-col justify-center'>
                    <div className='my-auto hover:scale-110 transition-all cursor-pointer mx-auto'>
                        <Image className='rounded-full w-[35px] h-[35px]' alt="" width={35} height={35} src={context?.student?.image ? `${server + context?.student?.image}` : '/avatar-.jpg'} />
                    </div>
                    <strong className='mx-auto text-neutral-800'>بروفايلك</strong>
                </Link>
            </div>
        </>
    )
}

export default Navigator