import React, {useContext, useState} from 'react';
import {CSSTransition, TransitionGroup} from "react-transition-group";
import ChartItem from "./ChartItem";
import {SettingsContext} from "../../context/context";
import MyButton from "./button/MyButton";
import ChartForm from "../ChartForm";
import MyModal from "./MyModal/MyModal";

const ChartList = ({charts, title, remove, edit}) => {
    const {isSettings, setIsSettings, setIsLoading} = useContext(SettingsContext);

    return (
        <div>
            <hr style={{margin: '15px 0', border: 'none', borderTop: '2px solid #87CEEB'}}/>
            <TransitionGroup>
                {charts.map((chart, index) =>
                    <CSSTransition
                        key={index}
                        timeout={500}
                        classNames="chart"
                    >
                        <ChartItem edit={edit} remove={remove} number={index + 1} chart={chart}/>
                    </CSSTransition>
                )}
            </TransitionGroup>
        </div>
    );
};

export default ChartList;