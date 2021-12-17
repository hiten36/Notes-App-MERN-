import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './Navbar'
import Home from './Home'
import Signin from './Signin'
import Login from './Login'
import Alert from './Alert'
import LoadingBar from 'react-top-loading-bar'

const App = () => {
    const [flag, setFlag] = useState(false);
    const [color, setColor] = useState('');
    const [message, setMessage] = useState('');
    const [progress, setProgress] = useState(0)
    function topl(n)
    {
        setProgress(n);
    }
    function trigger(color, message) {
        setColor(color);
        setMessage(message);
        setFlag(true);
        setTimeout(() => {
            setFlag(false);
        }, 4000);
    }
    return (
        <>
            <Navbar />
            <LoadingBar
                color='#f11946'
                progress={progress}
                onLoaderFinished={() => setProgress(0)}
            />
            {flag ? <Alert color={color} message={message} /> : null}
            <Routes>
                <Route path="/" element={<Home topl={topl} />} />
                <Route path="/signin" element={<Signin trigger={trigger} topl={topl} />} />
                <Route path="/login" element={<Login trigger={trigger} topl={topl} />} />
            </Routes>
        </>
    )
}

export default App