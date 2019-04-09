import {Actions} from './actionHandlers';

const initialState = {
    boards: [],
    boardLoading: false,
    boardToRemove: {
        loading: false,
        boardId: null
    },
    singleBoard: {
        boardId:'',
        lists: []
    },
    singleBoardLoading: false,
    listLoading: false,
    listToChange: {
        loading: false,
        listId: null
    },


    lists: [],
    cards: [],
    listsLoading: false,
    cardsLoading: false,
    cardsSingle: {
        loading: false,
        listId: null
    },
};

const boards = (state = initialState, action) => {
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
                    boardId:action.boardId,
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








        //Start and fail
        case Actions.START:
            return handleStart(state, action);
        case Actions.FAIL:
            return handleFail(state, action);
        //Fetch
        case Actions.FETCH:
            return handleFetch(state, action);
        //Add
        case Actions.ADD_BOARD:
            return {
                ...state,
                boards: state.boards.concat(action.newBoard),
                boardsLoading: false
            };
        case Actions.ADD_LIST:
            return {
                ...state,
                lists: state.lists.concat(action.newList),
                listsLoading: false
            };
        case Actions.ADD_CARD:
            return {
                ...state,
                cards: state.cards.concat(action.newCard),
                cardsSingle: {
                    loading: false,
                    listId: null
                }
            };
        //Remove
        case Actions.REMOVE:
            return handleRemove(state, action);
        case Actions.REMOVE_CARD:
            return {
                ...state,
                cards: state.cards.filter(item => item.id !== action.id),
                cardsSingle: {
                    loading: false,
                    listId: null
                },
            };
        default:
            return state;
    }
};

const handleStart = (state, action) => {
    switch (action.target) {
        case 'boards':
            return {
                ...state,
                boardsLoading: true
            };
        case 'lists':
            return {
                ...state,
                listsLoading: true
            };
        case 'cards':
            return {
                ...state,
                cardsLoading: true
            };
        case 'cardsSingle':
            return {
                ...state,
                cardsSingle: {
                    loading: true,
                    listId: action.id
                }
            };
        case 'single':
            return {
                ...state,
                singleLoading: true
            };
        default:
            return state;
    }
};

const handleFail = (state, action) => {
    switch (action.target) {
        case 'boards':
            return {
                ...state,
                boardsLoading: false
            };
        case 'lists':
            return {
                ...state,
                listsLoading: false
            };
        case 'cards':
            return {
                ...state,
                cardsLoading: false
            };
        case 'cardsSingle':
            return {
                ...state,
                cardsSingle: {
                    loading: false,
                    listId: null
                }
            };
        case 'single':
            return {
                ...state,
                singleLoading: false
            };
        default:
            return state;
    }
};

const handleFetch = (state, action) => {
    switch (action.target) {
        case 'boards':
            return {
                ...state,
                boards: action.data,
                boardsLoading: false
            };
        case 'lists':
            return {
                ...state,
                lists: action.data,
                listsLoading: false
            };
        case 'cards':
            return {
                ...state,
                cards: action.data,
                cardsLoading: false
            };
        case 'single':
            return {
                ...state,
                singleBoard: action.data,
                singleLoading: false
            };
        default:
            return state;
    }
};

const handleRemove = (state, action) => {
    switch (action.target) {
        case 'boards':
            return {
                ...state,
                boards: state.boards.filter(item => item.id !== action.id),
                boardsLoading: false
            };
        case 'lists':
            return {
                ...state,
                lists: state.lists.filter(item => item.id !== action.id),
                listsLoading: false
            };
        case 'cards':
            return {
                ...state,
                cards: state.cards.filter(item => item.id !== action.id),
                cardsSingle: {
                    loading: false,
                    listId: null
                },
            };
        default:
            return state;
    }
};

export default boards;