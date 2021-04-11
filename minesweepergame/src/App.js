import './App.css';
import Grid from "./components/grid";
import GridRedo from './components/Gridredo';
function App() {
  return (
    <div className="App">
      <Grid 
        width = {5}
        height = {5}
        numBombs = {1}
      />
      <GridRedo/>
    </div>
  );
}

export default App;
