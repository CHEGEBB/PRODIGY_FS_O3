import React from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import '../sass/Dashboard.scss';

const Dashboard = () => {
    return (
        <div className="dashboard">
            <Sidebar />
            <main className="main-content">
                <Header />
                <section className="chat-area">
                    <h1>Welcome to ChatApp</h1>
                    <p>Select a chat to start messaging</p>
                    {/* Chat components will be added here */}
                </section>
            </main>
        </div>
    );
};

export default Dashboard;