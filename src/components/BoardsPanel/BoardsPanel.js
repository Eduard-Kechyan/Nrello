import React, {Component} from 'react';
import styles from './BoardsPanel.module.scss';
import {withRouter} from "react-router";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import BoardsPanelItem from './BoardsPanelItem/BoardsPanelItem';
import {connect} from 'react-redux';
import Spinner from '../UI/Spinner/Spinner';
import {fetchBoard, removeBoard} from "../../store/index";

class BoardsPanel extends Component {
    componentWillMount() {
        this.props.fetchBoard();
    };

    handleBoardPanelItem = (event, id, cName) => {
        if (!event.target.classList.contains(cName)) {
            this.props.history.push('/single-board/' + id);
        } else {
            if(window.confirm("Are you sure you want to delete this board? It can't be undone!")){
                this.props.removeBoard(id);
                this.props.history.push('/');
            }
        }
    };

    render() {
        let boardAddSpinner = (
            <div className={styles["boards-panel-add-spinner"]}>
                <Spinner/>
            </div>
        );

        if (!this.props.boardLoading) {
            boardAddSpinner = null;
        }

        return (
            <div className={[
                styles["boards-panel"],
                this.props.boardsPanelOpen ? styles["boards-panel-open"] : null
            ].join(' ')}>
                <button onClick={this.props.toggleBoardsPanel} className={styles["boards-panel-close"]}>
                <span>
                    <FontAwesomeIcon icon='bars' size='1x'/>
                </span>
                </button>
                <h2>Boards</h2>
                <div className={styles["boards-panel-wrapper"]}>
                    {this.props.boards.map(board => (
                        <BoardsPanelItem
                            key={board.id}
                            handle={this.handleBoardPanelItem}
                            boardToRemove={this.props.boardToRemove}
                            board={board}/>
                    ))}
                    {boardAddSpinner}
                    <button
                        className={styles["boards-panel-add-board"]} onClick={this.props.addNewBoard}>
                        + Add New Board
                    </button>
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
        fetchBoard: () => dispatch(fetchBoard()),
        removeBoard: (id) => dispatch(removeBoard(id)),
    }
};

export default connect(stateToProps, dispatchToProps)(withRouter(BoardsPanel));