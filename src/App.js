import './App.css';
import Mail from './api/Mail';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <div className='mt-4 mb-4'>
        <h3 class=" fw-bold text-body-emphasis">Nội dung e-mail</h3>
      </div>
      <div className='mt-3 mb-3'>
        <Mail />
      </div>
    </div>
  );
}

export default App;
