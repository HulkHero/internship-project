import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import RadarChart from "./ChartComponents/RadarChart";
import { Evaluation, } from "./types";
import LineChart from "./ChartComponents/LineChart";

import BarChart from "./ChartComponents/BarChart";
import DonutChart from "./ChartComponents/DonutChart";

interface Props {
  evaluation:Evaluation[]
}
const layouts = {
    lg: [
      { i: "1", x: 0, y: 0, w: 1, h: 1 },
      { i: "2", x: 1, y: 0, w: 1, h: 1 },
      { i: "3", x: 2, y: 0, w: 1, h: 1 },
      { i: "4", x: 0, y: 1, w: 1, h: 1 },
      { i: "5", x: 1, y: 1, w: 1, h: 1 },
      { i: "6", x: 2, y: 1, w: 1, h: 1 },
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

const GridLayout = ({evaluation}:Props) => {
 
  return (
    <ResponsiveGridLayout
      className="layout bg-neutral-100 mb-3 mx-2"
      layouts={layouts}
      breakpoints={{ lg: 1200, md: 700, sm: 400, xs: 300, xxs: 0 }}
      cols={{ lg: 3, md: 2, sm: 1, xs: 1, xxs: 1 }}
      rowHeight={350}
    >

      <div className="bg-white flex justify-center" key="2">
        <LineChart evaluation={evaluation}></LineChart>
      </div>
      <div className="bg-white flex justify-center" key="1">
        <RadarChart evaluation={evaluation}></RadarChart>
      </div>
      <div className="bg-white flex justify-center" key="3">
        <BarChart evaluation={evaluation}></BarChart>
      </div>
      <div className="bg-white" key="4">
        <DonutChart evaluation={evaluation}></DonutChart>
      </div>
    </ResponsiveGridLayout>
  );
};

export default GridLayout;
