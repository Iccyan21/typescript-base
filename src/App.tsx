import MapComponent from "./SampleComponent";
import CandidateDataComponent from './prace'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './user/login';
import Register from './user/register';
import AnimeComponent from "./anime/anime";
import AnimeDetail from "./anime/animedetail";

function App() {  
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/gmap/parace/:name" element={<CandidateDataComponent />}/>
            <Route path ="/login" element={<Login/>} />
            <Route path ="/register" element={<Register/>} />
            <Route path="/anime" element={<AnimeComponent/>} />
            <Route path="/anime/:title" element={<AnimeDetail />} />

        </Routes>
      </Router>
      <MapComponent />
    </div>
  );
}

export default App;

