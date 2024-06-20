import React from 'react'
const options = {
  chart: {
    title: "BarChartStats",
    subtitle: "Sales, Expenses, and Profit: 2014-2017",
  },
};
import { Chart } from "react-google-charts";
export default function SelectedMonthBarChart({data,month}){
  const options = {
    chart: {
      title: "BarChartStats",
      subtitle: `${month} Selected from Drop down`,
    },
  };
 
  return (
    <Chart
      chartType="Bar"
      width="100%"
      height="400px"
      data={data}
      options={options}
      
    />
  );

}