import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Predirect from './components/Predirect/Predirect';
import MetaTags from 'react-meta-tags';

function App() {

  const backend_url = 'http://127.0.0.1:5000/api/';

  const fetchURL = async (alias) => {
    const response = await fetch(backend_url + "url/" + alias);
    const data = await response.json();
    return data;
  }

  const addURL = async (url_alias) => {
    const response = await fetch(backend_url + "url", { method: 'POST', body: JSON.stringify(url_alias), headers: { 'Content-Type': 'application/json' } });
    const data = await response.json();
    return data;
  }

  return (
    <Router>
      <MetaTags>
        <title>URL Shortener</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </MetaTags>
      <div className="App">
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home onAdd={addURL} />} />
          <Route exact path="/about" element={<h1>About</h1>} />
          <Route exact path="/:alias" element={<Predirect onFetch={fetchURL} />} />
        </Routes>
      </div>
    </Router >
  );
}

export default App;