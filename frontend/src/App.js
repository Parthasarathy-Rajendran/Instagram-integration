import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import MessageMonitor from './components/MessageMonitor';
import FollowUp from './components/FollowUp';

const App = () => {
    return (
        <Router>
            <div>
                <h1>Instagram Integration App</h1>
                <Routes>
                    <Route path="/" element={<Register />} />
                    <Route path="/monitor" element={<MessageMonitor />} />
                    <Route path="/follow-up" element={<FollowUp />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
