import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header.jsx';


// import logo from './logo.svg';
import './App.css';

function App() {

  

  return (
    <>


      <Header />
      <main>
        <Outlet />
      </main>


  </>

  );
}

export default App;
