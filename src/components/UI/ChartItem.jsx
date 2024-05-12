import React, {useContext, useState} from 'react';
import {LineChart} from "@mui/x-charts/LineChart";
import charts from "../../pages/Charts";
import {SettingsContext} from "../../context/context";
import MySelect from "./select/MySelect";
import MyButton from "./button/MyButton";
import MyModal from "./MyModal/MyModal";
import ChartForm from "../ChartForm";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const ChartItem = (props) => {
    const {isSettings, setIsSettings, setIsLoading} = useContext(SettingsContext);
    const strDate = props.chart.strDate.slice(0, 10);
    const [modal, setModal] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);

    const showEditModal = () => {
        setEditModalVisible(true);
    };

    const showDeleteModal = () => {
        setDeleteModalVisible(true);
    };

    const hideModals = () => {
        setEditModalVisible(false);
        setDeleteModalVisible(false);
    };

    const deleteChart = (event) => {
        event.preventDefault(); // Предотвращаем действие по умолчанию для кнопки
        props.remove(props.chart);
        hideModals();
    };

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    console.log(props.chart.series)
    const options = {
        chart: {type: props.chart.chartType},
        title: {text: props.chart.chartTitle},
        yAsix: {title: {text: props.chart.yTitle}},
        series: props.chart.series,
        xAxis: {categories: months}
    }
    // chart: {
    //     type: 'spline'
    // },
    // title: {
    //     text: 'My chart'
    // },
    // xAxis: {
    //     categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'] // Значения для оси X
    // },
    // yAxis: {
    //     title: {
    //         text: 'Values'
    //     }
    // },
    // series: [
    //     {
    //         name: 'Series 1', // Название серии данных
    //         color: 'blue', // Цвет линии
    //         data: [1, 2, 1, 4, 3, 6] // Данные для серии
    //     }
    // ]
    const chartTypes = ['line','column', 'bar', 'area', 'pie','spline'];

    return (
        <div className="chart-content">
            {/*<h2 style={{padding:10, textAlign:'center'}}>{props.chart.chartTitle}</h2>*/}

            {/*<LineChart*/}
            {/*    xAxis={props.chart.xAxis}*/}
            {/*    series={props.chart.series}*/}
            {/*    width={600}*/}
            {/*    height={300}*/}
            {/*/>*/}

            <HighchartsReact highcharts={Highcharts} options={options}/>
            <h3 style={{padding: 20}}> Date: {strDate}</h3>

            {isSettings &&
                <div className="navbar">
                    <div>
                        <MyButton onClick={showEditModal}>Edit</MyButton>
                        <MyModal visible={editModalVisible} setVisible={setEditModalVisible}>
                            <ChartForm edit={props.edit} chartsCount={charts.length} editChart={props.chart}
                                       hideModal={hideModals}/>
                        </MyModal>
                    </div>

                    <div>
                        <MyButton onClick={showDeleteModal}>Delete</MyButton>
                        <MyModal visible={deleteModalVisible} setVisible={setDeleteModalVisible}>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: 10
                            }}>
                                <h5 style={{marginBottom: 25}}>Are you sure that you want to delete this chart?</h5>
                                <MyButton onClick={deleteChart}>Delete</MyButton>
                            </div>
                        </MyModal>
                    </div>

                    {/*<MyButton>Edit</MyButton>*/}
                    {/*<MyButton onClick={deleteChart}>*/}
                    {/*    Delete*/}
                    {/*</MyButton>*/}
                </div>
            }
        </div>

    );
};

export default ChartItem;