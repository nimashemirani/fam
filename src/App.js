import './App.css';
import { BrowserRouter as Router , Route , Routes  } from 'react-router-dom';
import { Form } from './Component/Form';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='' element = {<Form/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
