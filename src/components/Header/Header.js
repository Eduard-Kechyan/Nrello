import React from 'react';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const Header = (props) => {
    return (
        <header
            className={[
                'd-flex justify-content-between',
                props.path === '/boards' ? 'header-boards' : null,
                props.boardsPanelOpen ? 'header-closed' : null,
            ].join(' ')}>
            <div className='header-left d-flex'>
                <Link className='header-btn header-btn-icon' to="/">
                    <span>
                        <FontAwesomeIcon icon='home' size='1x'/>
                    </span>
                </Link>
                <button onClick={props.toggleBoardsPanel} className='header-btn header-btn-add'>
                        <span>
                            <FontAwesomeIcon icon='clipboard-list' size='1x'/>
                        </span>
                    Boards
                </button>
            </div>
            <Link className='header-logo' to="/">Nrello</Link>
            <div className='header-right d-flex'>
                <button onClick={props.addNewBoard} className='header-btn header-btn-icon'>
                        <span>
                            <FontAwesomeIcon icon='plus' size='1x'/>
                        </span>
                </button>
                <Link className='header-user' to="/">
                    <img src='/images/John Smith.png' alt='John Smith'/>
                </Link>
            </div>
        </header>
    );
};

export default Header;