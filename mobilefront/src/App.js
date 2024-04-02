import './App.css';
import Header from './Components/Header';
import Connection from './Components/Connection';
function App() {
  return (
    <div className="App">
    <Header />
    <div style={{ display: 'flex', flexDirection: 'grid' }}>
      <Connection />
    </div>
    
    </div>
  );
}

export default App;
