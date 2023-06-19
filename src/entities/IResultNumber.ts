import {ITableData} from "./ITableData";

export interface IResultNumber{
    input_data: ITableData
    result: number[][]
    time: number[]
    experimental_point: number[][]
    error_exp_point: number[][]
    runtime: number
}