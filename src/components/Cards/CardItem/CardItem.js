import React from 'react';
import styles from './CardItem.module.scss';

const CardItem = (props) => {
    return (
        <div onClick={props.openCard} className={styles['card-item']}>{props.card.name}</div>
    );
};

export default CardItem;