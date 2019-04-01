import React from 'react';
import styles from './BoardsPanelItem.module.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Spinner from "../../UI/Spinner/Spinner";

const BoardsPanelItem = (props) => {
    let content = (
        <div
            onClick={event => props.handle(event, props.board.id, styles["board-panel-item-trash"])}
            className={[styles["board-panel-item"], 'd-flex'].join(' ')}>
            <div className={styles["board-panel-item-img"]}>
                <img src={'/images/' + props.board.image} alt={props.board.image}/>
            </div>
            <div className={styles["board-panel-item-name"]}>
                <p>{props.board.name}</p>
                <img src={'/images/' + props.board.image} alt={props.board.image}/>
                <span
                    className={styles["board-panel-item-trash"]}>
                    <FontAwesomeIcon icon='trash-alt' size='1x'/>
                </span>
            </div>
        </div>
    );

    if (props.boardToRemove.loading) {
        if (props.boardToRemove.boardId === props.board.id) {
            content = (
                <div className={styles["board-panel-item-spinner"]}>
                    <Spinner/>
                </div>
            );
        }
    }

    return (
        <React.Fragment>
            {content}
        </React.Fragment>
    );
};

export default BoardsPanelItem;