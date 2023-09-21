'use client'
import Image from "next/image"
import Link from "next/link"
import {usePathname} from 'next/navigation'
import { server } from "../../utlits"
import { useContext } from "react"
import { ApiContextProvider } from "@/Context/ApiContext"

export const Header = () => {
    const context = useContext(ApiContextProvider)
    const pathname = usePathname()
    const openMenu = () => {
        if (document.getElementById('menu').className == "menu transition-all absolute bg-orange-200 rounded-md right-16 top-14 overflow-hidden z-10 h-[auto] p-2"){
            document.getElementById('menu').className = "menu transition-all absolute bg-orange-200 rounded-md right-16 top-14 overflow-hidden z-10 h-[0px] p-0"
        }else{
            document.getElementById('menu').className = "menu transition-all absolute bg-orange-200 rounded-md right-16 top-14 overflow-hidden z-10 h-[auto] p-2"
        }
    }
  return (
    <div className="py-3 flex justify-between shadow-lg p-5 from from-orange-50 bg-gradient-to-t">
        <Link href={'/'} className="flex my-auto">
            <Image  alt="" width={40} height={40} src={'/brand-logo.png'} />
        </Link>
        <div className="flex flex-row-reverse gap-3 my-auto">
            <Link href={'/'} className={`font-medium hover:text-orange-600 transition-all ${pathname == '/' || pathname.includes('/home_work') ? 'text-orange-600' : null}`}>الواجبات</Link>
            <Link href={'/lessons'} className={`font-medium hover:text-orange-600 transition-all ${pathname == '/lessons' || pathname.includes('/lessons') ? 'text-orange-600' : null}`}>الدروس</Link>
            <Link href={'/media'} className={`font-medium hover:text-orange-600 transition-all ${pathname == '/media' || pathname.includes('/media') ? 'text-orange-600' : null}`}>الكتب والصوتيات</Link>
        </div>
        <Image alt="" width={40} height={40} src={context?.student?.image ? `${server+context?.student?.image}` : '/avatar-.jpg'} className="rounded-full cursor-pointer hover:scale-105 transition-all hover:shadow-lg hover:shadow-orange-200 w-[40px] h-[40px]" onClick={openMenu} />
        <div id="menu" className="menu transition-all absolute bg-orange-200 rounded-md right-16 top-14 overflow-hidden z-10 h-[0px] p-0">
            <div className="flex flex-col gap-2 text-end">
                <Link href={'/profile'} className="cursor-pointer hover:text-neutral-500 font-medium">البروفايل</Link>
                <h3 onClick={() => {
                    localStorage?.removeItem('phone')
                    window?.location?.reload()
                }} className="cursor-pointer hover:text-neutral-500 font-medium">تسجيل الخروج</h3>
            </div>
        </div>
    </div>
  )
}
