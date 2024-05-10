import React, {useState} from 'react';
import MyButton from "./UI/button/MyButton";
import MyInput from "./UI/input/MyInput";

const ChartForm = ({create}) => {
    const [chart, setChart] = useState([]);

    const addNewChart = (e) => {
        e.preventDefault() // убрать самбит с кнопки - типо без автообновления
        const newChart = {
            ...chart, id: Date.now()
        }
        create(newChart)
        setChart({title: '', body: ''})
    }
    return (
        <form>
            <MyInput
                value={chart.title}
                onChange={e => setChart({...chart, title: e.target.value})}
                type="text"
                placeholder="Название поста"
            />

            <MyInput
                value={chart.body}
                onChange={e => setChart({...chart, body: e.target.value})}
                type="text"
                placeholder="Описание поста"
            />

            <MyButton onClick={addNewChart}>Create</MyButton>
        </form>
    );
};

export default ChartForm;