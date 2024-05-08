import React, {useMemo, useRef, useState} from 'react';
import { Line } from 'react-chartjs-2';
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';
import ChartsService from "../API/ChartsService";
import ChartList from "../components/UI/ChartList";
import ChartsFilter from "../components/UI/ChartsFilter";
import {useCharts} from "../hooks/useCharts";

const Charts = () => {
    const [charts, setCharts] = useState([]);
    const [filter, setFilter] = useState({sort: ''});
    const [modal, setModal] = useState(false);

    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const lastElement = useRef();

    const chartsStat = useMemo(() => ChartsService.generateCharts(10), []);

    const sortedCharts = useCharts(chartsStat, filter.sort);

    return (
        <div className="center__items">
            <div className="items__left__side">
                <ChartsFilter
                    filter={filter}
                    setFilter={setFilter}
                />
            </div>
            <ChartList style={{paddingTop: 50}} charts={chartsStat} title='Charts'/>
        </div>
    );
};

export default Charts;