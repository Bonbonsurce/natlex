import React, {useEffect, useMemo, useRef, useState} from 'react';
import ChartsService from "../API/ChartsService";
import ChartList from "../components/UI/ChartList";
import ChartsFilter from "../components/UI/ChartsFilter";
import {useCharts} from "../hooks/useCharts";
import {useFetching} from "../hooks/useFetching";

const Settings = () => {
    const [charts, setCharts] = useState([]);
    const [filter, setFilter] = useState({sort: ''});
    const [modal, setModal] = useState(false);

    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const lastElement = useRef();

    const chartsStat = ChartsService.generateCharts(10);

    const [fetchCharts, isChartLoading, chartError] = useFetching( () => {
        const chartsStat = ChartsService.generateCharts(10);
        setCharts([...charts, chartsStat]);
    })

    const sortedCharts = useCharts(chartsStat, filter.sort);

    const createPost = (newChart) => {
        setCharts([...charts, newChart])
        setModal(false)
    }

    useEffect(() => {
        fetchCharts()
    }, []);

    const removeChart = (chart) => {
        setCharts(charts.filter(p => p.id !== chart.id))
    }

    return (
        <div className="center__items">
            <ChartList style={{paddingTop: 50}} charts={sortedCharts} title='Charts'/>
        </div>
    );
};

export default Settings;