import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import NoteState from './state/NoteState';

ReactDOM.render(<NoteState><BrowserRouter><App /></BrowserRouter></NoteState>,document.getElementById('root'));