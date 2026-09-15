import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Auth from './screens/Auth';
import Home from './screens/Home';
import AddTrip from './screens/AddTrip';
import BoardingPass from './screens/BoardingPass';
import Help from './screens/Help';
import Profile from './screens/Profile';
import { Screen } from './types';

export default function App() {
  const [authed, setAuthed] = useState(false);
  const [screen, setScreen] = useState<Screen>('home');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  if (!authed) {
    return <Auth onAuthenticated={() => setAuthed(true)} darkMode={darkMode} onToggleDark={() => setDarkMode((d) => !d)} />;
  }

  return (
    <div className="min-h-screen">
      <Navbar active={screen} onNavigate={setScreen} darkMode={darkMode} onToggleDark={() => setDarkMode((d) => !d)} />
      {screen === 'home' && <Home onNavigate={setScreen} />}
      {screen === 'addTrip' && <AddTrip />}
      {screen === 'boardingPass' && <BoardingPass />}
      {screen === 'help' && <Help />}
      {screen === 'profile' && <Profile darkMode={darkMode} onToggleDark={() => setDarkMode((d) => !d)} />}
    </div>
  );
}