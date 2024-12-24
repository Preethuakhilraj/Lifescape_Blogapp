
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './Pages/Signup'; // Adjust the path as per your folder structure
import Login from './Pages/Login'; // Adjust the path as per your folder structure
import Blogs from './Pages/Blogs';
import Addblog from './Pages/Addblog';
import Main from './Pages/Main';
import Privateroutes from './Pages/Privateroutes'; // Adjust the path as per your folder structure
import Openblog from './Pages/Openblog';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route element={<Privateroutes />}>
          <Route path='/blogs' element={<Main child={<Blogs />} />} />
          <Route path="/blog/:blogId" element={<Openblog/>} />
          <Route path='/addblog' element={<Main child={<Addblog />} />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
