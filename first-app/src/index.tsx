import React from 'react';
import ReactDOM from 'react-dom';
import UserSearch from './refs/UserSearch';

const App = () => {
    return <UserSearch />;
};

ReactDOM.render(<App />, document.querySelector('#root'));
