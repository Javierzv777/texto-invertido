
import appStyles from './App.module.css';
import NavbarBootstrap from './components/navbar/Navbar'
import Results from './components/Results/Results';

function App() {
  return (
    <div className={appStyles.App}>
      <NavbarBootstrap/>
      <div className={appStyles.container}>
        <Results/>
      </div>
    </div>
  );
}

export default App;
