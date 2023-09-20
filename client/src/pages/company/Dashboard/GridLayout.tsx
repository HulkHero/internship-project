import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

interface Props {
  kpis: any;
}
const layouts = {
    lg: [
      { i: "1", x: 0, y: 0, w: 1, h: 1 },
      { i: "2", x: 4, y: 0, w: 1, h: 1 },
      { i: "3", x: 8, y: 0, w: 1, h: 1 },
      { i: "4", x: 0, y: 1, w: 1, h: 1 },
      { i: "5", x: 4, y: 1, w: 1, h: 1 },
      { i: "6", x: 8, y: 1, w: 1, h: 1 },
    ],
    md: [
        { i: "1", x: 0, y: 0, w: 1, h: 1 },
        { i: "2", x: 2, y: 0, w: 1, h: 1 },
        { i: "3", x: 0, y: 1, w: 1, h: 1 },
        { i: "4", x: 2, y: 1, w: 1, h: 1 },
        { i: "5", x: 0, y: 2, w: 1, h: 1 },
        { i: "6", x: 2, y: 2, w: 1, h: 1 },
    ],
    sm: [
      { i: "1", x: 0, y: 0, w: 1, h: 1 },
      { i: "2", x: 0, y: 1, w: 1, h: 1 },
      { i: "3", x: 0, y: 2, w: 1, h: 1 },
      { i: "4", x: 0, y: 3, w: 1, h: 1 },
      { i: "5", x: 0, y: 4, w: 1, h: 1 },
      { i: "6", x: 0, y: 5, w: 1, h: 1 },
    ],
  };


const ResponsiveGridLayout = WidthProvider(Responsive);

const MyResponsiveGrid = ({kpis}:Props) => {
  // Define your layouts for different screen sizes

  const {data,isLoading,isError}=useQuery(['stats'],()=>{

  })
 
  return (
    <ResponsiveGridLayout
      className="layout"
      layouts={layouts}
      breakpoints={{ lg: 1000, md: 800, sm: 400, xs: 300, xxs: 0 }}
      cols={{ lg: 3, md: 2, sm: 1, xs: 1, xxs: 1 }}
      onBreakpointChange={(newBreakpoint:string,newCols:number)=>{
        console.log(newBreakpoint,newCols)
        console.log("breakpoint changed")
      }}
    >
      <div className="bg-green-500" key="1">Chart 1</div>
      <div className="bg-green-500" key="2">Chart 2</div>
      <div className="bg-green-500" key="3">Chart 3</div>
      <div className="bg-green-500" key="4">Chart 4</div>
      <div className="bg-green-500" key="5">Chart 5</div>
      <div className="bg-green-500" key="6">Chart 6</div>
    </ResponsiveGridLayout>
  );
};

export default MyResponsiveGrid;
