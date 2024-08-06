import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.scss';
import LoginPage from './Auth/Login';
import SignUp from './Auth/Signup';
import Dashboard from './Dashboard/Dashboard';

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<LoginPage />} />
      <Route path="/dashboard" element={<Dashboard/>} />
      {/* <Route path="/*" element={<AuthenticatedApp />} /> */}
    </Routes>
  </Router>
  );
}

export default App;