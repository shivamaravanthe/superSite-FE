import './css/css'
import Login from './components/login'
import MainPage from './containers/main-page';
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";

import HomePage from './containers/home-page';

function App() {
  return (
    <BrowserRouter>
          <Routes>
        <Route path="/login" element = {<Login/>}/>
        <Route path="/" element={
            <MainPage>
              <HomePage/>
            </MainPage>
          }   
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
