import {Actions} from './actionHandlers';

const initialState = {
    boards: [],
    boardLoading: false,
    boardToRemove: {
        loading: false,
        boardId: null
    },
    singleBoard: {
        boardId: '',
        lists: []
    },
    singleBoardLoading: false,
    listLoading: false,
    listToChange: {
        loading: false,
        listId: null
    },
    cardModal: {
        loading: false,
        open: false,
        listId: null,
        listName: null,
        id: null,
        data: null,
        canSave: false,
        saved: false,
    }
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        //Board
        case Actions.FETCH_BOARD_START:
            return {
                ...state,
                boardLoading: true
            };
        case Actions.FETCH_BOARD_FAIL:
            return {
                ...state,
                boardLoading: false
            };
        case Actions.FETCH_BOARD_SUCCESS:
            return {
                ...state,
                boardLoading: false,
                boards: action.data
            };
        case Actions.ADD_BOARD_START:
            return {
                ...state,
                boardLoading: true
            };
        case Actions.ADD_BOARD_FAIL:
            return {
                ...state,
                boardLoading: false
            };
        case Actions.ADD_BOARD_SUCCESS:
            return {
                ...state,
                boardLoading: false,
                boards: state.boards.concat(action.newBoard)
            };
        case Actions.REMOVE_BOARD_START:
            return {
                ...state,
                boardToRemove: {
                    loading: true,
                    boardId: action.id
                }
            };
        case Actions.REMOVE_BOARD_FAIL:
            return {
                ...state,
                boardToRemove: {
                    loading: false,
                    boardId: null
                }
            };
        case Actions.REMOVE_BOARD_SUCCESS:
            return {
                ...state,
                boardToRemove: {
                    loading: false,
                    boardId: null
                },
                boards: state.boards.filter(item => item.id !== action.id)
            };
        //Single Board
        case Actions.FETCH_SINGLE_BOARD_START:
            return {
                ...state,
                singleBoardLoading: true
            };
        case Actions.FETCH_SINGLE_BOARD_FAIL:
            return {
                ...state,
                singleBoardLoading: false
            };
        case Actions.FETCH_SINGLE_BOARD_SUCCESS:
            return {
                ...state,
                singleBoardLoading: false,
                singleBoard: {
                    ...action.data,
                    boardId: action.boardId,
                }
            };
        //List
        case Actions.ADD_LIST_START:
            return {
                ...state,
                listLoading: true
            };
        case Actions.ADD_LIST_FAIL:
            return {
                ...state,
                listLoading: false
            };
        case Actions.ADD_LIST_SUCCESS:
            return {
                ...state,
                listLoading: false,
                singleBoard: {
                    ...state.singleBoard,
                    lists: state.singleBoard.lists.concat(action.newList)
                }
            };
        case Actions.REMOVE_LIST_START:
            return {
                ...state,
                listToChange: {
                    loading: true,
                    listId: action.id
                }
            };
        case Actions.REMOVE_LIST_FAIL:
            return {
                ...state,
                listToChange: {
                    loading: false,
                    listId: null
                }
            };
        case Actions.REMOVE_LIST_SUCCESS:
            return {
                ...state,
                listToChange: {
                    loading: false,
                    listId: null
                },
                singleBoard: {
                    ...state.singleBoard,
                    lists: state.singleBoard.lists.filter(item => item.id !== action.id)
                }
            };
        case Actions.EDIT_LIST_START:
            return {
                ...state,
                listToChange: {
                    loading: true,
                    listId: action.id
                }
            };
        case Actions.EDIT_LIST_FAIL:
            return {
                ...state,
                listToChange: {
                    loading: false,
                    listId: null
                }
            };
        case Actions.EDIT_LIST_SUCCESS:
            let listItem = state.singleBoard.lists.filter(item => item.id === action.id);
            listItem[0].name = action.newName;

            return {
                ...state,
                listToChange: {
                    loading: false,
                    listId: null
                },
                singleBoard: {
                    ...state.singleBoard,
                }
            };
        //Card
        case Actions.ADD_CARD_START:
            return {
                ...state,
                listToChange: {
                    loading: true,
                    listId: action.id
                }
            };
        case Actions.ADD_CARD_FAIL:
            return {
                ...state,
                listToChange: {
                    loading: false,
                    listId: null
                },
            };
        case Actions.ADD_CARD_SUCCESS:
            let listItemToChange = state.singleBoard.lists.filter(item => item.id === action.listId);
            listItemToChange[0].cards = listItemToChange[0].cards.concat(action.newCard);

            return {
                ...state,
                listToChange: {
                    loading: false,
                    listId: null
                },
                singleBoard: {
                    ...state.singleBoard,
                }
            };

        case Actions.OPEN_CARD_MODAL_START:
            return {
                ...state,
                cardModal: {
                    ...state.cardModal,
                    loading: true,
                    open: true,
                }
            };
        case Actions.OPEN_CARD_MODAL_FAIL:
            return {
                ...state,
                cardModal: {
                    ...state.cardModal,
                    loading: false,
                    listId: null,
                    listName: null,
                    id: null,
                    data: null,
                }
            };
        case Actions.OPEN_CARD_MODAL_SUCCESS:
            return {
                ...state,
                cardModal: {
                    ...state.cardModal,
                    loading: false,
                    id: action.cardId,
                    listId: action.listId,
                    listName: action.listName,
                    data: action.cardData
                }
            };
        case Actions.CLOSE_CARD_MODAL:
            return {
                ...state,
                cardModal: {
                    ...state.cardModal,
                    loading: false,
                    open: false,
                    id: null,
                    data: null
                }
            };

        case Actions.HANDLE_CARD_DESC:
            return {
                ...state,
                cardModal: {
                    ...state.cardModal,
                    data: {
                        ...state.cardModal.data,
                        desc: action.desc,
                    },
                    canSave: true
                }
            };
        case Actions.HANDLE_CARD_NAME:
            return {
                ...state,
                cardModal: {
                    ...state.cardModal,
                    data: {
                        ...state.cardModal.data,
                        name: action.name,
                    },
                    canSave: true
                }
            };
        case Actions.HANDLE_CARD_IMAGE:
            if (action.empty) {
                return {
                    ...state,
                    cardModal: {
                        ...state.cardModal,
                        data: {
                            ...state.cardModal.data,
                            newImage: null,
                        },
                        canSave: false
                    }
                };
            } else {
                return {
                    ...state,
                    cardModal: {
                        ...state.cardModal,
                        data: {
                            ...state.cardModal.data,
                            newImage: action.newImage,
                        },
                        canSave: true
                    }
                };
            }

        case Actions.REMOVE_CARD_IMAGE:
            return {
                ...state,
                cardModal: {
                    ...state.cardModal,
                    loading: true,
                    data: {
                        ...state.cardModal.data,
                        images: state.cardModal.data.images.filter(item => item.id !== action.id),
                    },
                    canSave: true
                }
            };
        case Actions.REMOVE_CARD_IMAGE_AFTER:
            return {
                ...state,
                cardModal: {
                    ...state.cardModal,
                    loading: false,
                }
            };

        case Actions.SAVE_CARD_DATA_START:
            return {
                ...state,
                cardModal: {
                    ...state.cardModal,
                    loading: true,
                }
            };
        case Actions.SAVE_CARD_DATA_FAIL:
            return {
                ...state,
                cardModal: {
                    ...state.cardModal,
                    loading: false,
                    canSave: false,
                }
            };
        case Actions.SAVE_CARD_DATA_SUCCESS:
            return {
                ...state,
                cardModal: {
                    ...state.cardModal,
                    data: action.newData,
                    loading: false,
                    canSave: false,
                    saved: true,
                }
            };
        case Actions.SAVE_CARD_DATA_SUCCESS_AFTER:
            return {
                ...state,
                cardModal: {
                    ...state.cardModal,
                    saved: false,
                }
            };
        default:
            return state;
    }
};

export default reducer;