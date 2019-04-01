import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addBoard} from '../../../../store/index';
import ImageItem from './ImageItem';
import {withRouter} from "react-router";

let unavailableNames = [];

class BoardModal extends Component {
    state = {
        name: '',
        image: '1.png',
        images: ['1.png', '2.jpeg', '3.jpg', '4.jpeg', '5.png', '6.png', '7.png', '8.png', '9.png'],
        hasName: false
    };

    componentWillUpdate() {
        unavailableNames = this.props.boards.map(board => {
            return board.name;
        });
    };

    checkNewBoardName = (event) => {
        let newName = this.state.name;

        if (event.target.value !== '') {
            newName = event.target.value;
            this.setState({name: newName, hasName: true});
        } else {
            this.setState({name: '', hasName: false});
        }
    };

    changeNewBoardImage = (name) => {
        let newImage = this.state.image;
        newImage = name;

        this.setState({image: newImage});
    };

    resetAndClose = () => {
        this.setState({
            name: '',
            image: '1.png',
            hasName: false
        });

        this.props.close();
    };

    add = () => {
        if (unavailableNames.length > 0) {
            if (unavailableNames.indexOf(this.state.name) === -1) {
                this.props.addNewBoard(this.state.name, this.state.image);

                if (this.props.location.pathname !== '/boards') {
                    this.props.history.push('/');
                }

                this.resetAndClose();
            } else {
                window.alert('A board with that name already exists!');
            }
        } else {
            console.log('Was unable to check if a board with the same name already exists!');

            this.props.addNewBoard(this.state.name, this.state.image);
            this.resetAndClose();
        }
    };

    render() {
        return (
            <div className={["board-modal", this.props.show ? "board-modal-show" : null].join(' ')}>
                <span className="board-modal-backdrop" onClick={this.resetAndClose}></span>
                <div className="board-modal-content d-flex flex-wrap">
                    <div className="board-modal-add">
                        <div className="board-modal-add-card">
                            <img src={'/images/' + this.state.image} alt={this.state.image}/>
                            <span className="board-close" onClick={this.resetAndClose}>&times;</span>
                            <input
                                type='text'
                                value={this.state.name}
                                onChange={this.checkNewBoardName}
                                placeholder="Add new board"/>
                        </div>
                    </div>
                    <div className="board-modal-add-image d-flex justify-content-between flex-wrap">
                        {this.state.images.map(image => (
                            <ImageItem
                                key={image}
                                current={this.state.image}
                                name={image}
                                change={this.changeNewBoardImage}/>
                        ))}
                    </div>
                    <div className="board-modal-add-btn">
                        <button disabled={!this.state.hasName} onClick={this.add}>Create Board</button>
                    </div>
                </div>
            </div>
        );
    }
}

const stateToProps = state => {
    return {
        boards: state.boards
    }
};

const dispatchToProps = dispatch => {
    return {
        addNewBoard: (name, image) => dispatch(addBoard(name, image))
    }
};

export default connect(stateToProps, dispatchToProps)(withRouter(BoardModal));