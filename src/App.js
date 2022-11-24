import logo from './logo.svg';
import './App.css';
import { MemoryRouter, Route, Routes } from "react-router-dom"
import Main from './components/Main';
import { AuthContextProvider } from './components/AuthContext';
import Account from './components/account/Account';
import Protect from './components/protect';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <Header />
        <MemoryRouter 
          initialEntries={["/"]}
          initialIndex={1}
        > 
          <Routes>
            <Route exact path="/" element={<Main />} />
            <Route exact path="/account" element={<Protect><Account /></Protect>} /> 
          </Routes>
          
        </MemoryRouter>  
      </AuthContextProvider>
      
    </div>
  );
}

export default App;
