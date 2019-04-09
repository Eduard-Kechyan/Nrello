import React, {Component} from 'react';
import styles from './ListItem.module.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {removeList, editListName, addCard} from "../../../store/index";
import connect from "react-redux/es/connect/connect";
import {withRouter} from "react-router";
import Spinner from "../../UI/Spinner/Spinner";

class ListItem extends Component {
    state = {
        newCardName: '',
    };

    handleListItem = (id) => {
        if (window.confirm("Are you sure you want to delete this list? It can't be undone!")) {
            this.props.removeList(id, this.props.singleBoard.boardId);
        }
    };

    editListItem = (id) => {
        let name = window.prompt("Type in new list name:");

        if (name !== '' && name !== null) {
            this.props.editListName(name, id, this.props.singleBoard.boardId)
        }
    };

    checkNewCardName = (event) => {
        let getCardName = event.target.value;
        this.setState({newCardName: getCardName});
    };

    addNewCard = (event) => {
        event.preventDefault();

        if (document.activeElement) {
            document.activeElement.blur();
        }

        if (this.state.newCardName !== '') {
            this.props.addCard(this.state.newCardName, this.props.singleBoard.boardId, this.props.list.id);
            this.setState({newCardName: ''});
        }
    };

    render() {
        let cards = null;

        if (this.props.listToChange.listId === this.props.list.id) {
            cards = <Spinner/>;
        } else if (this.props.list.cards !== undefined) {
            cards = (
                <div className={styles["list-item-wrapper"]}>
                    <div className={styles["list-item-content"]}>
                        {this.props.list.cards.map(card => (
                            <p key={card.name}>{card.name}</p>
                        ))}
                    </div>
                </div>
            )
        } else {
            cards = null;
        }

        return (
            <div className={styles["list-item"]}>
                <div className={[styles["list-item-header"], 'd-flex'].join(' ')}>
                    <p className='mr-auto' title={this.props.list.name}>
                        {this.props.list.name}
                        <span onClick={() => this.editListItem(this.props.list.id)}>
                            <FontAwesomeIcon icon='edit' size='1x'/>
                        </span>
                    </p>
                    <button className={styles["remove-list"]}
                            onClick={() => this.handleListItem(this.props.list.id)}>
                        <FontAwesomeIcon icon='trash-alt' size='1x'/>
                    </button>
                </div>
                {cards}
                <div className={styles["list-item-add-card"]}>
                    <form onSubmit={this.addNewCard}>
                        <label>
                            <p>+ Add new card</p>
                            <input
                                type="text"
                                value={this.state.newCardName}
                                onChange={this.checkNewCardName}
                                placeholder='Enter card name...'/>
                        </label>
                        <div>
                            <button disabled={this.state.newCardName === ''}><span>+</span>Add list</button>
                            <span className={styles["add-card-cancel"]}>&times;</span>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

const stateToProps = state => {
    return {
        singleBoard: state.singleBoard,
        singleBoardLoading: state.singleBoardLoading,
        listToChange: state.listToChange,
    }
};

const dispatchToProps = dispatch => {
    return {
        removeList: (listId, boardId) => dispatch(removeList(listId, boardId)),
        editListName: (newName, listId, boardId) => dispatch(editListName(newName, listId, boardId)),
        addCard: (name, boardId, listId) => dispatch(addCard(name, boardId, listId)),
    }
};

export default connect(stateToProps, dispatchToProps)(withRouter(ListItem));