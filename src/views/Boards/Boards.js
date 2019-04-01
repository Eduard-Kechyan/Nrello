import React, {Component} from 'react';
import styles from './Boards.module.scss';
import {removeBoard} from "../../store/index";
import connect from "react-redux/es/connect/connect";
import {withRouter} from "react-router";
import Spinner from "../../components/UI/Spinner/Spinner";
import BoardsItem from "../../components/BoardsItem/BoardsItem";

class Boards extends Component {
    handleBoardItem = (event, id, cName) => {
        if (!event.target.classList.contains(cName)) {
            this.props.history.push('/single-board/' + id);
        } else {
            if (window.confirm("Are you sure you want to delete this board? It can't be undone!")) {
                this.props.removeBoard(id);
                this.props.history.push('/');
            }
        }
    };

    render() {
        let boardAddSpinner = (
            <div className='col-md-2 col-12 px-lg-2'>
                <div className={styles["boards-spinner"]}>
                    <Spinner/>
                </div>
            </div>
        );

        if (!this.props.boardLoading) {
            boardAddSpinner = null;
        }

        return (
            <div className={styles.boards}>
                <div className="container">
                    <h2>Boards</h2>
                    <hr/>
                    <div className='row mx-lg-n2'>
                        {this.props.boards.map(board => (
                            <BoardsItem
                                key={board.id}
                                handle={this.handleBoardItem}
                                boardToRemove={this.props.boardToRemove}
                                board={board}/>
                        ))}
                        {boardAddSpinner}
                        <div className={[styles["boards-add-board"], 'col-md-2 col-12 px-lg-2'].join(' ')}>
                            <button
                                onClick={this.props.addNewBoard}>
                                + Add New Board
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const stateToProps = state => {
    return {
        boards: state.boards,
        boardLoading: state.boardLoading,
        boardToRemove: state.boardToRemove,
    }
};

const dispatchToProps = dispatch => {
    return {
        removeBoard: (id) => dispatch(removeBoard(id)),
    }
};

export default connect(stateToProps, dispatchToProps)(withRouter(Boards));