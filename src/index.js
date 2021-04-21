import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router} from 'react-router-dom';
import Devcon from "./components/Devcon";




//ReactDOM.render(<Router><App />,document.getElementById('root')</Router>);

ReactDOM.render((<Router><Devcon /></Router>),document.getElementById('root'));

//ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
//SERVICE WORKER?
serviceWorker.unregister();