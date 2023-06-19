import {ITableData} from "./ITableData";

export interface IResultData{
    input_data: ITableData
    result: string
    time: string
    experimental_point: string
    error_exp_point: string
    runtime: number
}