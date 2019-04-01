import React, {Component} from 'react';
import styles from './SingleBoard.module.scss';
/*import {fetch, remove, addList} from "../../store/index";*/
import {removeBoard, fetchSingleBoard, addList, removeList} from "../../store/index";
import connect from "react-redux/es/connect/connect";
import SingleHeader from '../../components/Header/SingleHeader';
import AddNewList from '../../components/Lists/AddNewList/AddNewList';
import ListItem from '../../components/Lists/ListItem/ListItem';
import Spinner from "../../components/UI/Spinner/Spinner";

class SingleBoard extends Component {
    state = {
        newListName: ''
    };

    componentWillMount() {
        this.props.fetchSingleBoard(this.props.match.params.id);
    };

    removeSingleBoard = () => {
        if (window.confirm("Are you sure you want to delete this board? It can't be undone!")) {
            this.props.removeBoard(this.props.match.params.id);
            this.props.history.push('/');
        }
    };

    checkNewListName = (event) => {
        let getListName = event.target.value;
        this.setState({newListName: getListName});
    };

    addNewList = (event) => {
        event.preventDefault();

        if (this.state.newListName !== '') {
            this.props.addList(this.state.newListName, this.props.match.params.id);
            this.setState({newListName: ''});
        }
    };

    removeThisList = (id) => {
        if (window.confirm("Are you sure you want to delete this list? It can't be undone!")) {
            this.props.removeList(id, this.props.match.params.id);
        }
    };

    render() {
        let listLoadingSpinner = <div className={styles["single-board-list-loading"]}><Spinner/></div>;
        let image = 'loading.png';
        let name = 'Loading...';

        if (!this.props.singleLoading) {
            name = this.props.singleBoard.name;
            image = this.props.singleBoard.image;

            if (!this.props.listLoading) {
                listLoadingSpinner = null;
            }
        }

        return (
            <div className={styles["single-board"]}>
                <div className={styles["single-board-bg"]}>
                    <img src={'/images/' + image} alt={image}/>
                </div>
                <SingleHeader
                    name={name}
                    remove={this.removeSingleBoard}/>
                <div className={styles["single-board-content"]}>
                    {this.props.singleBoard.lists.length > 0 ?
                        this.props.singleBoard.lists.map(list => (
                            <ListItem
                                key={list.id}
                                list={list}
                                removeList={() => this.removeThisList(list.id)}/>
                        )) : null
                    }
                    {listLoadingSpinner}
                    <AddNewList
                        addNewList={this.addNewList}
                        checkNewListName={this.checkNewListName}
                        newListName={this.state.newListName}/>
                </div>
            </div>
        );
    }
}

const stateToProps = state => {
    return {
        singleBoard: state.singleBoard,
        singleBoardLoading: state.singleBoardLoading,
        listLoading: state.listLoading,
    }
};

const dispatchToProps = dispatch => {
    return {
        fetchSingleBoard: (id) => dispatch(fetchSingleBoard(id)),
        removeBoard: (id) => dispatch(removeBoard(id)),
        addList: (name, boardId) => dispatch(addList(name, boardId)),
        removeList: (id, boardId) => dispatch(removeList(id, boardId)),
        /*     fetch: (target, id) => dispatch(fetch(target, id)),
             remove: (target, id) => dispatch(remove(target, id)),
             addList: (name, boardId) => dispatch(addList(name, boardId)),*/
    }
};

export default connect(stateToProps, dispatchToProps)(SingleBoard);