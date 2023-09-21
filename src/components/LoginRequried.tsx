"use client";
import { ApiContextProvider } from "@/Context/ApiContext";
import { TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useState, useContext } from "react";

const LoginRequried = () => {
  const [login, setlogin] = useState<any>(true);
  const context = useContext(ApiContextProvider)
  return (
    <div className="login z-20 bg-neutral-600 bg-opacity-50 h-[100vh] flex flex-col justify-center p-5 absolute left-[50%] translate-x-[-50%] shadow-2xl w-[100%] top-[50%] translate-y-[-50%]">
      {!login ? (
        <div className="bg-white p-6 rounded-md">
          <div className="flex justify-center">
            <h3 className="text-lg text-center">
              أهلا بك في منصتنا, يرجي تسجيل الدخول لتتفاعل معنا
            </h3>
          </div>
            <hr className="my-3" />
          <div className="text-center text-sm flex flex-row gap-3 justify-center my-3 border border-rose-400 p-1 pb-2">
            <h3 onClick={() => setlogin(false)} className={`cursor-pointer ${!login ? 'border-b-2 border-red-700' : ''}`}>
              تسجيل الدخول
            </h3>
            <h3 onClick={() => setlogin(true)} className={`cursor-pointer ${login ? 'border-b-2 border-red-700' : ''}`}>
              انشاء حساب جديد
            </h3>
          </div>
          <div className="flex flex-col gap-5 text-end">
            <div className="flex flex-col gap-2">
              <label>رقم هاتفك</label>
              <TextField onChange={(e:any) => context?.setphonelogin(e.target?.value)} placeholder="رقم الهاتف" variant="filled" />
            </div>
            <div className="flex flex-col gap-2">
              <label>كلمة المرور</label>
              <TextField onChange={(e:any) => context?.setpasswordlogin(e.target?.value)} placeholder="كلمة المرور" variant="filled" />
            </div>
            <div className="flex flex-col gap-2">
              <button onClick={context?.login}>سجل الدخول</button>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white px-6 rounded-md h-[100vh] flex flex-col justify-center">
          <div className="flex justify-center">
            <h3 className="text-center">
              أهلا بك في منصتنا, يرجي تسجيل الدخول لتتفاعل معنا
            </h3>
          </div>
            <hr className="my-3" />
          <div className="text-center text-sm flex flex-row gap-3 justify-center my-3 border border-rose-400 p-1 pb-2">
            <h3 onClick={() => setlogin(false)} className={`cursor-pointer ${!login ? 'border-b-2 border-red-700' : ''}`}>
              تسجيل الدخول
            </h3>
            <h3 onClick={() => setlogin(true)} className={`cursor-pointer ${login ? 'border-b-2 border-red-700' : ''}`}>
              انشاء حساب جديد
            </h3>
          </div>
          <div className="flex flex-col gap-5 text-end">
            <div className="flex flex-col gap-2">
              <label>اكتب اسمك بالكامل</label>
              <input onChange={(e:any) => context?.setname(e.target.value)} placeholder="الاسم" className="border border-neutral-700" />
            </div>
            <div className="flex flex-col gap-2">
              <label>اكتب رقم هاتفك</label>
              <input onChange={(e:any) => context?.setphone(e.target.value)} placeholder="رقم الهاتف"  className="border border-neutral-700" />
            </div>
            <div className="flex flex-col gap-2">
              <label>كلمة المرور</label>
              <input onChange={(e:any) => context?.setpassword(e.target.value)} placeholder="كلمة المرور"  className="border border-neutral-700" />
            </div>
            <div className="flex flex-col gap-2">
              <label>تأكيد كلمة المرور</label>
              <input onChange={(e:any) => context?.setpassword2(e.target.value)} placeholder="تأكيد كلمة المرور"  className="border border-neutral-700" />
            </div>
            <div className="flex flex-col gap-2 text-end">
              <label className="text-end">أختر مرحلتك التعليمية</label>
                {/* <select className="text-end">
                    <option>أختر مرحلتك التعليمية</option>
                    {
                        context?.levels?.map((e:any) => (
                            <option key={e?.id} value={e?.id}>{e?.name}</option>
                        ))
                    }
                </select> */}
                <FormControl fullWidth>
                <InputLabel 
                    className="text-end justify-end flex flex-row"
                    id="demo-simple-select-label"
                >المرحلة التعليمية</InputLabel>
                <Select onChange={(e:any) => context?.setlevel(e.target.value)}>
                    {
                        context?.levels?.map((e:any) => (
                            <MenuItem value={e?.id} key={e?.id}>{e?.name}</MenuItem>
                        ))
                    }
                </Select>
                </FormControl>
            </div>
            <div className="flex flex-col gap-2">
              <button onClick={context?.signup}>انشئ الحساب</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginRequried;
