'use client'

import { createContext, useEffect, useState } from "react"
import { server } from "../../utlits"
import { usePathname, useSearchParams } from "next/navigation"

const ApiContext = (props) => {

    const [loading, setLoading] = useState(false)


    // CHECKLOGIN
    // CHECKLOGIN
    // CHECKLOGIN
    const [loginRequired, setLoginRequired] = useState()
    useEffect(() => {
        !localStorage?.getItem('phone') ? setLoginRequired(true) : setLoginRequired(false)
    }, [])



    // LEVELS
    // LEVELS
    // LEVELS
    const [levels, setlevels] = useState([])
    const getLevels = async () => {
        await fetch(`${server}get_levels/`)
        .then((e) => e.json())
        .then((e) => setlevels(e))
    }

    useEffect(() => {
        getLevels()
    },[])





    // LOGIN
    // LOGIN
    // LOGIN
    const [phonelogin, setphonelogin] = useState('')
    const [passwordlogin, setpasswordlogin] = useState('')

    const login = async () => {
        setLoading(true)
        await fetch(`${server}log_in/`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                phone:phonelogin,
                password:passwordlogin,
            })
        })
        .then((e) => e.json())
        .then((e) => {
            setLoading(false)
            if(e.error){
                alert(e.error)
                setLoading(false)
            }if(e.success){
                setLoading(false)
                alert(e.success)
                localStorage.setItem('phone', phonelogin)
                window.location.reload()
            }
        })
    }


    // SIGNUP
    // SIGNUP
    // SIGNUP
    const [name, setname] = useState('')
    const [phone, setphone] = useState('')
    const [password, setpassword] = useState('')
    const [password2, setpassword2] = useState('')
    const [level, setlevel] = useState('')

    const signup = async () => {
        setLoading(true)
        await fetch(`${server}sign_up/`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                name:name,
                phone:phone,
                password:password,
                password2:password2,
                level:level,
            })
        })
        .then((e) => e.json())
        .then((e) => {
            setLoading(true)
            if(e.error){
                alert(e.error)
            }if(e.success){
                alert(e.success)
                localStorage.setItem('phone', phone)
                window.location.reload()
            }
        })
    }
    



    // STUDENT
    // STUDENT
    // STUDENT
    const [student, setstudent] = useState([])

    const getStudent = async () => {
        await fetch(`${server}get_student/?phone=${localStorage?.getItem('phone')}`)
        .then((e) => e.json())
        .then((e) => setstudent(e))
    }

    useEffect(() => {
        localStorage?.getItem('phone') ? getStudent() : null
    },[student?.length])
    
    
    
    
    // HOMEWORK
    // HOMEWORK
    // HOMEWORK
    const params = useSearchParams()
    const [homeworks, sethomeworks] = useState([])

    const getHomeworks = async() => {
        await fetch(`${server}get_homework/?id=${params.get('id')||''}&level=${student?.level}`)
        .then((e) => e.json())
        .then((e) => {
            sethomeworks(e)
        })
    }

    
    useEffect(() => {
        student?.level ? getHomeworks() : null
    }, [student?.level, homeworks?.length, params.get('id'), student?.length])



    // HOMEWORK REVIEW
    // HOMEWORK REVIEW
    // HOMEWORK REVIEW
    const [reviewHomework, setReviewHomeWork] = useState([])
    const url = usePathname()
    const urlId = url?.split('/')[4]

    const getReviewHomework = async (id) => {
        await fetch(`${server}get_student_answers/?homework=${urlId?.split('%')[0]}&student=${student?.phone}`)
        .then((e) => e.json())
        .then((e) => setReviewHomeWork(e))
    }

    useEffect(() => {
        // student?.phone || urlId?.split('%')[0] || urlId ? getReviewHomework() : null
        url.includes('review') ? getReviewHomework() : null
    }, [urlId?.split('%')[0], urlId, url, url.includes('review'), reviewHomework?.length, student?.length])
    
    
    
    // LESSONS TITLE
    // LESSONS TITLE
    // LESSONS TITLE
    const [lessonsTitle, setLessonsTitle] = useState([])
    
    const getLessonsTitle = async () => {
        await fetch(`${server}get_lessons_names/?level=${student?.level}`)
        .then((e) => e.json())
        .then((e) => setLessonsTitle(e.names))
    }
    
    useEffect(() => {
        student?.level ? getLessonsTitle() : null
    }, [student?.length])
    
    

    // LESSONS
    // LESSONS
    // LESSONS
    const [lessons, setLessons] = useState([])
    const [lessonsTitleParam, setlessonsTitleParam] = useState('')
    
    const getLessons = async () => {
        await fetch(`${server}get_lessons/?level=${student?.level}&id=${params.get('id')||''}&name=${lessonsTitleParam}`)
        .then((e) => e.json())
        .then((e) => setLessons(e))
    }
    
    useEffect(() => {
        student?.level ? getLessons() : null
    }, [student?.length, student?.level, params.get('id'), lessons?.length, url.length, url, lessonsTitleParam, lessonsTitleParam?.length])
    
    


    

    // MEDIA
    // MEDIA
    // MEDIA
    const [medias, setMedias] = useState([])
    
    const getMedias = async () => {
        setLoading(true)
        await fetch(`${server}get_media/?level=${student?.level}&id=${params.get('id')||''}`)
        .then((e) => e.json())
        .then((e) => {
            setLoading(false)
            setMedias(e)
        })
    }
    
    useEffect(() => {
        student?.level ? getMedias() : null
    }, [student?.length, student?.level, params.get('id'), lessons?.length, url.length, url])




    // TOTAL INFOS
    // TOTAL INFOS
    // TOTAL INFOS
    const [infos, setInfos] = useState({})

    const getInfos = async () => {
        await fetch(`${server}get_total_infos/?level=${student?.level}&phone=${student?.phone}`)
        .then((e) => e.json())
        .then((e) => setInfos(e.data))
    }

    useEffect(() => {
        student?.level || student?.phone ? getInfos() : null
    }, [student?.length])

    
  return (
    <ApiContextProvider.Provider value={{
        homeworks,
        loginRequired,
        getHomeworks,

        // sign up
        signup, setname, setpassword, setphone, setpassword2,
        setlevel,

        // log in
        login, setphonelogin, setpasswordlogin,

        // levels
        levels,

        // student
        student,

        // homework_review
        reviewHomework,

        // lessons
        lessons,
        lessonsTitle,
        setlessonsTitleParam,

        // media
        medias,


        // laoding
        loading,
        setLoading,


        // infos
        infos,

    }}>
        {props.children}
    </ApiContextProvider.Provider>
  )
}

export default ApiContext
export const ApiContextProvider = createContext()