import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/homePage';
import { ProgressProvider } from './context/progressContext.jsx';
import RefreshContext from './context/refreshContext';
import CreateAccountPage from './pages/CreateAccountPage';
import LoginPage from './pages/LoginPage';
import LeaderBoardPage from './pages/LeaderBoardPage';
function App() {
  return (
    <ProgressProvider>
      <RefreshContext>
        <Router>
          <Routes>
            <Route path='/createAccount' element={<CreateAccountPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/ranks' element={<LeaderBoardPage />} />
            <Route path='/' element={<HomePage />} />
          </Routes>
        </Router>
      </RefreshContext>
    </ProgressProvider >
  )
}

export default App;
