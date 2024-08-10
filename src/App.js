import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import LoginSignUp from './Components/LoginSignUp/LoginSignUp';
import UserList from './Components/UserList/UserList';
import Login from './Components/LoginSignUp/Login';

function App() {
  return (
   
  
   
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginSignUp/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/user-list' element={<UserList/>} />
      </Routes>
    </BrowserRouter>
  
    
   
  );
}

export default App;
