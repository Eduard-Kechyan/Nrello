import React, {Component} from 'react';
import styles from './ListItem.module.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
/*import {addCard, remove, removeCard} from "../../../store/index";*/
import {removeList} from "../../../store/index";
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
            this.props.addCard(this.state.newCardName, this.props.list.id);
            this.setState({newCardName: ''});
        }
    };

    render() {
        let cards = (
            <div className={styles["list-item-wrapper"]}>
                <div className={styles["list-item-content"]}>
                    <Spinner/>
                </div>
            </div>
        );

        if (!this.props.cardsLoading) {
            if (this.props.cards.length > 0) {
                cards = (
                    <div className={styles["list-item-wrapper"]}>
                        <div className={styles["list-item-content"]}>
                            {this.props.cards.map(card => {
                                if (card.parentId === this.props.list.id) {
                                    return <p
                                        onClick={() => this.props.removeCard(card.id, this.props.list.id)}
                                        key={card.id}> {card.name} </p>;
                                } else {
                                    return null;
                                }
                            })}
                        </div>
                    </div>
                )
            } else {
                cards = null;
            }
        }

        if (this.props.cardsSingle.loading) {
            if (this.props.cardsSingle.listId === this.props.list.id) {
                cards = (
                    <div className={styles["list-item-wrapper"]}>
                        <div className={styles["list-item-content"]}>
                            <Spinner/>
                        </div>
                    </div>
                );
            }
        }

        return (
            <div className={styles["list-item"]}>
                <div className={[styles["list-item-header"], 'd-flex'].join(' ')}>
                    <p className='mr-auto' title={this.props.list.name}>
                        {this.props.list.name}
                        <span onClick={() => this.props.editListName('Test 001', this.props.list.id)}>
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
        cards: state.cards,
        cardsLoading: state.cardsLoading,
        cardsSingle: state.cardsSingle,
    }
};

const dispatchToProps = dispatch => {
    return {
        removeList: (listId, boardId) => dispatch(removeList(listId, boardId)),
        /*addCard: (name, listId) => dispatch(addCard(name, listId)),
        remove: (target, id) => dispatch(remove(target, id)),
        removeCard: (cardId, listId) => dispatch(removeCard(cardId, listId)),
        editListName: (newName, listId) => dispatch(editListName(newName, listId)),*/
    }
};

export default connect(stateToProps, dispatchToProps)(withRouter(ListItem));