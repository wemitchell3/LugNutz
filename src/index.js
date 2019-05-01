import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import LugNutz from './components/LugNutz'
import './index.css'

ReactDOM.render(
    <Router>
        <LugNutz />
    </Router>
    ,document.getElementById('root'))