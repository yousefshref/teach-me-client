'use client'
import Image from "next/image"
import Rating from '@mui/material/Rating';
import { server } from "../../../utlits";
import { useContext, useState } from "react";
import { ApiContextProvider } from "@/Context/ApiContext";
import axios from 'axios';
import Navigator from "@/components/Navigator";
import { BiLogOut } from "react-icons/bi";
import { useRouter } from "next/navigation";

const page = () => {
    const context = useContext(ApiContextProvider)
    const route = useRouter()

    const handleImageChange = async (e) => {
        const formData = new FormData();
        formData.append('image', e);

        try {
            const response = await axios.patch(`${server}students/${context?.student?.id}/update-image/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Image changed successfully:', response.data);
            alert('تم تغيرر صورتك بننجاح')
            window.location.reload()
        } catch (error) {
            console.error('Error changing image:', error);
            alert('حدث خطأ ما يرجي المحاولة مره اخري')
        }
    };
    return (
        <div className="md:flex md:flex-row-reverse">
            <Navigator />
            <div className="pb-20 px-2 md:w-full pt-3">
                <div className="flex flex-col gap-2 text-end">
                    <div className="w-fit mx-auto">
                        <Image alt="" src={server + context?.student?.image} className="w-[500px]" width={500} height={500} />
                    </div>
                    <div className="text-center flex flex-col">
                        <label>غير صورتك من هنا</label>
                        <input onChange={(e) => {
                            handleImageChange(e.target.files[0])
                        }} type="file" />
                    </div>
                    <div className="flex flex-col gap-5">
                        <div className="flex flex-col gap-1">
                            <h1 className="text-3xl">{context?.student?.name}</h1>
                            <p>{context?.student?.phone}</p>
                        </div>
                        <div className="flex flex-col gap-1">
                            <p>تقييم المدرس لك</p>
                            <p><Rating readOnly value={context?.student?.review ? context?.student?.review : 1} /></p>
                        </div>
                        <div className="flex flex-col gap-1 border border-red-300 p-1">
                            <p>موعد التجديد</p>
                            <p>{context?.student?.renew_date}</p>
                        </div>
                        <div onClick={() => {
                            localStorage.removeItem('phone')
                            // route.push('/')
                            window.location.reload()
                            window.location.pathname = '/'
                        }} className='cursor-pointer md:hidden
                    
                    hover:bg-neutral-800 hover:text-white transition-all p-1 hover:py-2 hover:rounded-full
                    
                    mt-auto
                    flex justify-between text-sm
                    '>
                            <span className='my-auto'>
                                <BiLogOut />
                            </span>
                            <h3 className='md:hidden lg:block'>تسجيل الخروج</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page