import React, {Component} from 'react';
import Layout from './hoc/Layout/Layout';
import {library} from '@fortawesome/fontawesome-svg-core';
import {
    faBars,
    faHome,
    faPlus,
    faClipboardList,
    faStar,
    faTrashAlt,
    faEdit,
} from '@fortawesome/free-solid-svg-icons';

library.add(
    faBars,
    faHome,
    faPlus,
    faClipboardList,
    faStar,
    faTrashAlt,
    faEdit,
);

class App extends Component {
    render() {
        return (

            <React.Fragment>
                <Layout/>
            </React.Fragment>
        );
    }
}

export default App;
