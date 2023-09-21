"use client";
import { Header } from "@/components/Header";
import { useContext, useRef, useState } from "react";
import { ApiContextProvider } from "@/Context/ApiContext";
import SwiperButtonNext from '@/components/SwiperButtonNext'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import 'swiper/css';
import LoadingComponent from '@/components/LoadingComponent'
import Image from "next/image";
import { server } from "../../../../../utlits";
import RenewRequeired from "@/components/RenewRequeired";
import Navigator from "@/components/Navigator";

const page = () => {
  const context = useContext(ApiContextProvider);

  const [loading, setLoading] = useState(false)


  if (!context?.student?.is_paied && context?.student?.id) {
    return <RenewRequeired />
  }


  var values = []

  const onchange_valuse = (e, i) => {
    const selectedValue = e.target.closest(".flex.flex-col.gap-2").querySelector("select").value;
    const id = i?.id

    const index =  values.findIndex(e => e.question == id)

    if (index !== -1){
      values[index].answer = selectedValue
    }else{
      values.push({
        question:id,
        answer:selectedValue
      })
    }
    
    
  }

  return (
    <div>
      <div className="md:flex-row-reverse md:flex">
        <Navigator />
        <div className="homework_answer py-3 px-3 pb-10 pt-3 md:w-[100%]">
          <div className="from-neutral-100 to-rose-100 bg-gradient-to-t shadow-lg text-center p-2 rounded-lg flex flex-col gap-1 justify-center">
            <strong>حل واجب</strong>
            <strong className="underline underline-offset-8">{context?.homeworks[0]?.title}</strong>
          </div>
          <hr className="my-4" />
          <div>
            <strong className="text-red-300 p-2 text-end flex justify-end">:ملاحظة<br /> كن حذرا في الاختيارات وعدم الخروج من الامتحان نهائيا لعدم حدوث اي مشكلة</strong>
          </div>
          <hr className="my-4" />
          <div className="answer">
          {context?.homeworks?.map((e) => (
              <div key={e?.id}>
                <div>
                  <Swiper
                    spaceBetween={50}
                    slidesPerView={1}
                    simulateTouch={false}
                  >
                    {e?.questions?.map((i) => (
                      <SwiperSlide key={i.id}>
                        <div className="flex flex-col gap-2">
                          {i?.image ? <Image src={server+i?.image} className="w-[100%]" width={500} height={500} alt="" /> : null}
                          <div className="flex flex-col text-end gap-3 py-2">
                            <h3 className="underline underline-offset-8 text-2xl"> :السؤال</h3>
                            <h3 className="underline underline-offset-8 text-2xl">{i?.text}</h3>
                          </div>
                          <select onChange={(e) => onchange_valuse(e, i)} className="text-end border p-3">
                            <option value={""}>أختر الاجابة الصحيحة</option>
                            {i?.answers?.map((ans) => (
                              <option key={ans?.id} value={ans?.id}>
                                {ans?.text}
                              </option>
                            ))}
                          </select>
                          <SwiperButtonNext values={values} title={e?.title} setLoading={setLoading} hm_id={e?.id} id={i?.id} />
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {context?.loading ? <LoadingComponent /> : null}
      {context?.loading ? <LoadingComponent /> : null}
    </div>
  );
};

export default page;
