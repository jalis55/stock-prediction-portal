import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Main from './components/Main';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/" element={<Main/>} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login/>} />

        </Routes>


      </BrowserRouter>


    </>

  );
}

export default App;