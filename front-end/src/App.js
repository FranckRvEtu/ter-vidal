import Ordonnance from './pages/Ordonnance';
import './App.css';
import Dashboard from './Components/Dashboard';
import Header from './Components/Header';
function App() {
  return (
    <div className="App">
    <Header />
    <div style={{ display: 'flex', flexDirection: 'grid' }}>
      <Dashboard />
  
      <Ordonnance />
      
    </div>
    </div>
  );
}

export default App;
