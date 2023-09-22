import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

import { Evaluation, Kpis } from "../types";
import axiosInstance from "../../../../utils/interceptor";
import DoghnutChart from "./DoghnutChart";
import PieChart from "./PieChart";
import PolarAreaChart from "./PolarAreaChart";


interface Props {
  evaluation?:Evaluation[]
}
const layouts = {
    lg: [
      { i: "1", x: 0, y: 0, w: 1, h: 1 },
      { i: "2", x: 1, y: 0, w: 1, h: 1 },
      { i: "3", x: 2, y: 0, w: 1, h: 1 },

    ],
    md: [
        { i: "1", x: 0, y: 0, w: 1, h: 1 },
        { i: "2", x: 2, y: 0, w: 1, h: 1 },
        { i: "3", x: 0, y: 1, w: 1, h: 1 },

    ],
    sm: [
      { i: "1", x: 0, y: 0, w: 1, h: 1 },
      { i: "2", x: 0, y: 1, w: 1, h: 1 },
      { i: "3", x: 0, y: 2, w: 1, h: 1 },

    ],
  };


const ResponsiveGridLayout = WidthProvider(Responsive);

const GridLayout = ({evaluation}:Props) => {

   
const {data:managerData,isLoading:managerLoading}=useQuery(['getManagers'],()=>{
    return axiosInstance.get('/dashboard/managers')
},{
    select:(data)=>data.data.data
})


  const {data:projectData,isLoading,isError,error}=useQuery(['getProjects'],()=>{
    return axiosInstance.get('/dashboard/projectsTime')
},{
    select:(data)=>data.data.data
})



 
  return (
    <ResponsiveGridLayout
      className="layout bg-neutral-100 gap-10"
      layouts={layouts}
      breakpoints={{ lg: 1200, md: 700, sm: 400, xs: 300, xxs: 0 }}
      cols={{ lg: 3, md: 2, sm: 1, xs: 1, xxs: 1 }}
      onBreakpointChange={(newBreakpoint:string,newCols:number)=>{
        console.log(newBreakpoint,newCols)
        console.log("breakpoint changed")
      }}
      rowHeight={350}
    >
      <div className="bg-white flex justify-center" key="1">
        {managerData && <DoghnutChart data={managerData}></DoghnutChart>}
      </div>

      <div className="bg-white" key="2">
        {projectData &&  <PieChart data={projectData}></PieChart>}
      </div>
      <div className="bg-white" key="3">
        {projectData &&  <PolarAreaChart data={projectData}></PolarAreaChart>}
      </div>
    </ResponsiveGridLayout>
  );
};

export default GridLayout;
