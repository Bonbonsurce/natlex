import React from 'react';
import {LineChart} from "@mui/x-charts/LineChart";
import charts from "../../pages/Charts";

const ChartItem = ({ chart }) => {
    const year = chart.chartDate.getFullYear();
    const month = String(chart.chartDate.getMonth() + 1).padStart(2, '0'); // Месяцы начинаются с 0
    const day = String(chart.chartDate.getDate()).padStart(2, '0');

    const formattedDate = `${day}-${month}-${year}`;

    return (
        <div className="chart-content">
            <h3 style={{padding:20}}> Date: {formattedDate}</h3>
            <LineChart
                xAxis={chart.xAxis}
                series={chart.series}
                width={600}
                height={300}
            />
        </div>
    );
};

export default ChartItem;