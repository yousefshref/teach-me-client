import Link from "next/link";
import { server } from "../../utlits";
import { useState, useEffect, useContext } from "react";
import { useSearchParams } from "next/navigation";
import { ApiContextProvider } from "@/Context/ApiContext";

const HomeWork = ({ homework }: any) => {
  const context = useContext(ApiContextProvider);
  const params = useSearchParams();
  const [not, setnot] = useState<any>();

  const exist = async () => {
    await fetch(
      `${server}get_homework_answer/?homework=${homework?.id}&student=${
        localStorage?.getItem("phone") || ""
      }`
    )
      .then((e) => e.json())
      .then((e) => {
        if (e?.notthere) {
          setnot(true);
        }
        if (e?.thereis) {
          setnot(false);
        }
      });
  };
  useEffect(() => {
    homework?.id ? exist() : null;
  }, [homework?.id, context?.homeworks?.length, params.get("id")]);
  return homework?.publish ? (
    <Link
      href={{
        pathname: not ? `/home_work/${Math.random()}/${homework?.title?.replace(
          / /g,
          "-"
        )}` : `/homework/${homework?.title?.replace(
          / /g,
          "-"
        )}/review/${homework?.id}`,
        query:{
          id: homework?.id
        }
      }}
      className="
                homework text-end border p-1 rounded-md transition-all cursor-pointer
                hover:from-orange-100 hover:to-rose-100 hover:bg-gradient-to-r hover:shadow-lg hover:rounded-2xl hover:pe-5
                "
      key={homework?.id}
    >
      <h3>{homework?.title}</h3>
      <p className="text-sm">{`عدد الاسئلة: ${homework?.questions?.length}`}</p>
      {
        not ? <small className="text-red-500">لم تكتب الواجب بعد, اضغط لتنهي الواجب</small> : <small className="text-green-500">تم الحل سابقا, اضغط لتعرف التفاصيل</small>
      }
      <p className="text-sm">{homework?.date}</p>
    </Link>
  ) : null;
};

export default HomeWork;
