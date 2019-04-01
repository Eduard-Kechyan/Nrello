import React from 'react';

const Modal = (props) => {
    return (
        <div className={["board-close board-modal", props.show ? "board-modal-show" : null].join(' ')}>
            <span className="board-modal-backdrop" onClick={props.close}></span>
            <div className="board-modal-wrapper">
                <div className="board-modal-content">
                    {props.children}
                </div>
            </div>
        </div>
    );
};

export default Modal;