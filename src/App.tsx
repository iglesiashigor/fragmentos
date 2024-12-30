import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import { Toast } from './components/Toast';
import Home from './pages/Home';
import CardCreator from './pages/CardCreator';
import CardEditor from './pages/CardEditor';
import DeckBuilder from './pages/DeckBuilder';
import DeckView from './pages/DeckView';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cards/create" element={<CardCreator />} />
            <Route path="/cards/edit/:id" element={<CardEditor />} />
            <Route path="/decks" element={<DeckBuilder />} />
            <Route path="/decks/:id" element={<DeckView />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
        <Toast />
      </div>
    </Router>
  );
}