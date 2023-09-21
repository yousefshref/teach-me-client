'use client'
import { ApiContextProvider } from "@/Context/ApiContext"
import Navigator from "@/components/Navigator"
import LessonsFilter from "@/components/LessonsFilter"
import { useContext } from "react"
import Link from "next/link"

const page = () => {
  const context = useContext(ApiContextProvider)
  if(!context?.student?.is_paied && context?.student?.id){
    return <h3 className="text-center">تم ايقاف حسابك مؤقتا يرجي التواصل مع المسؤول لمعرفة التفاصيل</h3>
}
  return (
    <div className="md:flex md:flex-row-reverse">
      <Navigator />
      <div className="pb-24 px-2 md:w-full pt-3">
        <div
          className="restof 
              from-sky-50 to-purple-100 bg-gradient-to-b p-3
              rounded-lg shadow-md relative z-10 overflow-hidden
              "
        >
          <div
            className="
                text-center flex flex-col gap-2
                "
          >
            <div
              className="
                  flex gap-3 flex-row-reverse justify-center
                  "
            >
              <strong>فديوهات الدروس</strong>
            </div>
          </div>
        </div>
        <hr className="my-5" />
        <LessonsFilter />
        <hr className="my-5" />
        <div className="lessons text-end flex flex-col gap-3">
          {
            context?.lessons?.map((e: any) => (
              <Link href={{
                pathname: `/lessons/${e?.title?.replace(/ /g,'-')}`,
                query:{
                  id:e?.id
                }
              }} className="
              lesson
              border border-orange-300 hover:rounded-xl hover:pe-3 hover:from-orange-300 hover:to-rose-500 hover:bg-gradient-to-br transition-all hover:text-white p-2 cursor-pointer
              " key={e?.id}>
                <h3 className="text-lg">{e?.title}</h3>
                <small>{e?.date}</small>
              </Link>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default page