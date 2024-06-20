import React, { useEffect, useState } from 'react'
import axios from 'axios'
import SelectedMonthBarChart from './SelectedMonthBarChart'
import PieChart from './PieChart'

const allMonths=['selectMonth','Januart','Feburary',"March","April","May","Jun",'July',"August","September","October","November","December"]

function TranscictionStats({month}) {
    const [selectedMonthStats,setSelectedMonthStats]=useState({
        "sale":0,
        "sold":0,
        "notSold":0,
        "barChart":[],
        "pieChart":{}
    })
 
    useEffect(()=>{
        async function f(){
            const res=await axios.get('http://localhost:5000/slectedmonth',{'headers':{'month':month}})
            setSelectedMonthStats(res.data)
           

        }
        f()
    },[])
    
  return (<>
  <div className='monthlyStats'>
  <h1>{allMonths[month]+" "}Month Stats</h1>
  <h2>Total Sale:{selectedMonthStats.sale}</h2>
  <h2>Sold Items:{selectedMonthStats.sold}</h2>
  <h2>Unsld Items:{selectedMonthStats.notSold}</h2>
  </div>
    <div className='monthlyStats'>
    <h1>Bar Chart</h1>
    <SelectedMonthBarChart data={selectedMonthStats.barChart} month={allMonths[month]}/>
    </div>
    <div className='monthlyStats'>
    <h1>PieChart</h1>
    <PieChart data={selectedMonthStats.pieChart} month={allMonths[month]}></PieChart>
    </div>
  </>
  )
}

export default TranscictionStats
