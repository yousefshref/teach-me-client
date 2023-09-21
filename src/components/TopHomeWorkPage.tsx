"use client";
import { ApiContextProvider } from "@/Context/ApiContext";
import Image from "next/image";
import { useContext } from "react";
import Rating from "@mui/material/Rating";

const TopHomeWorkPage = () => {
  const context = useContext(ApiContextProvider);
  return (
    <div className="top lg:justify-center lg:gap-10 flex flex-col gap-5 w-[100%] md:flex md:flex-row-reverse md:justify-between md:px-3">
      <div
        className="results
            from-orange-50 to-red-100 bg-gradient-to-t p-3
            rounded-lg shadow-md
            "
      >
        <span
          className="
                  w-auto flex justify-center
                "
        >
          <Image
            alt=""
            className="w-[200px]"
            width={700}
            height={700}
            src={"/resutls_png.png"}
          />
        </span>
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
            <h3>:اجمالي الامتحانات المحلولة</h3>
            <h3>{context?.infos?.total_answerd_hms}</h3>
          </div>
          <div
            className="
                flex gap-3 flex-row-reverse justify-center
                "
          >
            <h3>:تقييم المدرس لك</h3>
            <h3>
              <Rating
                readOnly
                value={context?.student?.review ? context?.student?.review : 1}
              />
            </h3>
          </div>
        </div>
      </div>
      <div
        className="restof 
            from-sky-50 to-purple-100 bg-gradient-to-b p-3
            rounded-lg shadow-md relative md:flex z-10 overflow-hidden
            md:flex-col md:justify-center

            "
      >
        <span
          className="
                  w-auto flex justify-end absolute left-0 top-[-7px]
                  md:relative md:my-auto md:justify-center md:flex md:flex-col
                "
        >
          <Image
            alt=""
            className="w-[100px] opacity-80 md:w-[200px]"
            width={700}
            height={700}
            src={
              context?.infos?.didnt_answerd == 0 ? "/rest.png" : "/homework.png"
            }
          />
        </span>
        <div
          className="
              text-center flex flex-col gap-2 md:flex
              "
        >
          <div
            className="
                flex gap-3 flex-row-reverse justify-start
                "
          >
            <h3 className="md:text-center">
              {context?.infos?.didnt_answerd == 0
                ? "لا يوجد اي امتحانات حاليا"
                : ":الامتحانات المؤجلة"}
            </h3>
            <h3 className="md:text-center">
              {context?.infos?.didnt_answerd == 0
                ? null
                : context?.infos?.didnt_answerd}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopHomeWorkPage;
