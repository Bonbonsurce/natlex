import React, {useContext, useState} from 'react';
import charts from "../../pages/Charts";
import {SettingsContext} from "../../context/context";
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

    const deleteChart = (e) => {
        e.preventDefault();
        props.remove(props.chart);
        hideModals();
    };

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const options = {
        chart: {type: props.chart.chartType},
        title: {text: props.chart.chartTitle},
        yAxis: {title: {text: props.chart.yTitle}},
        series: props.chart.series,
        xAxis: {title: {text: 'xAsix'}, data: props.chart.xAxis}
    }

    //test with months
    // const options = {
    //     chart: {type: props.chart.chartType},
    //     title: {text: props.chart.chartTitle},
    //     yAxis: {title: {text: props.chart.yTitle}},
    //     series: props.chart.series,
    //     xAxis: {title: {text: 'xAsix'}, categories: months}
    // }

    return (
        <div className="chart-content">

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