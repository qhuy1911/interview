import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Link,
  Navigate
} from "react-router-dom";
import LinkList from "./pages/LinkList";
import Login from "./pages/Login";
import ProtectedRoute from './components/ProtectedRoute';
import Signup from "./pages/Signup";
import { useAuth } from "./context/authContext";
import Button from 'react-bootstrap/Button';
import CreateLink from "./pages/CreateLink";

function App() {
  const {isAuthenticated, user, logout} = useAuth();
  return (
    <div className='container mt-2'>
      {isAuthenticated && user && (
        <div className="d-flex justify-content-end align-items-center gap-2">
          Hi, {user.name}
          <Button variant="info" onClick={logout}>Logout</Button>{' '}
        </div>
      )}
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to={"/links"} />} />
          <Route path="/links" element={<ProtectedRoute><LinkList/></ProtectedRoute>} />
          <Route path="/create-link" element={<ProtectedRoute><CreateLink/></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
