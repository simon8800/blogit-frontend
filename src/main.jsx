import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router';
import './index.css'
import App from './App.jsx'
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import HomePage from './pages/HomePage.jsx';
import BlogPage from './pages/BlogPage.jsx';
import EditorPage from './pages/EditorPage.jsx';
import LandingPage from './pages/LandingPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />}/>
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/register" element={<RegisterPage />}/>
        <Route path="/home" element={<HomePage />}/>
        <Route path="/blog/:id" element={<BlogPage />}/>
        <Route path="/editor" element={<EditorPage />}/>
        <Route path="/dashboard" element={<DashboardPage />}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
