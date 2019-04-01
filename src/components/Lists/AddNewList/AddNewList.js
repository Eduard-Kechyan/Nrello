import React from 'react';
import styles from "./AddNewList.module.scss";

const AddNewList = (props) => {
    return (
        <form onSubmit={props.addNewList} className={styles["add-list"]}>
            <label>
                <p>+ Add a list</p>
                <input
                    onBlur={props.blur}
                    type="text"
                    value={props.newListName}
                    onChange={props.checkNewListName}
                    placeholder='Enter list name...'/>
            </label>
            <div>
                <button disabled={props.newListName === ''}><span>+</span>Add list</button>
                <span className={styles["add-cancel"]}>&times;</span>
            </div>
        </form>
    );
};

export default AddNewList;