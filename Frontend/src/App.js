import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Index from './Components/index';
import DepartmentInfo from './Components/departmentInfo';
import CourseInfo from './Components/CourseInfo';
import Upload from './Components/Upload';
import AuthProvider from './Components/context';
import Login from './Components/login';
import PrivateRoute from './Components/privateRoute';
import CreateAccount from './Components/CreateAccount';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path={`/`} element={<Login />} />
          <Route path={`/create`} element={<CreateAccount />} />
          <Route element={<PrivateRoute />}>
            <Route path={`/homepage`} element={<Index />} />
            <Route path={`/:department`} element={<DepartmentInfo />} />
            <Route path={`/:department/:course`} element={<CourseInfo />} />
            <Route path={`/upload/:course`} element={<Upload />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>

  );
}

export default App;
