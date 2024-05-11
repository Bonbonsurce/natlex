import React, {useContext, useState} from 'react';
import {LineChart} from "@mui/x-charts/LineChart";
import charts from "../../pages/Charts";
import {SettingsContext} from "../../context/context";
import MySelect from "./select/MySelect";
import MyButton from "./button/MyButton";
import MyModal from "./MyModal/MyModal";
import ChartForm from "../ChartForm";

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
                    <div>
                        <MyButton onClick={showEditModal}>Edit</MyButton>
                        <MyModal visible={editModalVisible} setVisible={setEditModalVisible}>
                            <ChartForm edit={props.edit} chartsCount={charts.length} editChart={props.chart} hideModal={hideModals}/>
                        </MyModal>
                    </div>

                    <div>
                        <MyButton onClick={showDeleteModal}>Delete</MyButton>
                        <MyModal visible={deleteModalVisible} setVisible={setDeleteModalVisible}>
                            <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', padding:10}}>
                                <h5 style={{marginBottom:25}}>Are you sure that you want to delete this chart?</h5>
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