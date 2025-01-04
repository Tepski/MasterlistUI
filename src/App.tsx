import Table from "./components/Table";
import { FaPlus } from "react-icons/fa";
import { useState, useEffect } from "react";
import Modal from "./components/Modal";
// import { sampleData } from "../sample_data";
import { IApiData } from "@/interfaces";
import { get, del } from "./api/api";

function App() {
  const [dummy, setDummy] = useState<IApiData[]>([]);
  const [editMode, setEditMode] = useState<boolean>(false);

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

  const [current, setCurrent] = useState<IApiData>({
    link: "",
    id: 0,
    ar_no: "",
    car_no: "",
    abnormality: "",
    affected_item: "",
    ar_category: "",
    area: "",
    countermeasure: "",
    created: "",
    detection_process: "",
    fanout: false,
    function: "",
    incharge: "",
    level: 1,
    nature_of_abnormality: "",
    remarks: "",
    self_resolve_for_car: "",
    status: "",
  });

  const handleDelete = async (
    id: string,
    setIsOpen: React.Dispatch<React.SetStateAction<number | null>>
  ) => {
    await del(id);
    setIsOpen(null);
    getData();
  };

  const handleEdit = async (
    item: IApiData,
    setIsOpen: React.Dispatch<React.SetStateAction<number | null>>
  ) => {
    setCurrent((prev) => ({ ...prev, ...item }));
    setOpenForm(true);
    setIsOpen(null);
    setEditMode(true);
  };

  const getData = async () => {
    let res = (await get("get_data")) as IApiData[];
    setDummy(res);

    console.log(res);
  };

  useEffect(() => {
    getData();
  }, []);

  const [openForm, setOpenForm] = useState(false);

  return (
    <div className={`w-[100vw] h-[100vh] flex justify-center items-center `}>
      <Table
        fields={fields}
        sample={dummy}
        set={setDummy}
        current={current}
        openForm={openForm}
        setData={setCurrent}
        del={handleDelete}
        edit={handleEdit}
      />
      {/* bg-[rgba(0,0,0,0.3)] */}
      {openForm ? (
        <div
          className={`flex h-full w-full absolute bg-[rgba(0,0,0,0.1)] justify-end  items-end z-20 animate-in ease-in-out duration-100`}
        >
          <Modal
            setOpen={setOpenForm}
            set={setDummy}
            current={current}
            setCurrent={setCurrent}
            data={dummy}
            editMode={editMode}
            setEdit={setEditMode}
          />
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
