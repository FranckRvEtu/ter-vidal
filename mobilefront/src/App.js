import './App.css';
import Header from './Components/Header';
import Connection from './Components/Connection';
import Qrcode from './Components/Qrcode';
function App() {
  return (
    <div className="App">
    <Header />
    <div style={{ display: 'flex', flexDirection: 'grid' }}>
      <Connection />
    </div>
    <Qrcode/>

    </div>
  );
}

export default App;
