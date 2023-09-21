"use client";
import { ApiContextProvider } from "@/Context/ApiContext";
import HomeWork from "@/components/HomeWork";
import LoginRequried from "@/components/LoginRequried";
import Navigator from "@/components/Navigator";
import TopHomeWorkPage from "@/components/TopHomeWorkPage";
import Link from "next/link";
import { useContext, useState } from "react";

const page = () => {
  const context = useContext(ApiContextProvider);
  const [login, setLogin] = useState()

  if (typeof window !== 'undefined') {
    const item = localStorage.getItem('phone')
    if (!item){
      return <LoginRequried />
    }
  }

  if(!context?.student?.is_paied && context?.student?.id){
    return <h3 className="text-center">تم ايقاف حسابك مؤقتا يرجي التواصل مع المسؤول لمعرفة التفاصيل</h3>
}
  
  return (
    <>
      <div className="flex flex-col md:flex md:flex-row-reverse">
        <Navigator />
        <div className="px-2 flex flex-col gap-5 md:w-full pt-5">
          <TopHomeWorkPage />
          <hr />
          <div className="homeworks flex flex-col gap-5 pb-20">
            {
              context?.homeworks?.map((homework) => (
                <div key={homework?.id} className="flex flex-col">
                  <HomeWork homework={homework} />
                </div>
              ))
            }
          </div>
        </div>
      </div>
      {/* {!localStorage?.getItem('phone') ? <LoginRequried /> : null} */}
    </>
  );
};

export default page;
