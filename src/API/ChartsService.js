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

        for (let i = 0; i < numCharts; i++) {
            const xAxisLength = Math.floor(Math.random() * 6) + 5;
            const xAxisData = Array.from({ length: xAxisLength }, (_, index) => Math.random() * 10);
            xAxisData.sort((a, b) => a - b); // Сортировка массива в порядке возрастания
            const xAxis = [{ data: xAxisData }];

            const chartDate = datesWithTime[Math.floor(Math.random() * datesWithTime.length)];
            const series = [];
            const numLines = Math.floor(Math.random() * 3) + 1;
            const colors = ['#FFB6C1', '#87CEFA', '#ffe975', '#98FB98', '#FFA07A'];

            for (let j = 0; j < numLines; j++) {
                const lineData = [];
                for (let k = 0; k < xAxisLength; k++) {
                    lineData.push(Math.random() * 10);
                }
                const randomIndex = Math.floor(Math.random() * colors.length);
                series.push({ data: lineData, color: colors[randomIndex], area: true });
            }

            let strDate = chartDate.toISOString();
            charts.push({ xAxis, series, strDate});
        }
        return charts;
    }
}