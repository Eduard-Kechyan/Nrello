import React from 'react';
import styles from './SingleHeader.module.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const SingleHeader = (props) => {
    return (
        <div className={[styles["single-header"],'d-flex'].join(' ')}>
            <h2>{props.name}</h2>
            <button onClick={props.remove}>
                <span>
                    <FontAwesomeIcon icon='trash-alt' size='1x'/>
                </span>
            </button>
        </div>
    );
};

export default SingleHeader;