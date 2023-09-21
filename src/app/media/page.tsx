'use client'
import { ApiContextProvider } from "@/Context/ApiContext"
import Link from "next/link"
import { useContext } from "react"
import { server } from "../../../utlits"
import LoadingComponent from "@/components/LoadingComponent"
import RenewRequeired from "@/components/RenewRequeired"
import Navigator from "@/components/Navigator"

const page = () => {
  const context = useContext(ApiContextProvider)

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
                <strong>اهم الملفات</strong>
              </div>
            </div>
          </div>
          <br />
          <div className="medias flex flex-col gap-4 text-end">
            {
              context?.medias?.map((e:any) => (
                <Link className="media border transition-all flex flex-col gap-2 border-red-300 p-2 hover:rounded-3xl hover:pe-6" href={server+e?.file} key={e?.id}>
                  <strong>{e?.title}</strong>
                  <small>{e?.description}</small>
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