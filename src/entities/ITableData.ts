import {ITableParameters} from "./ITableParameters";

export interface ITableData {
    table_parameters: ITableParameters
    initial_time: number,
    time: number,
    step: number
    method: string
    matrix_stechiometric_coefficients: number[][]
    matrix_indicators: number[][]
    experimental_data: number[][]
    constants_speed: number[][]
}