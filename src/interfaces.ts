export interface IData {
    link: string | null;
    ar_no: string | null;
    ar_category: string;
    area: string;
    abnormality: string;
    nature_of_abnormality: string;
    affected_item: string;
    level: number;
    created: string;
    detection_process: string;
    function: string;
    incharge: string;
    self_resolve_for_car: string;
    car_no: string | null;
    status: string;
    countermeasure: string;
    fanout: boolean;
    remarks: string;
    month: number | null;
    timestamp: string | null;
    [key:string]: any,
  }

export interface IApiData {
  area: string;
  ar_category: string;
  abnormality: string,
  nature_of_abnormality: string;
  affected_item: string;
  level: number;
  created: string;
  detection_process: string;
  function: string;
  incharge: string;
  self_resolve_for_car: string;
  status: string;
  countermeasure: string;
  fanout: boolean;
  remarks: string;
}