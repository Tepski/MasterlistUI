import Table from "./components/Table";
import { FaPlus } from "react-icons/fa";
import { useState, useEffect } from "react";
import Modal from "./components/Modal";
// import { sampleData } from "../sample_data";
import { IData } from "@/interfaces";
import { get } from "./api/api";

function App() {
  const [dummy, setDummy] = useState<IData[]>([]);

  const fields: string[] = [
    "LINK",
    "AR NO.",
    "AR CATEGORY",
    "AREA",
    "ABNORMALITY",
    "NATURE OF ABNORMALITY",
    "AFFECTED ITEM",
    "LEVEL",
    "DATE REPORTED",
    "DETECTION PROCESS",
    "FUNCTION",
    "IN-CHARGE",
    "SELF RESOLVE/CAR",
    "CAR #",
    "STATUS",
    "COUNTERMEASURE LOT",
    "FANOUT?",
    "REMARKS",
    "month",
    "timestamp",
  ];

  const getData = async () => {
    let res = (await get("get_data")) as IData[];
    setDummy(res);

    console.log(res);
  };

  useEffect(() => {
    getData();
  }, []);

  const [openForm, setOpenForm] = useState(false);

  return (
    <div className={`w-[100vw] h-[100vh] flex justify-center items-center `}>
      <Table fields={fields} sample={dummy} set={setDummy} />
      {/* bg-[rgba(0,0,0,0.3)] */}
      {openForm ? (
        <div
          className={`flex h-full w-full absolute justify-end bg-[rgba(0,0,0,0.05)] items-end z-20 animate-in ease-in-out duration-100`}
        >
          <Modal setOpen={setOpenForm} set={setDummy} />
        </div>
      ) : (
        <div
          className={`absolute bottom-10 right-10 shadow-md border-2 bg-white border-gray-400 shadow-black/30 p-2 rounded-2xl hover:cursor-pointer active:scale-95 transition-all ease-linear duration-100`}
          onClick={() => setOpenForm((prev) => !prev)}
        >
          <FaPlus color={"gray"} className={`text-4xl aspect-square`} />
        </div>
      )}
    </div>
  );
}

export default App;
