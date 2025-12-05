import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SignalRProvider } from './services/signalr/SignalRContext';
import { getSignalRUrl } from './config/api.config';
import { Header } from './components/layout/Header/Header';
import { Footer } from './components/layout/Footer/Footer';
import { HomePage } from './pages/HomePage/HomePage';
import { LobbyPage } from './pages/LobbyPage/LobbyPage';
import { GamePage } from './pages/GamePage/GamePage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <SignalRProvider url={getSignalRUrl()}>
        <div className="app">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/lobby" element={<LobbyPage />} />
              <Route path="/game" element={<GamePage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </SignalRProvider>
    </BrowserRouter>
  );
}

export default App;
