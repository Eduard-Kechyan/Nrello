import React, {Component} from 'react';
import {
    removeList,
    editListName,
    addCard,
    openCardModal,
    closeCardModal,
    handleCardDesc,
    handleCardName,
    handleCardNewImage,
    saveCardData,
} from "../../../../store/index";
import connect from "react-redux/es/connect/connect";
import Spinner from "../../Spinner/Spinner";
import CardCarousel from "../../../Cards/CardCarousel/CardCarousel";

class CardModal extends Component {
    state = {
        newImage: {
            name: '',
            data: ''
        }
    };

    setImage = (event) => {
        let stateImage = this.state.newImage;
        let newThis = this;

        let newImage = event.target.files[0];
        let imgItem = new Image();
        let reader = new FileReader();
        let newImageItem = {
            name: '',
            data: '',
            w: 0,
            h: 0,
        };

        if (newImage !== undefined) {
            if (newImage.type.includes('image/')) {
                newImageItem.name = newImage.name;
                stateImage.name = newImage.name;
                stateImage.data = URL.createObjectURL(newImage);

                reader.readAsDataURL(newImage);
                reader.onloadend = function () {
                    newImageItem.data = reader.result;

                    imgItem.onload = () => {
                        newImageItem.w = imgItem.width;
                        newImageItem.h = imgItem.height;

                        newThis.setState({newImage: stateImage});
                        newThis.props.handleCardNewImage(newImageItem);
                    };

                    imgItem.src = newImageItem.data;
                };
            } else {
                window.alert('The file must be an image!');
            }
        } else {
            newThis.props.handleCardNewImage('empty');
        }
    };

    saveData = (event) => {
        this.props.saveCardData(
            this.props.singleBoard.boardId,
            this.props.cardModal.listId,
            this.props.cardModal.id,
            this.props.cardModal.data,
        );
    };

    render() {
        return (
            <div
                className={["card-modal", this.props.cardModal.open ? "card-modal-show" : null].join(' ')}>
                <span className="modal-backdrop" onClick={this.props.closeCardModal}></span>
                {this.props.cardModal.loading ? (
                    <div className="card-modal-content">
                        <div className="card-modal-header">
                            <h4>Loading...</h4>
                            <span className="card-modal-close" onClick={this.props.closeCardModal}>&times;</span>
                        </div>
                        <div className="card-modal-body">
                            <Spinner/>
                        </div>
                    </div>
                ) : (
                    <React.Fragment>
                        {this.props.cardModal.data !== null ? (
                            <div className="card-modal-content">
                                <div className="card-modal-header">
                                    <input
                                        type="text"
                                        onChange={(event) => this.props.handleCardName(event.target.value)}
                                        value={this.props.cardModal.data.name}/>
                                    <span className="card-modal-close" onClick={this.props.closeCardModal}>
                                        &times;
                                    </span>
                                </div>
                                <div className="card-modal-body">
                                    {this.props.cardModal.data.images !== undefined &&
                                    this.props.cardModal.data.images.length > 0 ? (
                                        <CardCarousel/>
                                    ) : null}

                                    <div className="card-modal-images">
                                        <form>
                                            {this.props.cardModal.data.newImage !== undefined &&
                                            this.props.cardModal.data.newImage !== null ? (
                                                <div className="card-modal-images-new">
                                                    <div>
                                                        <img
                                                            src={this.state.newImage.data}
                                                            alt={this.state.newImage.name}/>
                                                        <span>
                                                            {this.props.cardModal.data.newImage.w}
                                                            <em>x</em>
                                                            {this.props.cardModal.data.newImage.h}
                                                        </span>
                                                        <span>{this.props.cardModal.data.newImage.name}</span>
                                                    </div>
                                                </div>
                                            ) : null}

                                            <label className="image-selected">
                                                <span className="add"><span>+</span> Add Image</span>
                                                <input
                                                    onChange={(event) => this.setImage(event)}
                                                    type="file"
                                                    accept="image/*"/>
                                            </label>
                                        </form>
                                    </div>

                                    <label>
                                        <p>Description:</p>
                                        <textarea
                                            onChange={(event) => this.props.handleCardDesc(event.target.value)}
                                            value={this.props.cardModal.data.desc}>
                                            Loading...
                                        </textarea>
                                    </label>

                                    {this.props.cardModal.saved ? (
                                        <h4>Successfully saved!</h4>
                                    ) : (
                                        <React.Fragment>
                                            {this.props.cardModal.canSave ? (
                                                <button onClick={this.saveData}>Click to save</button>
                                            ) : (
                                                <button disabled>Nothing to save</button>
                                            )}
                                        </React.Fragment>
                                    )}
                                </div>
                            </div>
                        ) : null}
                    </React.Fragment>
                )}
            </div>
        );
    }
}

const stateToProps = state => {
    return {
        singleBoard: state.singleBoard,
        cardModal: state.cardModal,
    }
};

const dispatchToProps = dispatch => {
    return {
        removeList: (listId, boardId) => dispatch(removeList(listId, boardId)),
        editListName: (newName, listId, boardId) => dispatch(editListName(newName, listId, boardId)),
        addCard: (name, boardId, listId) => dispatch(addCard(name, boardId, listId)),
        openCardModal: (id) => dispatch(openCardModal(id)),
        closeCardModal: () => dispatch(closeCardModal()),
        handleCardDesc: (desc) => dispatch(handleCardDesc(desc)),
        handleCardName: (name) => dispatch(handleCardName(name)),
        handleCardNewImage: (image) => dispatch(handleCardNewImage(image)),
        saveCardData: (boardId, listId, cardId, data) => dispatch(saveCardData(boardId, listId, cardId, data)),
    }
};

export default connect(stateToProps, dispatchToProps)(CardModal);