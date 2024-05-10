import React from 'react';
import cl from './MyModal.css'

const MyModal = ({children, visible, setVisible}) => {

    let rootClasses = 'myModal';

    if (visible) {
        rootClasses += ' myModal-active';
    }

    return (
        <div className={rootClasses} onClick={() => setVisible(false)}>
            {/*stopPropagation - убираем скрытие формы при нажатии на блок с контентом*/}
            <div className="myModalContent" onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default MyModal;