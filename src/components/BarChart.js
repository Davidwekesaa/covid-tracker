import React,{useState} from 'react'
import {Line} from "react-chartjs-2"
import {Chart as Chartjs} from "chart.js/auto"
import 'chartjs-adapter-date-fns';
 

function BarChart({chartData,opt,history,covidHistory,covidHistoryDeaths,covidHistoryTests}) {
    // const [covidHistory, setCovidHistory] = useState(history?{
    //     labels: history?.response?.map((data) => data.time),
    //     datasets: [
    //       {
    //         label: "Cases",
    //         data: history?.response?.map((data) => data.cases.total),
    //       },
    //     ],
    //   } : []);
    //   const [covidHistoryDeaths, setCovidHistoryDeaths] = useState({
    //     labels: history?.response?.map((data) => data.time),
    //     datasets: [
    //       {
    //         label: "Cases",
    //         data: history?.response?.map((data) => data.deaths.total),
    //       },
    //     ],
    //   });
    
    //   const [covidHistoryTests, setCovidHistoryDeathsTests] = useState({
    //     labels: history?.response?.map((data) => data.time),
    //     datasets: [
    //       {
    //         label: "Tests",
    //         data:history?.response?.map((data) => data.tests.total),
    //       },
    //     ],
    //   });
  return <>
  <div className='chatsss'>
  <Line data={covidHistory} options={opt} className="cth"/>
  <Line data={covidHistoryDeaths} options={opt} className="cth"/>
  <Line data={covidHistoryTests} options={opt} className="cth"/>
  </div>
  
  
  </>
}

export default BarChart