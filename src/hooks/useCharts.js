import { useMemo } from "react";

// export const useCharts = (charts, sort) => {
//     const sortedCharts = useMemo(() => {
//         if (sort === "newest") {
//             // Сортируем по убыванию даты
//             return [...charts].sort((a, b) => b.chartDate.getTime() - a.chartDate.getTime());
//         } else if (sort === "oldest") {
//             // Сортируем по возрастанию даты
//             return [...charts].sort((a, b) => a.chartDate.getTime() - b.chartDate.getTime());
//         }
//         // Если sort не указан или имеет неверное значение, возвращаем неизмененный массив графиков
//         return charts;
//     }, [sort, charts]);
//
//     return sortedCharts;
// };

export const useCharts = (charts, sort) => {
    const sortedCharts = useMemo(() => {
        if (sort === 'newest') {
            return [...charts].sort((a, b) => new Date(b.strDate) - new Date(a.strDate));
        } else if (sort === 'oldest') {
            return [...charts].sort((a, b) => new Date(a.strDate) - new Date(b.strDate));
        }
        return charts;
    }, [sort, charts]);

    return sortedCharts;
};