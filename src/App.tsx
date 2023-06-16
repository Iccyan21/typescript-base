import MapComponent from "./SampleComponent";
import CandidateDataComponent from './prace'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './user/login';
import Register from './user/register';

function App() {  
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/gmap/parace/:name" element={<CandidateDataComponent />}/>
            <Route path ="/login" element={<Login/>} />
            <Route path ="/register" element={<Register/>} />
        </Routes>
      </Router>
      <MapComponent />
    </div>
  );
}

export default App;

