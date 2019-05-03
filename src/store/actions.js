import axios from '../axios-orders';
import {Actions} from './actionHandlers';

//Board
const fetchBoardStart = () => {
    return {
        type: Actions.FETCH_BOARD_START
    };
};

const fetchBoardFail = (error) => {
    return {
        type: Actions.FETCH_BOARD_FAIL,
        error: error,
    };
};

const fetchBoardSuccess = (data) => {
    return {
        type: Actions.FETCH_BOARD_SUCCESS,
        data: data
    };
};

export const fetchBoard = () => {
    return dispatch => {
        dispatch(fetchBoardStart());

        axios.get('/boards.json')
            .then(response => {
                const fetchedData = [];
                for (let key in response.data) {
                    fetchedData.push({
                        image: response.data[key].image,
                        name: response.data[key].name,
                        id: key
                    });
                }
                dispatch(fetchBoardSuccess(fetchedData));
            })
            .catch(error => {
                dispatch(fetchBoardFail(error));
            });
    };
};


const addBoardStart = () => {
    return {
        type: Actions.ADD_BOARD_START
    };
};

const addBoardFail = (error) => {
    return {
        type: Actions.ADD_BOARD_FAIL,
        error: error,
    };
};

const addBoardSuccess = (data, id) => {
    return {
        type: Actions.ADD_BOARD_SUCCESS,
        newBoard: {
            ...data,
            id: id
        }
    };
};

export const addBoard = (name, image) => {
    return dispatch => {
        dispatch(addBoardStart());

        const board = {
            name: name,
            image: image
        };

        axios.post('/boards.json', board)
            .then(response => {
                dispatch(addBoardSuccess(board, response.data.name));
            })
            .catch(error => {
                dispatch(addBoardFail(error));
            });
    };
};


const removeBoardStart = (id) => {
    return {
        type: Actions.REMOVE_BOARD_START,
        id: id
    };
};

const removeBoardFail = (error) => {
    return {
        type: Actions.REMOVE_BOARD_FAIL,
        error: error,
    };
};

const removeBoardSuccess = (id) => {
    return {
        type: Actions.REMOVE_BOARD_SUCCESS,
        id: id
    };
};

export const removeBoard = (id) => {
    return dispatch => {
        dispatch(removeBoardStart(id));

        axios.delete('/boards/' + id + '.json')
            .then(response => {
                dispatch(removeBoardSuccess(id));
            })
            .catch(error => {
                dispatch(removeBoardFail(error));
            });
    };
};


//Single Board
const fetchSingleBoardStart = () => {
    return {
        type: Actions.FETCH_SINGLE_BOARD_START
    };
};

const fetchSingleBoardFail = (error) => {
    return {
        type: Actions.FETCH_SINGLE_BOARD_FAIL,
        error: error,
    };
};

const fetchSingleBoardSuccess = (data, boardId) => {
    return {
        type: Actions.FETCH_SINGLE_BOARD_SUCCESS,
        data: data,
        boardId: boardId
    };
};

export const fetchSingleBoard = (id) => {
    return dispatch => {
        dispatch(fetchSingleBoardStart());

        axios.get(`/boards/${id}.json`)
            .then(response => {
                let fetchedLists = [];

                for (let key in response.data.lists) {
                    fetchedLists.push({
                        ...response.data.lists[key],
                        id: key
                    });
                }

                for (let listKey in fetchedLists) {
                    let fetchedCards = [];

                    if (fetchedLists[listKey].cards !== undefined) {
                        for (let cardKey in fetchedLists[listKey].cards) {
                            fetchedCards.push({
                                name: fetchedLists[listKey].cards[cardKey].name,
                                id: cardKey
                            });
                        }
                    }

                    fetchedLists[listKey].cards = fetchedCards;
                }

                let fetchedData = {
                    ...response.data,
                    lists: fetchedLists
                };

                dispatch(fetchSingleBoardSuccess(fetchedData, id));
            })
            .catch(error => {
                dispatch(fetchSingleBoardFail(error));
            });
    };
};


//List
const addListStart = () => {
    return {
        type: Actions.ADD_LIST_START
    };
};

const addListFail = (error) => {
    return {
        type: Actions.ADD_LIST_FAIL,
        error: error,
    };
};

const addListSuccess = (data, id) => {
    return {
        type: Actions.ADD_LIST_SUCCESS,
        newList: {
            ...data,
            id: id
        }
    };
};

export const addList = (name, boardId) => {
    return dispatch => {
        dispatch(addListStart());

        const list = {
            name: name,
            cards: []
        };

        axios.post('/boards/' + boardId + '/lists/.json', list)
            .then(response => {
                dispatch(addListSuccess(list, response.data.name));
            })
            .catch(error => {
                dispatch(addListFail(error));
            });
    };
};


const removeListStart = (id) => {
    return {
        type: Actions.REMOVE_LIST_START,
        id: id
    };
};

const removeListFail = (error) => {
    return {
        type: Actions.REMOVE_LIST_FAIL,
        error: error,
    };
};

const removeListSuccess = (id) => {
    return {
        type: Actions.REMOVE_LIST_SUCCESS,
        id: id
    };
};

export const removeList = (id, boardId) => {
    return dispatch => {
        dispatch(removeListStart(id));

        axios.delete('/boards/' + boardId + '/lists/' + id + '.json')
            .then(response => {
                dispatch(removeListSuccess(id));
            })
            .catch(error => {
                dispatch(removeListFail(error));
            });
    };
};


const editListNameStart = (listId) => {
    return {
        type: Actions.EDIT_LIST_START,
        id: listId,
    };
};

const editListNameFail = (error) => {
    return {
        type: Actions.EDIT_LIST_FAIL,
        error: error,
    };
};

const editListNameSuccess = (newName, listId) => {
    return {
        type: Actions.EDIT_LIST_SUCCESS,
        id: listId,
        newName: newName
    };
};

export const editListName = (newName, listId, boardId) => {
    return dispatch => {
        dispatch(editListNameStart(listId));

        axios.patch('/boards/' + boardId + '/lists/' + listId + '.json', {"name": newName})
            .then(response => {
                dispatch(editListNameSuccess(newName, listId));
            })
            .catch(error => {
                dispatch(editListNameFail());
            });
    };
};


//Card
const addCardStart = (id) => {
    return {
        type: Actions.ADD_CARD_START,
        id: id
    };
};

const addCardFail = (error) => {
    return {
        type: Actions.ADD_CARD_FAIL,
        error: error,
    };
};

const addCardSuccess = (data, id, listId) => {
    return {
        type: Actions.ADD_CARD_SUCCESS,
        listId: listId,
        newCard: {
            ...data,
            id: id
        }
    };
};

export const addCard = (name, boardId, listId) => {
    return dispatch => {
        dispatch(addCardStart(listId));

        const card = {
            name: name,
            desc: 'Description!',
            images: [],
            newImage: null
        };

        axios.post('/boards/' + boardId + '/lists/' + listId + '/cards/.json', card)
            .then(response => {
                dispatch(addCardSuccess(card, response.data.name, listId));
            })
            .catch(error => {
                dispatch(addCardFail(error));
            });
    };
};


const openCardModalStart = () => {
    return {
        type: Actions.OPEN_CARD_MODAL_START
    };
};

const openCardModalFail = (error) => {
    return {
        type: Actions.OPEN_CARD_MODAL_FAIL,
        error: error,
    };
};

const openCardModalSuccess = (cardId, listId, listName, cardData) => {
    return {
        type: Actions.OPEN_CARD_MODAL_SUCCESS,
        cardId: cardId,
        listId: listId,
        listName: listName,
        cardData: cardData
    };
};

export const openCardModal = (boardId, listId, listName, cardId) => {
    return dispatch => {
        dispatch(openCardModalStart());

        axios.get('/boards/' + boardId + '/lists/' + listId + '/cards/' + cardId + '.json')
            .then(response => {
                let fetchedData = response.data;

                if (fetchedData.images !== undefined) {
                    const fetchedImages = [];

                    for (let key in fetchedData.images) {
                        fetchedImages.push({
                            ...fetchedData.images[key]
                        });
                    }

                    fetchedData.images = fetchedImages;
                }

                dispatch(openCardModalSuccess(cardId, listId, listName, fetchedData));
            })
            .catch(error => {
                dispatch(openCardModalFail(error));
            });
    };
};

export const closeCardModal = () => {
    return {
        type: Actions.CLOSE_CARD_MODAL
    };
};


export const handleCardDesc = (desc) => {
    return {
        type: Actions.HANDLE_CARD_DESC,
        desc: desc
    };
};

export const handleCardName = (name) => {
    return {
        type: Actions.HANDLE_CARD_NAME,
        name: name
    };
};

export const handleCardNewImage = (image) => {
    let possibleIdItems = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let randomId = "";
    let empty = false;

    if (image === 'empty') {
        empty = true;
    }

    for (let i = 0; i < 20; i++) {
        randomId += possibleIdItems.charAt(Math.floor(Math.random() * possibleIdItems.length));
    }

    return {
        type: Actions.HANDLE_CARD_IMAGE,
        empty: empty,
        newImage: {
            ...image,
            id: randomId
        }
    };
};

const removeCardImageSuccess = (id) => {
    return {
        type: Actions.REMOVE_CARD_IMAGE,
        id: id
    };
};

const removeCardImageSuccessAfter = () => {
    return {
        type: Actions.REMOVE_CARD_IMAGE_AFTER,
    };
};

export const removeCardImage = (id) => {
    return dispatch => {
        dispatch(removeCardImageSuccess(id));

        setTimeout(() => {
            dispatch(removeCardImageSuccessAfter());
        }, 1300);
    };
};

const saveCardDataStart = () => {
    return {
        type: Actions.SAVE_CARD_DATA_START
    };
};

const saveCardDataFail = (error) => {
    return {
        type: Actions.SAVE_CARD_DATA_FAIL,
        error: error
    };
};

const saveCardDataSuccess = (newData) => {
    return {
        type: Actions.SAVE_CARD_DATA_SUCCESS,
        newData: newData
    };
};

const saveCardDataSuccessAfter = () => {
    return {
        type: Actions.SAVE_CARD_DATA_SUCCESS_AFTER,
    };
};

export const saveCardData = (boardId, listId, cardId, data) => {
    return dispatch => {
        dispatch(saveCardDataStart());
        let newData = {};
        let newImages = [];

        if (data.newImage !== null && data.newImage !== undefined) {
            if (data.images !== undefined) {
                newData = {
                    ...data,
                    images: data.images.concat(data.newImage),
                    newImage: null
                };
            } else {
                newImages.push(data.newImage);

                newData = {
                    ...data,
                    images: newImages,
                    newImage: null
                };
            }
        } else {
            newData = data;
        }

        axios.put(
            '/boards/' + boardId + '/lists/' + listId + '/cards/' + cardId + '.json', newData)
            .then(response => {
                dispatch(saveCardDataSuccess(newData));

                setTimeout(() => {
                    dispatch(saveCardDataSuccessAfter());
                }, 3000);
            })
            .catch(error => {
                dispatch(saveCardDataFail(error));
            });
    };
};