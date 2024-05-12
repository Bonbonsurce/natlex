import React, {useContext, useEffect, useMemo, useRef, useState} from 'react';
import ChartList from "../components/UI/ChartList";
import MyModal from "../components/UI/MyModal/MyModal";
import ChartForm from "../components/ChartForm";
import MyButton from "../components/UI/button/MyButton";
import {SettingsContext} from "../context/context";
import {Link} from "react-router-dom";
import Loader from "../components/UI/Loader/Loader";

const Settings = () => {
    const [charts, setCharts] = useState([]);
    const [filter, setFilter] = useState({sort: ''});
    const [modal, setModal] = useState(false);
    const {isSettings, setIsSettings, isLoading, setIsLoading, chartsStat, setChartsStat} = useContext(SettingsContext);

    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const lastElement = useRef();

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
            setIsSettings(true);
        };

        fetchData();
    }, [chartsStat]);

    const createChart = (newChart) => {
        console.log(newChart);
        setCharts([...charts, newChart]);
        //setChartsStat([...chartsStat, newChart]);
        setModal(false);
    }

    const removeChart = (chart) => {
        setCharts(charts => charts.filter(c => c.id !== chart.id));
    };

    const saveCharts = () => {
        setIsSettings(false);
        setChartsStat(charts);
    }

    const editChart = (chart, newChart) => {
        const updatedCharts = charts.map(existingChart => {
            if (existingChart.id === chart.id) {
                return newChart;
            } else {
                return existingChart;
            }
        });

        setCharts(updatedCharts);
        setModal(false);
    }

    return (
        <div className="center__items">
            {isLoading &&
                <div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}><Loader/></div>
            }
            {charts.length === 0 ? (
                <h1 style={{textAlign: 'center', marginBottom: 30}}>{!isLoading && <p>Charts do not exist </p>}</h1>
            ) : (
                <h1 style={{textAlign: 'center', marginBottom: 30}}>Charts</h1>
            )}

            {charts.length === 0 ? (
                <div className="btnCreateChart">
                    {!isLoading && <MyButton onClick={() => setModal(true)}>Create chart</MyButton>}

                    <MyModal visible={modal} setVisible={setModal}>
                        <ChartForm create={createChart} edit={editChart} chartsCount={charts.length}/>
                    </MyModal>
                </div>
            ) : (
                <div>
                    <div className="btnCreateChart">
                        <MyButton onClick={() => setModal(true)}>Create chart</MyButton>
                        <MyModal visible={modal} setVisible={setModal}>
                            <ChartForm create={createChart} edit={editChart} chartsCount={charts.length}/>
                        </MyModal>
                    </div>
                    <ChartList style={{paddingTop: 50}} charts={charts} title='Charts' remove={removeChart}
                               edit={editChart}/>
                    <div className="btnCreateChart">
                        <Link className='nav__link' to="/view-mode" onClick={saveCharts}>Save changes</Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Settings;