"use client";
import { ApiContextProvider } from "@/Context/ApiContext";
import Navigator from "@/components/Navigator";
import { useContext } from "react";
import { server } from "../../../../utlits";
import Link from "next/link";

const page = () => {
  const context = useContext(ApiContextProvider);
  return (
    <div className="md:flex-row-reverse md:flex">
      <Navigator />
      {context?.lessons?.map((e: any) => (
        <div className="md:w-full pt-3 pb-20" key={e?.id}>
          <div className="px-2 pb-10 text-end">
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
                  <strong>{e?.title}</strong>
                </div>
              </div>
            </div>
            <hr className="my-2" />
            <div className="text-end">
              <small className="text-red-400 text-end">
                ملحوظة: لو كان الفديو حجمة كبير يجب عليك الانتظار بضع دقائق
              </small>
            </div>
            <hr className="my-2" />
            <video controls autoPlay>
              <source src={server + e?.video} />
            </video>
            <p className="mt-3">{e?.description}</p>
            <hr className="my-2" />
            <div className="flex flex-col gap-1">
              <strong>الملفات المرفقة</strong>
              <Link className="text-sky-500" href={server + e?.file}>
                أضغط لتري الملف
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default page;
