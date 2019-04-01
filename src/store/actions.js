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
                        ...response.data[key],
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
                let fetchedData = {};
                let fetchedLists = [];

                for (let key in response.data.lists) {
                    fetchedLists.push({
                        ...response.data.lists[key],
                        id: key
                    });
                }

                fetchedData = {
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
            name: name
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


//Start and fail
const start = (target, id) => {
    return {
        type: Actions.START,
        target: target,
        id: id,
    };
};

const fail = (error, target) => {
    return {
        type: Actions.FAIL,
        error: error,
        target: target,
    };
};

//Fetch
const fetchSuccess = (target, data) => {
    return {
        type: Actions.FETCH,
        data: data,
        target: target,
    };
};

export const fetch = (target, id) => {
    return dispatch => {
        dispatch(start(target));

        if (target === 'single') {
            axios.get(`/boards/${id}.json`)
                .then(response => {
                    dispatch(fetchSuccess(target, response.data));
                })
                .catch(error => {
                    dispatch(fail(error, target));
                });
        } else {
            axios.get('/' + target + '.json')
                .then(response => {
                    const fetchedData = [];
                    for (let key in response.data) {
                        fetchedData.push({
                            ...response.data[key],
                            id: key
                        });
                    }
                    dispatch(fetchSuccess(target, fetchedData));
                })
                .catch(error => {
                    dispatch(fail(error, target));
                });
        }
    };
};

//Add
/*
const addBoardSuccess = (data, id) => {
    return {
        type: Actions.ADD_BOARD,
        newBoard: {
            ...data,
            id: id
        }
    };
};

export const addBoard = (name, image) => {
    return dispatch => {
        dispatch(start('boards'));

        const board = {
            name: name,
            image: image
        };

        axios.post('/boards.json', board)
            .then(response => {
                dispatch(addBoardSuccess(board, response.data.name));
            })
            .catch(error => {
                dispatch(fail(error, 'boards'));
            });
    };
};
*/

const addListSudccess = (data, id) => {
    return {
        type: Actions.ADD_LIST,
        newList: {
            ...data,
            id: id
        }
    };
};

export const addLidst = (name, boardId) => {
    return dispatch => {
        dispatch(start('lists'));

        const list = {
            name: name,
            parentId: boardId
        };

        axios.post('/lists.json', list)
            .then(response => {
                dispatch(addListSudccess(list, response.data.name));
            })
            .catch(error => {
                dispatch(fail(error, 'lists'));
            });
    };
};

const addCardSuccess = (data, id) => {
    return {
        type: Actions.ADD_CARD,
        newCard: {
            ...data,
            id: id
        }
    };
};

export const addCard = (name, listId) => {
    return dispatch => {
        dispatch(start('cardsSingle', listId));

        const card = {
            name: name,
            parentId: listId
        };

        axios.post('/cards.json', card)
            .then(response => {
                dispatch(addCardSuccess(card, response.data.name));
            })
            .catch(error => {
                dispatch(fail(error, 'cardsSingle'));
            });
    };
};

//Remove
/*const removeChildrenSuccess = (target, id) => {
    return {
        type: Actions.REMOVE_CHILDREN,
        target: target,
        id: id
        //////////////////
    };
};*/

export const removeChildren = (target, id) => {
    return dispatch => {

    };
};

const removeSuccess = (target, id) => {
    return {
        type: Actions.REMOVE,
        target: target,
        id: id
    };
};

export const remove = (target, id) => {
    return dispatch => {
        dispatch(start(target));

        axios.delete(`/${target}/${id}.json`)
            .then(response => {
                dispatch(removeSuccess(target, id));
                dispatch(removeChildren(target, id));
            })
            .catch(error => {
                dispatch(fail(error, target));
            });
    };
};

const removeCardSingleSuccess = (id) => {
    return {
        type: Actions.REMOVE_CARD,
        id: id
    };
};

export const removeCard = (cardId, listId) => {
    return dispatch => {
        dispatch(start('cardsSingle', listId));

        axios.delete(`/cards/${cardId}.json`)
            .then(response => {
                dispatch(removeCardSingleSuccess(cardId));
            })
            .catch(error => {
                dispatch(fail(error, 'cardsSingle'));
            });
    };
};

/*
//Edit
export const editListNameSuccess = (newName, listId) => {
    return {
        type: Actions.EDIT_LIST_NAME_SUCCESS,
        id: listId,
        newName: newName
    };
};

export const editListNameFail = (error) => {
    return {
        type: Actions.EDIT_LIST_NAME_FAIL,
        error: error,
    };
};

export const editListNameStart = () => {
    return {
        type: Actions.EDIT_LIST_NAME_START
    };
};

export const editListName = (newName, listId) => {
    return dispatch => {
        dispatch(editListNameStart());

        axios.put(`/lists/${listId}/name.json`, newName)
            .then(response => {
                dispatch(editListNameSuccess(newName, listId));
            })
            .catch(error => {
                dispatch(editListNameFail());
            });
    };
};*/
