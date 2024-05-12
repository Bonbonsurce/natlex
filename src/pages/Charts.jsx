import React, {useContext, useEffect, useMemo, useRef, useState} from 'react';
import ChartList from "../components/UI/ChartList";
import ChartsFilter from "../components/UI/ChartsFilter";
import {useCharts} from "../hooks/useCharts";
import {SettingsContext} from "../context/context";
import Loader from "../components/UI/Loader/Loader";

const Charts = () => {
    const [charts, setCharts] = useState([]);
    const [filter, setFilter] = useState({sort: ''});
    const [modal, setModal] = useState(false);

    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const lastElement = useRef();

    const {isSettings, setIsSettings, isLoading, setIsLoading, chartsStat, setChartsStat} = useContext(SettingsContext);

    // useEffect(() => {
    //     setIsLoading(true);
    //     setTimeout(async () => {
    //         setCharts(await chartsStat);
    //         setIsLoading(false);
    //     }, 1000);
    // }, []);
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const loadedCharts = await chartsStat;
                setCharts(loadedCharts);
            } catch (error) {
                console.error('Failed to load charts:', error);
            }
            setIsLoading(false);
        };

        fetchData();
    }, [chartsStat]);

    // const sortedCharts = useCharts(chartsStat, filter.sort);
    const sortedCharts = useCharts(charts, filter.sort);

    return (
        <div className="center__items">
            {isLoading &&
                <div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}><Loader/></div>
            }
            {sortedCharts.length > 0 &&
                <h1 style={{textAlign: 'center', marginBottom: 30}}>Charts</h1>
            }

            {sortedCharts.length === 0 ? (
                <h1 style={{textAlign: 'center'}}>
                    {!isLoading && <p>Charts do not exist </p>}
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