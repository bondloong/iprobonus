
import './App.scss';
import { ReactComponent as InfoIcon } from './assets/info.svg';
import Bonuses from './components/Bonuses';
import SpeechToText from './components/SpeechToText';


function App() {
  return (
    <div className='page'>
      <div className="container">
        <div className="row">
          <div className="logo">Логотип</div>
          <button className='info-btn'><InfoIcon /></button>
        </div>
      </div>

      <div className="iprobonuses fon-line">
        <div className="container">
          <Bonuses />
        </div>
      </div>

      <div className="speach">
        <div className="container">
          <SpeechToText />
        </div>
      </div>
    </div>
  );
}

export default App;