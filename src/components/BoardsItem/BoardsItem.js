import React from 'react';
import styles from './BoardsItem.module.scss';
import Spinner from "../UI/Spinner/Spinner";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const BoardsItem = (props) => {
    let content = (
        <div
            className={styles["board-item"]}
            onClick={event => props.handle(event, props.board.id, styles["board-item-trash"])}>
            <img src={'/images/' + props.board.image} alt={props.board.image}/>
            <h3>{props.board.name}</h3>
            <span
                className={styles["board-item-trash"]}>
                <FontAwesomeIcon icon='trash-alt' size='1x'/>
            </span>
        </div>
    );

    if (props.boardToRemove.loading) {
        if (props.boardToRemove.boardId === props.board.id) {
            content = (
                <div className={styles["board-item-spinner"]}>
                    <Spinner/>
                </div>
            );
        }
    }

    return (
        <div className='col-md-2 col-12 px-lg-2'>
            {content}
        </div>
    );
};

export default BoardsItem;