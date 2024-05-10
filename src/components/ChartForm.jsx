import React, {useState} from 'react';
import MyButton from "./UI/button/MyButton";
import MyInput from "./UI/input/MyInput";
import MySelect from "./UI/select/MySelect";

const ChartForm = ({create, chartsCount}) => {
    const [chart, setChart] = useState({
        id: null,
        xAxis: [],
        series: [{data:[], color:'', area:false}],
        strDate: '',
        chartTitle: ''
    });
    const [lineNow, setLineNow] = useState(1);
    const [selectedColor, setSelectedColor] = useState('');

    const handleColorChange = (selectedColor, index) => {
        setChart(prevChart => {
            const updatedSeries = [...prevChart.series];
            updatedSeries[index] = { ...updatedSeries[index], color: selectedColor };
            console.log('This is info', index, selectedColor);
            return { ...prevChart, series: updatedSeries };
        });
        console.log(selectedColor);
    };

    const addNewLine = (e) => {
        e.preventDefault();
        if (lineNow < 2) {
            setLineNow(prevLineNow => prevLineNow + 1);
        }
    };

    const deleteLine = (e) => {
        e.preventDefault();
        if (lineNow > 1) {
            setLineNow(prevLineNow => prevLineNow - 1);
        }
    };

    const [seriesData, setSeriesData] = useState(Array(lineNow).fill(''));
    const [seriesColor, setSeriesColor] = useState(Array(lineNow).fill(''));
    const [seriesArea, setSeriesArea] = useState(Array(lineNow).fill(''));
    const [chartTitle, setChartTitle] = useState('');
    const [chartAxis, setChartAxis] = useState([]);

    const addNewChart = (e) => {
        e.preventDefault()
        const chartId = chartsCount + 1;
        const chartAxisData = document.getElementById('chartAxis').value.split(',').map(parseFloat);
        const chartTitle = document.getElementById('chartTitle').value;
        const currentDate = new Date();
        const chartDate = currentDate.toISOString();

        const series = Array.from({ length: lineNow }).map((_, index) => ({
            data: seriesData[index].split(',').map(parseFloat),
            color: seriesColor[index],
            area: seriesArea[index]
        }));

        const newChart = {
            id: chartId,
            xAxis: [{ data: chartAxisData }],
            series: series,
            strDate: chartDate,
            chartTitle: chartTitle
        };

        create(newChart);
        setChart({
            id: null,
            xAxis: [],
            series: [{data:[], color:'', area:false}],
            strDate: '',
            chartTitle: ''
        });
    };

    function handleKeyDown(event) {
        // Разрешаем вводить только цифры, запятые и точки
        const allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ',', '.'];
        if (!allowedKeys.includes(event.key)) {
            event.preventDefault();
        }
    }

    return (
        <form>
            <MyInput
                value={chartTitle}
                onChange={(e) => setChartTitle(e.target.value)}
                id="chartTitle"
                type="text"
                placeholder="Chart Title"
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

                    <MySelect
                        value={seriesColor[index]}
                        onChange={(selectedColor) => {
                            const newColors = [...seriesColor];
                            newColors[index] = selectedColor;
                            setSeriesColor(newColors);
                        }}
                        defaultValue="Choose a color"
                        options={[
                            {value: '#FFB6C1', name: 'Red'},
                            {value: '#87CEFA', name: 'Blue'},
                            {value: '#ffe975', name: 'Yellow'},
                            {value: '#98FB98', name: 'Green'},
                            {value: '#FFA07A', name: 'Orange'}
                        ]}
                    />

                    <MySelect
                        value={seriesArea[index]}
                        onChange={(selectedArea) => {
                            const newAreas = [...seriesArea];
                            newAreas[index] = selectedArea;
                            setSeriesArea(newAreas);
                        }}
                        defaultValue="fill area"
                        options={[
                            {value: true, name: 'fill area'},
                            {value: false, name: 'just line'}
                        ]}
                    />

                    <MyButton onClick={deleteLine}>Delete line</MyButton>
                </div>
            ))}
            <MyButton onClick={addNewChart}>Create</MyButton>
        </form>
    );
};

export default ChartForm;