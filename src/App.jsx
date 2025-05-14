import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import './App.css'

// Import our micro frontends
import Dashboard from './microfrontends/dashboard/Dashboard'
import Calculator from './microfrontends/calculator/Calculator'

function App() {
  return (
    <Router>
      <div className="microfrontends-container">
        <header className="app-header">
          <h1>Micro Frontends Demo</h1>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link to="/calculator">Calculator</Link>
              </li>
            </ul>
          </nav>
        </header>

        <main className="app-content">
          <Routes>
            <Route path="/" element={
              <div className="welcome-page">
                <h2>Welcome to Micro Frontends Demo</h2>
                <p>This application demonstrates how to use micro frontends with module federation.</p>
                <p>Click on the navigation links to see the different micro frontends in action.</p>
                <div className="mfe-info">
                  <div className="mfe-card">
                    <h3>Dashboard MFE</h3>
                    <p>A dashboard micro frontend that displays statistics and recent activity.</p>
                    <Link to="/dashboard" className="mfe-link">Open Dashboard</Link>
                  </div>
                  <div className="mfe-card">
                    <h3>Calculator MFE</h3>
                    <p>A calculator micro frontend that provides basic calculation functionality.</p>
                    <Link to="/calculator" className="mfe-link">Open Calculator</Link>
                  </div>
                </div>
              </div>
            } />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/calculator" element={<Calculator />} />
          </Routes>
        </main>

        <footer className="app-footer">
          <p>Micro Frontends Demo - Built with React and Vite Module Federation</p>
        </footer>
      </div>
    </Router>
  )
}

export default App
