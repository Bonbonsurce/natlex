import React, {useContext, useEffect, useMemo, useRef, useState} from 'react';
import ChartsService from "../API/ChartsService";
import ChartList from "../components/UI/ChartList";
import ChartsFilter from "../components/UI/ChartsFilter";
import {useCharts} from "../hooks/useCharts";
import {useFetching} from "../hooks/useFetching";
import MyModal from "../components/UI/MyModal/MyModal";
import ChartForm from "../components/ChartForm";
import MyButton from "../components/UI/button/MyButton";
import {SettingsContext} from "../context/context";

const Settings = () => {
    const [charts, setCharts] = useState([]);
    const [filter, setFilter] = useState({sort: ''});
    const [modal, setModal] = useState(false);
    const {isSettings, setIsSettings, setIsLoading} = useContext(SettingsContext);

    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const lastElement = useRef();

    //const chartsStat = ChartsService.generateCharts(4);

    // const [fetchCharts, isChartLoading, chartError] = useFetching( () => {
    //     const chartsStat = ChartsService.generateCharts(10);
    //     setCharts([...charts, chartsStat]);
    // })

    useEffect(() => {
        // Заполняем состояние charts при монтировании компонента
        const initialCharts = ChartsService.generateCharts(10);
        setCharts(initialCharts);
    }, []);

    const sortedCharts = useCharts(charts, filter.sort);

    const createChart = (newChart) => {
        setCharts([...charts, newChart]);
        setModal(false);
    }

    // useEffect(() => {
    //     fetchCharts()
    // }, []);

    const removeChart = (chart) => {
        setCharts(charts => charts.filter(c => c.id !== chart.id));
    };

    const changeChart = (chart) => {

    }

    return (
        <div className="center__items">
            {sortedCharts.length === 0 ? (
                <h1 style={{textAlign: 'center', marginBottom: 30}}>Charts do not exist</h1>
            ) : (
                <h1 style={{textAlign: 'center', marginBottom: 30}}>Charts</h1>
            )}

            {isSettings &&
                <div className="btnCreateChart">
                    <MyButton onClick={() => setModal(true)}>Create chart</MyButton>
                    <MyModal visible={modal} setVisible={setModal}>
                        <ChartForm create={createChart}/>
                    </MyModal>
                </div>
            }

            <ChartList style={{paddingTop: 50}} charts={charts} title='Charts' remove={removeChart} change={changeChart}/>
        </div>
    );
};

export default Settings;