import React from 'react';
import {CSSTransition, TransitionGroup} from "react-transition-group";
import ChartItem from "./ChartItem";

const ChartList = ({charts, title}) => {

    if (!charts.length) {
        return (
            <h1 style={{textAlign: 'center'}}>
                Charts don't exist
            </h1>
        )
    }

    return (
        <div>
            <h1 style={{textAlign: 'center', marginBottom: 30}}>
                {title}
            </h1>

            <hr style={{margin: '15px 0', border: 'none', borderTop: '2px solid #87CEEB'}}/>

            <TransitionGroup>
                {charts.map((chart, index) =>
                    <CSSTransition
                        key={index}
                        timeout={500}
                        classNames="post"
                    >
                        <ChartItem chart={chart}/>
                    </CSSTransition>
                )}
            </TransitionGroup>
        </div>
    );
};

export default ChartList;