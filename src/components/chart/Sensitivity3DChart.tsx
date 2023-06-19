import {FC} from "react";
import Plot from 'react-plotly.js';
import  {Data} from 'plotly.js';

interface Props{
    sko: number[][]
    mus: number[][]
    time: number[]

}
const Sensitivity3DChart:FC<Props> = ({sko, mus,time}) => {
    const data: Data[] = [];
    let skok = []
    const skoK = []
    let musk = []
    const musK = []
    console.log("sko",sko)
    for(let i=0; i < sko[0].length; i++){
        for(let j=0; j < sko.length; j++){
                skok.push(sko[j][i])
                musk.push(mus[j][i])
        }
        skoK.push(skok)
        skok = []
        musK.push(musk)
        musk = []
    }

    console.log("skoK",skoK)

    const colors = [
        '#FF5733', '#b0745c', '#ff008c', '#FFFF00', '#1E90FF',
        '#8B4513', '#2E8B57', '#6A5ACD', '#228B22', '#FF6347',
        '#006400', '#8B008B', '#8B0000', '#9400D3', '#FF00FF',
        '#00FF7F', '#3CB371', '#00FF00', '#FFD700', '#40E0D0',
    ];

    for(let i=0; i < skoK.length; i++){
        let trace: Data = {
            type: 'scatter3d',
            x: skoK[i],
            y: time,
            z: musK[i],
            name: `k${i + 1}`,
            marker: {
                size: 0.01,
                color:colors[i],
                line: {
		        width: 40},
		        opacity: 0.8}
        }
        data.push(trace)
    }



  const layout = {
      title: 'График зависимости абсолютного среднего значения от стандартного отклонения по времени',
      showlegend: true,
      autosize: true,
      width: 800,
      height: 600,
      scene: {
          xaxis: {title: '𝜎, -'},
          yaxis: {title: 'Время, с'},
          zaxis: {title: '𝜇∗, -'}
      }
  };
    return (
      <Plot
        data={data}
        layout={layout}
      />
    );
};
export default Sensitivity3DChart