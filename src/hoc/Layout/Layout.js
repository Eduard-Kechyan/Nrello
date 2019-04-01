import React, {Component} from 'react';
import styles from './Layout.module.scss';
import {Route, Switch, Redirect} from 'react-router-dom';
import {withRouter} from "react-router";
import Boards from '../../views/Boards/Boards';
import SingleBoard from '../../views/SingleBoard/SingleBoard';
import Header from '../../components/Header/Header';
import BoardsPanel from '../../components/BoardsPanel/BoardsPanel';
import BoardModal from '../../components/UI/Modal/BoardModal/BoardModal';

class Layout extends Component {
    state = {
        boardsPanelOpen: false,
        adding: false,
    };

    componentWillMount() {
        let newState = this.state.boardsPanelOpen;
        let getInfo = localStorage.getItem('boardsPanelOpen');

        newState = JSON.parse(getInfo);
        this.setState({boardsPanelOpen: newState});
    };

    toggleBoardsPanel = () => {
        this.setState({boardsPanelOpen: !this.state.boardsPanelOpen});

        let newState = !this.state.boardsPanelOpen;

        localStorage.setItem('boardsPanelOpen', newState);

        this.setState({nav: newState});
    };

    closeAddingModal = () => {
        this.setState({adding: false});
    };

    openAddingModal = () => {
        this.setState({adding: true});
    };

    render() {
        return (
            <React.Fragment>
                <Header
                    toggleBoardsPanel={this.toggleBoardsPanel}
                    addNewBoard={this.openAddingModal}
                    boardsPanelOpen={this.state.boardsPanelOpen}
                    path={this.props.location.pathname}/>
                <BoardsPanel
                    toggleBoardsPanel={this.toggleBoardsPanel}
                    addNewBoard={this.openAddingModal}
                    boardsPanelOpen={this.state.boardsPanelOpen}/>

                <div className={[
                    styles["layout-content"],
                    this.state.boardsPanelOpen ? styles["layout-content-opened"] : null
                ].join(' ')}>
                    <Switch>
                        <Route path='/single-board/:id' component={SingleBoard}/>
                        <Route path='/boards' exact render={() => (
                            <Boards
                                addNewBoard={this.openAddingModal}
                                boardsPanelOpen={this.state.boardsPanelOpen}/>
                        )}/>
                        <Redirect from="/" to="/boards" exact/>
                    </Switch>
                </div>

                <BoardModal show={this.state.adding} close={this.closeAddingModal}/>
            </React.Fragment>
        );
    }
}

export default withRouter(Layout);