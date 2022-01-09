import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import NoteState from './context/notes/NoteState';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import About from './components/About';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignUpForm';

function App() {
  return (
    <BrowserRouter>
      <NoteState>
        <Navbar/>
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route exact path="/about" element={<About />}></Route>
            <Route exact path="/login" element={<LoginForm/>}></Route>
            <Route exact path="/signup" element={<SignupForm/>}></Route>
            <Route exact path="*" element={<h1>404 Not Found</h1>}></Route>
          </Routes>
      </NoteState>
    </BrowserRouter>
  );
}

export default App;
