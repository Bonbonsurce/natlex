import React, {useEffect, useState} from 'react';
import MyButton from "./UI/button/MyButton";
import MyInput from "./UI/input/MyInput";
import MySelect from "./UI/select/MySelect";
import {editableInputTypes} from "@testing-library/user-event/dist/utils";

const ChartForm = ({create, edit, chartsCount, editChart, hideModal}) => {
    const [chart, setChart] = useState({
        id: null,
        chartType: '',
        yAxis: '',
        xAxis: [{ data: [] }],
        series: [{ data: [], name: '', color: ''}],
        strDate: '',
        chartTitle: ''
    });

    const [lineNow, setLineNow] = useState(1);
    const [seriesData, setSeriesData] = useState(Array(lineNow).fill('1,2,3,4,5'));
    const [seriesName, setSeriesName] = useState(Array(lineNow).fill('Series'));
    const [seriesColor, setSeriesColor] = useState(Array(lineNow).fill('blue'));
    //const [seriesArea, setSeriesArea] = useState(Array(lineNow).fill(''));
    const [chartYAsix, setChartYAsix] = useState('Value');
    const [chartType, setChartType] = useState('line');
    const [chartTitle, setChartTitle] = useState('Example');
    const [chartAxis, setChartAxis] = useState([]);
    const [saveButtonText, setSaveButtonText] = useState('Create');

    useEffect(() => {
        if (editChart) {
            setChart({
                id: editChart.id,
                xAxis: [{ data: editChart.xAxis }],
                chartType: editChart.chartType,
                yTitle: editChart.yTitle,
                series: editChart.series,
                strDate: editChart.strDate,
                chartTitle: editChart.chartTitle
            });
            setChartTitle(editChart.chartTitle);
            setChartYAsix(editChart.yTitle);
            setChartType(editChart.chartType)
            setChartAxis(editChart.xAxis.length > 0 ? editChart.xAxis[0].data.join(',') : '');
            setSeriesData(editChart.series.map(serie => serie.data.join(',')));
            setSeriesColor(editChart.series.map(serie => serie.color));
            setSeriesName(editChart.series.map(serie => serie.name));
            //setSeriesArea(editChart.series.map(serie => serie.area));
            setLineNow(editChart.series.length);
            setSaveButtonText('Save changes');
        }
    }, [editChart]);

    const addNewLine = (e) => {
        e.preventDefault();
        if (lineNow < 3) {
            setLineNow(prevLineNow => prevLineNow + 1);
        }
    };

    const deleteLine = (e) => {
        e.preventDefault();
        if (lineNow > 1) {
            setLineNow(prevLineNow => prevLineNow - 1);
        }
    };

    const addNewChart = (e) => {
        e.preventDefault()
        if (!chartTitle || !chartYAsix || !chartAxis.length || seriesData.some(data => !data)) {
            console.log('Empty fields!', chartTitle, chartYAsix, chartAxis.length, seriesData.some(data => !data));
            return;
        }

        let chartId = chartsCount;

        if (!editChart) {
            chartId += 1;
        }

        const chartAxisData = chartAxis.split(',').map(parseFloat);
        const currentDate = new Date();
        const chartDate = currentDate.toISOString();
        let invalidData = false;

        Array.from({ length: lineNow }).forEach((_, index) => {
            if (!seriesData[index]) {
                console.log('Data undefined');
                invalidData = true;
                return;
            }

            // const data = seriesData[index].split(',').map(parseFloat);
            //
            // if (data.length !== chartAxisData.length) {
            //     console.log('Not correct data!')
            //     invalidData = true;
            // }
        });

        if (invalidData) {return;}
        else {
            const series = Array.from({ length: lineNow }).map((_, index) => ({
                data: seriesData[index].split(',').map(parseFloat),
                name: seriesName[index],
                color: seriesColor[index]
                // area: seriesArea[index]
            }));

            const newChart = {
                id: chartId,
                chartType: chartType,
                yTitle: chartYAsix,
                xAxis: [{ data: chartAxisData }],
                series: series,
                strDate: chartDate,
                chartTitle: chartTitle
            };

            if (editChart) {
                edit(editChart, newChart);
                // setChart({
                //     id: null,
                //     xAxis: [],
                //     series: [{data:[], color:'', area:false}],
                //     strDate: '',
                //     chartTitle: ''
                // });
                hideModal();
            } else {
                create(newChart);
                // setChartTitle('');
                // setChartAxis('');
                // setSeriesData(Array(lineNow).fill(''));
                // setLineNow(1);
                //
                // setChart({
                //     id: null,
                //     xAxis: [],
                //     series: [{data:[], color:'', area:false}],
                //     strDate: '',
                //     chartTitle: ''
                // });
            }
        }
    };

    function handleKeyDown(event) {
        // Разрешаем вводить только цифры, запятые и точки
        const allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ',', '.', 'Backspace', 'Delete'];
        if (!allowedKeys.includes(event.key)) {
            event.preventDefault();
        }
    }

    return (
        <div style={{ padding: '20px', backgroundColor: '#f0f5ff', borderRadius: '10px', maxHeight: '500px', overflowY: 'auto' }}>
            <form>
                <MyInput
                    value={chartTitle}
                    onChange={(e) => {
                        setChartTitle(e.target.value);
                    }}
                    id="chartTitle"
                    type="text"
                    placeholder="Chart Title"
                />

                <MySelect
                    value={chartType}
                    onChange={(selectedType) => {
                        setChartType(selectedType);
                    }}
                    defaultValue={'line'}
                    options={[
                        {value: 'line', name: 'line'},
                        {value: 'column', name: 'column'},
                        {value: 'bar', name: 'bar'},
                        {value: 'area', name: 'area'},
                        {value: 'pie', name: 'pie'},
                        {value: 'spline', name: 'spline'},
                    ]}
                />

                <MyInput
                    value={chartYAsix}
                    onChange={(e) => setChartYAsix(e.target.value)}
                    id="chartYAsix"
                    type="text"
                    placeholder="Header for Y asix"
                />

                <MyInput
                    value={chartAxis}
                    onChange={(e) => setChartAxis(e.target.value)}
                    id="chartAxis"
                    type="text"
                    placeholder="Data for axis 0x separated by commas"
                    onKeyDown={handleKeyDown}
                />

                <MyButton onClick={addNewLine}>Add line</MyButton>

                {Array.from({ length: lineNow }).map((_, index) => (
                    <div key={index} style={{border: '2px solid #87CEFA', padding: 10, margin: 10}}>
                        <h5 style={{textAlign: "center", marginBottom: 10, color: 'grey'}}>Line {index + 1}</h5>
                        <MyInput
                            value={seriesData[index]}
                            // id={`seriesData${index}`}
                            onChange={(e) => {
                                const newData = [...seriesData];
                                newData[index] = e.target.value;
                                setSeriesData(newData);
                            }}
                            type="text"
                            placeholder="Data for line separated by commas"
                            onKeyDown={handleKeyDown}
                        />

                        <MyInput
                            value={seriesName[index]}
                            // id={`seriesData${index}`}
                            onChange={(e) => {
                                const newName = [...seriesName];
                                newName[index] = e.target.value;
                                setSeriesName(newName);
                            }}
                            type="text"
                            placeholder="Series name"
                        />

                        <MySelect
                            value={seriesColor[index]}
                            onChange={(selectedColor) => {
                                const newColors = [...seriesColor];
                                newColors[index] = selectedColor;
                                setSeriesColor(newColors);
                            }}
                            defaultValue="Blue"
                            options={[
                                {value: '#FFB6C1', name: 'Red'},
                                {value: '#87CEFA', name: 'Blue'},
                                {value: '#ffe975', name: 'Yellow'},
                                {value: '#98FB98', name: 'Green'},
                                {value: '#FFA07A', name: 'Orange'}
                            ]}
                        />

                        {/*<MySelect*/}
                        {/*    value={seriesArea[index]}*/}
                        {/*    onChange={(selectedArea) => {*/}
                        {/*        const newAreas = [...seriesArea];*/}
                        {/*        newAreas[index] = selectedArea === 'true'*/}
                        {/*        setSeriesArea(newAreas);*/}
                        {/*    }}*/}
                        {/*    defaultValue={'Choose an option'}*/}
                        {/*    options={[*/}
                        {/*        {value: 'true', name: 'fill area'},*/}
                        {/*        {value: 'false', name: 'just line'}*/}
                        {/*    ]}*/}
                        {/*/>*/}

                        <MyButton onClick={deleteLine}>Delete line</MyButton>
                    </div>
                ))}
                <MyButton onClick={addNewChart}>{saveButtonText}</MyButton>
            </form>
        </div>
    );
};

export default ChartForm;