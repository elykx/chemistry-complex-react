import {ITableData} from "./ITableData";

export interface IResultNumber{
    input_data: ITableData
    result: number[][]
    time: number[]
    experimental_point: number[][]
}