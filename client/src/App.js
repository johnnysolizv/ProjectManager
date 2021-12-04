import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/home/home';

function App() {
  return ( 
      <BrowserRouter>
        <Routes>
          <Route index path="/*" element={<Home />}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
