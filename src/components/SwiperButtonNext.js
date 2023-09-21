'use client'

import { useSwiper } from 'swiper/react'
import { server } from '../../utlits'
import { useContext } from 'react'
import { ApiContextProvider } from '@/Context/ApiContext'
import { useRouter } from 'next/navigation'

const SwiperButtonNext = (props) => {
    const route = useRouter()
    const swiper = useSwiper()

    const context = useContext(ApiContextProvider)

    const sendAnswer = async (e) => {
        context?.setLoading(true)

        const selectedValue = e.target.closest(".flex.flex-col.gap-2").querySelector("select").value;
        const id = props?.id
        const homework_id = props?.hm_id
        const student_id = context?.student?.id


        if(swiper.isEnd){
            context?.setLoading(true)
            if(selectedValue){
                context?.setLoading(true)
                console.log('dsad');
                console.log(props?.values);
                // props?.values?.map((e) => console.log(JSON.stringify({
                //     homework:homework_id,
                //     student:student_id,
                //     question:e?.question,
                //     answer:e?.answer
                // })))
                props?.values?.map((e) => {
                    context?.setLoading(true)
                    fetch(`${server}send_answer/`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            homework:homework_id,
                            student:student_id,
                            question:e?.question,
                            answer:e?.answer
                        })
                    })
                    .then((e) => e.json())
                    .then((e) => {
                        context?.setLoading(true)
                        if(e?.success){
                            context?.setLoading(false)
                            window.location.pathname == '/'
                        }if(e?.error){
                            alert(e?.error)
                        }
                    })
                })
                context?.getHomeworks()
            }else{
                console.log('no select');
            }
        }


        
        if(selectedValue){
            swiper.slideNext()
        }else{
            context?.setLoading(false)
            alert('يجب ان تدخل اجابة')
        }

    }

    return <button
        onClick={(e) => {
            sendAnswer(e)
        }}
        className="w-fit px-3 ms-auto"
    >
        التالي
    </button>
}

export default SwiperButtonNext