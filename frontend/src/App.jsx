import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.scss';
import LoginPage from './Auth/Login';
import SignUpPage from './Auth/Signup';

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/login" element={<LoginPage />} />
      {/* <Route path="/*" element={<AuthenticatedApp />} /> */}
    </Routes>
  </Router>
  );
}

export default App;