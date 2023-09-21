'use client'
import { useContext } from "react"
import { ApiContextProvider } from "@/Context/ApiContext"

const LessonsFilter = () => {
    const context = useContext(ApiContextProvider)
    return (
        <div className="filter text-end">
            <h3 className="text-end border rounded-lg p-2 from-blue-50 mb-2 to-red-50 bg-gradient-to-tl">فلتر الدروس</h3>
            <div className="flex flex-col gap-2">
                <strong>اختر اسم الدرس -</strong>
                <select onChange={(e) => context?.setlessonsTitleParam(e.target.value)} className="text-end border border-red-300 p-1">
                    <option value={''}>أختر</option>
                    {
                        context?.lessonsTitle?.map((e) => (
                            <option value={e} key={e}>{e}</option>
                        ))
                    }
                </select>
            </div>
        </div>
    )
}

export default LessonsFilter