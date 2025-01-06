export interface IApiData {
  link: string | null,
  id: number,
  ar_no: string | null,
  car_no: string | null,
  area: string;
  ar_category: string;
  abnormality: string,
  nature_of_abnormality: string;
  affected_item: string;
  level: string;
  created: string;
  detection_process: string;
  function: string;
  incharge: string;
  self_resolve_for_car: string;
  status: string;
  countermeasure: string;
  fanout: boolean;
  remarks: string;
  [key: string]: any
}