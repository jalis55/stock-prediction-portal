import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Main from './components/Main';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import AuthProvider from './AuthProvider';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />

          </Routes>


        </BrowserRouter>

      </AuthProvider>



    </>

  );
}

export default App;