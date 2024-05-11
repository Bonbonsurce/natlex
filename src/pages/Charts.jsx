import React, {useContext, useEffect, useMemo, useRef, useState} from 'react';
import { Line } from 'react-chartjs-2';
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';
import ChartsService from "../API/ChartsService";
import ChartList from "../components/UI/ChartList";
import ChartsFilter from "../components/UI/ChartsFilter";
import {useCharts} from "../hooks/useCharts";
import {useFetching} from "../hooks/useFetching";
import {SettingsContext} from "../context/context";

const Charts = () => {
    const [charts, setCharts] = useState([]);
    const [filter, setFilter] = useState({sort: ''});
    const [modal, setModal] = useState(false);

    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const lastElement = useRef();

    const {isSettings, setIsSettings, setIsLoading, chartsStat, setChartsStat} = useContext(SettingsContext);
    //const chartsStat = ChartsService.generateCharts(10);

    // const [fetchCharts, isChartLoading, chartError] = useFetching( () => {
    //     const chartsStat = ChartsService.generateCharts(10);
    //     setCharts([...charts, chartsStat]);
    // })

    const sortedCharts = useCharts(chartsStat, filter.sort);

    // const createChart = (newChart) => {
    //     setCharts([...charts, newChart])
    //     setModal(false)
    // }

    // useEffect(() => {
    //     fetchCharts()
    // }, []);

    // const removeChart = (chart) => {
    //     setCharts(charts.filter(c => c.id !== chart.id))
    // }

    return (
        <div className="center__items">

            {sortedCharts.length > 0 &&
                <h1 style={{textAlign: 'center', marginBottom: 30}}>Charts</h1>
            }

            {sortedCharts.length === 0 ? (
                <h1 style={{textAlign: 'center'}}>
                    Charts don't exist
                </h1>
            ) : (
                <div>
                    <div className="items__left__side">
                        <ChartsFilter
                            filter={filter}
                            setFilter={setFilter}
                        />
                    </div>
                    <ChartList style={{paddingTop: 50}} charts={sortedCharts} title='Charts'/>
                </div>
            )}
        </div>
    );
};

export default Charts;