export interface ITableData {
    initialTime: number,
    time: number,
    step: number
    method: string
    matrixStechiometricCoefficients: number[][];
    matrixIndicators: number[][];
    experimentalData: number[][];
    constantsSpeed: number[][];
}