import { IApiData } from "../interfaces";
import React, { FormEvent, useState, useEffect } from "react";
import { get, post } from "../api/api";
import {
  area_choices,
  SRorCAR,
  category_choices,
  status,
} from "./FormsChoices";

const Modal = ({
  setOpen,
  set,
  current,
  setCurrent,
  data,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  set: React.Dispatch<React.SetStateAction<IApiData[]>>;
  current: IApiData;
  setCurrent: React.Dispatch<React.SetStateAction<IApiData>>;
  data: IApiData[];
}) => {
  const handleChange = (e: FormEvent) => {
    const target = e.target as HTMLInputElement;

    if (target.type === "checkbox") {
      setCurrent({ ...current, [target.name]: target.checked });
      return;
    }

    console.log(checkReoccurence(current) ? "RE" : "OC");

    setCurrent({ ...current, [target.name]: target.value });
  };

  const checkReoccurence = (current: IApiData) => {
    let filteredList = [
      "ar_category",
      "area",
      "abnormality",
      "nature_of_abnormality",
      "affected_item",
    ];

    let reoccurence: boolean = true;

    for (let item of data) {
      for (let name of filteredList) {
        if (current[name] && item[name] == current[name]) {
          reoccurence = false;
        }
      }
    }

    return reoccurence;
  };

  const setData = async (
    data: IApiData
  ): Promise<IApiData | undefined | unknown> => {
    try {
      let res = await post("set_data/", data);
      return res;
    } catch (error) {
      console.log(error);
      alert("An error occured");
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res: any = await setData(current);

      set((prev) => [...prev, res]);

      setOpen((prev) => !prev);
    } catch (error) {
      alert("An error occured");
    }
  };

  const [apiData, setApiData] = useState<IApiData[]>([]);

  const getData = async () => {
    const data = (await get("get_data")) as IApiData[];
    setApiData(data);
    console.log(apiData);
  };

  useEffect(() => {
    getData;
  }, []);

  return (
    <div className="w-auto h-auto rounded-xl relative bg-white flex justify-center items-center border-2 border-gray-500">
      <form onSubmit={() => console.log("ASD")}>
        <div className="grid grid-cols-6 gap-4 m-10 mx-30">
          <label className="flex flex-col">
            <p>AR CATEGORY:</p>
            <select
              defaultValue={"Select Category"}
              onChange={(e) => handleChange(e)}
              name="ar_category"
              className="border-[1px] border-gray-300 rounded p-2"
            >
              <option value="Select Category" disabled>
                Select Category
              </option>
              {category_choices.map((cath, index) => {
                return (
                  <option value={cath} key={index.toString()}>
                    {cath}
                  </option>
                );
              })}
            </select>
          </label>
          <label className="flex flex-col">
            <p>AREA:</p>
            <select
              onChange={(e) => handleChange(e)}
              name="area"
              className="border-[1px] border-gray-300 rounded p-2"
              defaultValue={"Select Area"}
            >
              <option value="Select Area" disabled>
                Select Area
              </option>
              {area_choices.map((area, index) => {
                return (
                  <option value={area} key={index.toString()}>
                    {area}
                  </option>
                );
              })}
            </select>
          </label>
          <label className="flex flex-col">
            <p>ABNORMALITY:</p>
            <input
              onChange={(e) => handleChange(e)}
              type="text"
              name="abnormality"
              className="border-[1px] border-gray-300 rounded p-2"
            />
          </label>
          <label className="flex flex-col">
            <p>NATURE OF ABNORMALITY:</p>
            <input
              onChange={(e) => handleChange(e)}
              type="text"
              name="nature_of_abnormality"
              className="border-[1px] border-gray-300 rounded p-2"
            />
          </label>
          <label className="flex flex-col">
            <p>AFFECTED ITEM:</p>
            <input
              onChange={(e) => handleChange(e)}
              type="text"
              name="affected_item"
              className="border-[1px] border-gray-300 rounded p-2"
            />
          </label>
          <label className="flex flex-col">
            <p>LEVEL:</p>
            <select
              onChange={(e) => handleChange(e)}
              name="level"
              className="border-[1px] border-gray-300 rounded p-2"
              defaultValue={"Select Level"}
            >
              <option value="Select Level" disabled>
                Select Level
              </option>
              <option value="One">1</option>
              <option value="Two">2</option>
            </select>
          </label>
          <label className="flex flex-col">
            <p>DATE REPORTED:</p>
            <input
              onChange={(e) => handleChange(e)}
              type="date"
              name="created"
              className="border-[1px] border-gray-300 rounded p-2"
            />
          </label>
          <label className="flex flex-col">
            <p>DETECTION PROCESS:</p>
            <input
              onChange={(e) => handleChange(e)}
              type="text"
              name="detection_process"
              className="border-[1px] border-gray-300 rounded p-2"
            />
          </label>
          <label className="flex flex-col">
            <p>FUNCTION:</p>
            <input
              onChange={(e) => handleChange(e)}
              type="text"
              name="function"
              className="border-[1px] border-gray-300 rounded p-2"
            />
          </label>
          <label className="flex flex-col">
            <p>IN-CHARGE:</p>
            <input
              onChange={(e) => handleChange(e)}
              type="text"
              name="incharge"
              className="border-[1px] border-gray-300 rounded p-2"
            />
          </label>
          <label className="flex flex-col">
            <p>SELF RESOLVE/CAR:</p>
            <select
              defaultValue={"Select Method"}
              onChange={(e) => handleChange(e)}
              name="self_resolve_for_car"
              className="border-[1px] border-gray-300 rounded p-2"
            >
              <option value="Select Method" disabled>
                Select Method
              </option>
              {SRorCAR.map((item, index) => {
                return (
                  <option value={item} key={index.toString()}>
                    {item}
                  </option>
                );
              })}
            </select>
          </label>

          <label className="flex flex-col">
            <p>STATUS:</p>
            <select
              defaultValue={"Select Status"}
              onChange={(e) => handleChange(e)}
              name="status"
              className="border-[1px] border-gray-300 rounded p-2"
            >
              <option value="Select Status" disabled>
                Select Status
              </option>
              {status.map((stat, index) => {
                return (
                  <option value={stat} key={index.toString()}>
                    {stat}
                  </option>
                );
              })}
            </select>
          </label>
          <label className="flex flex-col">
            <p>COUNTERMEASURE:</p>
            <input
              onChange={(e) => handleChange(e)}
              type="text"
              name="countermeasure"
              className="border-[1px] border-gray-300 rounded p-2"
            />
          </label>
          <label className="flex h-full flex-row justify-center gap-4 items-center border-r-[1px] border-gray-500">
            <p>FANOUT?</p>
            <input
              onChange={(e) => handleChange(e)}
              type="checkbox"
              name="fanout"
              className="border-[1px] border-gray-300 rounded p-2"
            />
          </label>

          <label className="flex flex-col col-span-4">
            <p className="text-gray-500">REMARKS:</p>
            <textarea
              rows={3}
              style={{ resize: "none" }}
              name="remarks"
              onChange={(e) => handleChange(e)}
              className="border-[1px] border-gray-300 rounded p-2"
            />
          </label>
        </div>

        <div className="p-4 bottom-0 right-0 left-0 flex justify-end items-end gap-4 border-t-[2px] border-gray-300">
          <p
            onClick={() => setOpen((prev) => !prev)}
            className="border-[1px] border-black rounded-xl px-4 py-1 bg-white shadow-md shadow-black/30 hover:cursor-pointer active:scale-95"
          >
            Close
          </p>
          <button
            onClick={handleSubmit}
            className="rounded-xl bg-black py-1 px-4 text-white font-semibold border-[1px] shadow-md shadow-black/30 border-black hover:cursor-pointer active:scale-95"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Modal;
