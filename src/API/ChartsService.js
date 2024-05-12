export default class ChartsService {
    static generateCharts(numCharts) {
        const charts = [];
        const datesWithTime = [
            new Date('2023-01-01T08:30:00'),
            new Date('2023-02-15T12:45:00'),
            new Date('2023-04-30T16:20:00'),
            new Date('2023-06-10T20:00:00'),
            new Date('2023-08-20T09:10:00')
        ];

        const chartsTitles = ['Chart 1', 'Chart 2', 'Chart 3'];
        const chartTypes = ['line','column', 'bar', 'area', 'pie','spline'];
        const yTitles = ['Values', 'Params'];

        for (let i = 0; i < numCharts; i++) {
            const xAxisLength = Math.floor(Math.random() * 6) + 5;
            const xAxisData = Array.from({ length: xAxisLength }, (_, index) => (Math.random() * 10).toFixed(2));
            xAxisData.sort((a, b) => a - b); // Сортировка массива в порядке возрастания
            const xAxis = [{ data: xAxisData }];

            const chartDate = datesWithTime[Math.floor(Math.random() * datesWithTime.length)];
            const series = [];
            let numLines = Math.floor(Math.random() * 3) + 1;
            const colors = ['#FFB6C1', '#87CEFA', '#ffe975', '#98FB98', '#FFA07A'];
            let chartTitle = chartsTitles[Math.floor(Math.random() * chartsTitles.length)];
            let chartType = chartTypes[Math.floor(Math.random() * chartTypes.length)];
            let yTitle = yTitles[Math.floor(Math.random() * yTitles.length)];

            let strDate = chartDate.toISOString();
            let id = i + 1;
            let countData = Math.floor(Math.random() * 8) + 3;
            if (chartType === 'pie') {numLines = 1;}

            for (let j = 0; j < numLines; j++) {
                const lineData = [];

                for (let k = 0; k < countData; k++) {
                    lineData.push(parseFloat((Math.random() * 10).toFixed(2)));
                }
                const randomIndex = Math.floor(Math.random() * colors.length);
                const seriesName = `Series ${j + 1}`;
                series.push({ name: seriesName, data: lineData, color: colors[randomIndex]});
            }


            charts.push({id, xAxis, series, strDate, chartTitle, chartType, yTitle});
        }
        return charts;
    }
}