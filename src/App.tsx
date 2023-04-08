import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { Configuracao } from './paginas/Configuracao';

function App() {
  return (
    <BrowserRouter>
      <RecoilRoot>
        <Routes>
          <Route
            path='/'
            element={<Configuracao />}
          />
        </Routes>
      </RecoilRoot>
    </BrowserRouter>
  );
}

export default App;
