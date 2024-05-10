import React, {useContext} from 'react';
import {LineChart} from "@mui/x-charts/LineChart";
import charts from "../../pages/Charts";
import {SettingsContext} from "../../context/context";
import MySelect from "./select/MySelect";
import MyButton from "./button/MyButton";

const ChartItem = (props) => {
    const {isSettings, setIsSettings, setIsLoading} = useContext(SettingsContext);
    const strDate = props.chart.strDate.slice(0, 10);

    const deleteChart = (event) => {
        event.preventDefault(); // Предотвращаем действие по умолчанию для кнопки
        props.remove(props.chart);
    };

    return (
        <div className="chart-content">
            <h2 style={{padding:10, textAlign:'center'}}>{props.chart.chartTitle}</h2>
            <h3 style={{padding:20}}> Date: {strDate}</h3>
            <LineChart
                xAxis={props.chart.xAxis}
                series={props.chart.series}
                width={600}
                height={300}
            />
            {isSettings &&
                <div className="navbar">
                    <MyButton>Edit</MyButton>
                    <MyButton onClick={deleteChart}>
                        Delete
                    </MyButton>
                </div>
            }
        </div>

    );
};

export default ChartItem;