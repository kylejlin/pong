import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Pong from './Pong';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Pong />, document.getElementById('root'));
registerServiceWorker();
