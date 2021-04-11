import './App.css';
import Box from './components/box';
import Bomb from './components/bomb';
import Grid from "./components/grid";
import GridRedo from './components/Gridredo';
function App() {
  return (
    <div className="App">
      <Grid 
        // width = {10}
        // height = {10}
        // numBombs = {10}
      />
      <GridRedo/>
    </div>
  );
}

export default App;
