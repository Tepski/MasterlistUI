import { useState, useEffect, useRef } from "react";
import { IApiData } from "@/interfaces";
import { FaCheck, FaX, FaEllipsisVertical } from "react-icons/fa6";
import { area_colors } from "./FormsChoices";
interface TableProps {
  fields: string[];
  sample: IApiData[];
  set: React.Dispatch<React.SetStateAction<IApiData[]>>;
  current: IApiData;
  openForm: boolean;
  setData: React.Dispatch<React.SetStateAction<IApiData>>;
  del: (
    id: string,
    setIsOpen: React.Dispatch<React.SetStateAction<number | null>>
  ) => void;
  edit: (
    item: IApiData,
    setIsOpen: React.Dispatch<React.SetStateAction<number | null>>
  ) => void;
}
const Table = (props: TableProps) => {
  const [isOpen, setIsOpen] = useState<number | null>(null);

  const rowRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleOpen = (id: number) => {
    setIsOpen((prev) => (prev === id ? null : id));
  };

  const handleShowItem = (item: IApiData): boolean => {
    const filterList: string[] = [
      "ar_category",
      "area",
      "abnormality",
      "nature_of_abnormality",
      "affected_item",
    ];

    for (let name of filterList) {
      if (props.current[name] && !item[name].includes(props.current[name])) {
        if (!props.openForm) {
          props.setData({
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
            level: "Select Level",
            nature_of_abnormality: "",
            remarks: "",
            self_resolve_for_car: "",
            status: "",
          });
          return true;
        }
        return false;
      }
    }

    return true;
  };

  useEffect(() => {
    const handleMouseOutside = (e: MouseEvent) => {
      if (rowRef.current && !rowRef.current.contains(e.target as Node)) {
        setIsOpen(null);
      }
    };

    const handleMouseScroll = () => {
      setIsOpen(null);
    };

    document.addEventListener("mousedown", handleMouseOutside);
    scrollRef?.current?.addEventListener("scroll", handleMouseScroll);
    
    return () => {
      document.removeEventListener("mousedown", handleMouseOutside);
      scrollRef?.current?.removeEventListener("scroll", handleMouseScroll);
    };
  }, []);

  return (
    <div
      className="overflow-auto h-full w-full rounded-xl shadow-md shadow-black/50"
      style={{overflow: props.openForm ? "hidden" : "auto"}}
      ref={scrollRef}
    >
      <table className="min-w-full border-collapse border-b">
        <thead className=" bg-gray-200 shadow-md shadow-black/30 sticky top-0 z-10">
          <tr>
            {props?.fields?.map((item, index) => {
              return (
                <th
                  className={`text-xs font-bold px-4 text-start text-gray-500 min-w-36 ${
                    index == 0 && "ps-6"
                  }`}
                  key={index.toString()}
                >
                  {item}
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody>
          {props.sample &&
            props?.sample?.map((item, index) => {
              return (
                handleShowItem(item) && (
                  <tr
                    key={index.toString()}
                    className="border-b-[1px] text-xs text-center px-2 border-gray-300 hover:bg-gray-100 mt-40"
                  >
                    <td className="pr-4 pl-2 text-start pt-4 flex items-center gap-2 relative">
                      <FaEllipsisVertical
                        className="text-xl hover:cursor-pointer active:opacity-40 border-r-[1px] border-gray-400"
                        color="gray"
                        onClick={() => handleOpen(index)}
                      />
                      {isOpen == index && (
                        <div
                          className="absolute flex p-2 bg-white flex-col gap-2 left-8 shadow-md shadow-black/50 rounded-[5px] z-40"
                          ref={rowRef}
                        >
                          <div
                            className="hover:cursor-pointer hover:opacity-75"
                            onClick={() => props.edit(item, setIsOpen)}
                          >
                            Edit
                          </div>
                          <div
                            onClick={() =>
                              props.del(item.id.toString(), setIsOpen)
                            }
                            className="hover:cursor-pointer hover:opacity-75"
                          >
                            Delete
                          </div>
                        </div>
                      )}
                      {item?.link ? (
                        <a
                          // href={item.link}
                          onClick={() =>
                            alert("Link not working at the moment, sorry")
                          }
                          className="underline text-blue-500 underline-offset-4 hover:cursor-pointer"
                        >
                          Link to file
                        </a>
                      ) : (
                        <span>No link</span>
                      )}
                    </td>
                    <td className="px-4 text-start">{item.ar_no}</td>
                    <td className="px-4 text-start">{item.ar_category}</td>
                    <td className="px-4 text-start">
                      <span
                        style={{
                          backgroundColor: area_colors[item.area][0],
                          color: area_colors[item.area][1],
                        }}
                        className="py-1 px-4 text-white rounded-xl font-semibold"
                      >
                        {item.area}
                      </span>
                    </td>
                    <td className="px-4 text-start">{item.abnormality}</td>
                    <td className="px-4 text-start">
                      {item.nature_of_abnormality}
                    </td>
                    <td className="px-4 text-start">{item.affected_item}</td>
                    <td className="px-4 text-start">{item.level}</td>
                    <td className="px-4 text-start">{item.created}</td>
                    <td className="px-4 text-start">
                      {item.detection_process}
                    </td>
                    <td className="px-4 text-start">{item.function}</td>
                    <td className="px-4 text-start">{item.incharge}</td>
                    <td className="px-4 text-start">
                      {item.self_resolve_for_car}
                    </td>
                    <td className="px-4 text-start">{item.car_no}</td>
                    <td className="px-4 text-start">{item.status}</td>
                    <td className="px-4 text-start">{item.countermeasure}</td>
                    <td className="px-4 py-5">
                      {item.fanout ? (
                        <FaCheck color="green" />
                      ) : (
                        <FaX color="red" />
                      )}
                    </td>
                    <td className="px-4 text-start">
                      {item.remarks ? (
                        item.remarks
                      ) : (
                        <p className="italic text-gray-400">No Remarks</p>
                      )}
                    </td>
                    <td className="px-4 text-start">
                      {item.month ? item.month : "Not included yet"}
                    </td>
                    <td className="px-4 text-start">
                      {item.timestamp?.slice(0, 10)}
                    </td>
                  </tr>
                )
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
