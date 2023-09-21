'use client'
import { ApiContextProvider } from "@/Context/ApiContext"
import { Header } from "@/components/Header"
import Image from "next/image"
import { useContext } from "react"
import { server } from "../../../../../../utlits"
import LoadingComponent from "@/components/LoadingComponent"
import RenewRequeired from "@/components/RenewRequeired"
import Navigator from "@/components/Navigator"

const page = () => {
    const context = useContext(ApiContextProvider)
    
    if(!context?.student?.is_paied && context?.student?.id){
        return <RenewRequeired />
    }

    
    return (
        <div className="pb-10 md:flex md:flex-row-reverse">
            <Navigator />        
            <div className="review_homework pb-10 px-2 pt-2 gap-3 flex flex-col md:w-full">
                <div className="from-slate-100 to-rose-200 bg-gradient-to-t shadow-lg text-center p-2 rounded-lg flex flex-col gap-1">
                    <strong>تصحيح الواجب</strong>
                    <p>{context?.reviewHomework[0]?.homework_text}</p>
                </div>
                <div className="from-red-100 to-orange-100 bg-gradient-to-t shadow-lg text-center p-2 rounded-lg flex flex-row-reverse gap-1 justify-center">
                    <strong> :نتيجتك</strong>
                    <strong>{context?.reviewHomework[0]?.review}</strong>
                </div>
                <hr />
                <div className="reviews flex flex-col gap-4">
                    {
                        context?.reviewHomework?.map((review:any) => (
                            <div className="
                            text-end p-3 from-rose-100 to-orange-50 bg-gradient-to-bl flex flex-col gap-2
                            " key={review?.id}>
                                <div className="flex flex-col gap-1">
                                    <h3 className="underline underline-offset-8"> :السؤال</h3>
                                    <h3>{review?.question_text}</h3>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <h3 className="underline underline-offset-8"> :اجابتك</h3>
                                    <h3>{review?.answer_text}</h3>
                                </div>
                                {
                                    review?.is_correct ? <p className="text-end text-green-500">اجابتك صحيحة</p> : <p className="text-end text-red-500">اجابتك خاطئة</p>
                                }
                                {
                                    review?.is_correct ? null : <div className="text-end">
                                        <hr className="text-white bg-white" />
                                        <div className="flex flex-col gap-1">
                                            <h3 className="underline underline-offset-8"> :الاجابة الصحيحة</h3>
                                            <h3>{review?.correct_answer_text}</h3>
                                        </div>
                                    </div>
                                }
                            </div>
                        ))
                    }
                </div>
            </div>
            {context?.loading ? <LoadingComponent /> : null}
        </div>
    )
}

export default page