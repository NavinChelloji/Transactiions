import React from 'react'
import { Chart } from "react-google-charts";

function PieChart({data,month}) {
    let cat=[["categeory","count"]]
    for(let i in data){
        cat.push([i,data[i]])
    }
    const options = {
        title:`CategeoryStats of ${month}`,
        is3D: true,
      };
  return (
    <Chart
      chartType="PieChart"
      data={cat}
      options={options}
      width={"100%"}
      height={"400px"}
    />
  )
}

export default PieChart