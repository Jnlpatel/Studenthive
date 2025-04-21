import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import Navbar from './components/Navbar';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Skills from './pages/Skills';
import Booking from './pages/Booking';
import Landing from './pages/Landing';
import Home from './pages/Home';
import Search from './pages/Search';
import ProfileSettings from './pages/ProfileSettings';
import Onboarding from './pages/Onboarding';
import MentorProfile from './pages/MentorProfile';
import ScheduleSession from './pages/ScheduleSession';
import Payment from './pages/Payment';
// src/App.jsx
import PageContainer from './components/PageContainer';


export default function App() {
  const { user } = useContext(AuthContext);
// This layout will wrap its child route in the PageContainer
function ScreenLayout() {
  return (
    <PageContainer>
      <Outlet />
    </PageContainer>
  );
}

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <Routes>
          <Route>

          <Route path="/login"    element={!user ? <Signin />     : <Navigate to="/" />} />
          <Route path="/register" element={!user ? <Signup />  : <Navigate to="/" />} />
        
                    <Route path="/" element={ user ? <Home /> : <Landing />} />
          <Route path="/skills"   element={ user ? <Skills />    : <Navigate to="/login" />} />
          <Route path="/booking"  element={ user ? <Booking />   : <Navigate to="/login" />} />
          <Route path="*"         element={<Navigate to={user ? "/" : "/login"} />} />
          <Route path="/profile" element={ user ? <ProfileSettings/> : <Navigate to="/login"/> }/>
          <Route path="/search" element={ user ? <Search/> : <Navigate to="/login"/> }/>
          <Route path="/onboarding" element={ user ? <Onboarding/> : <Navigate to="/login"/> } />
          <Route path="/mentor/:id" element={ user ? <MentorProfile/> : <Navigate to="/login"/> } />
          <Route path="/mentor/:id/schedule" element={ user ? <ScheduleSession/> : <Navigate to="/login"/> }/>
          <Route path="/payment" element={ user ? <Payment/>     : <Navigate to="/login"/> } />
          </Route>
        </Routes>
      </div>
      
      {user && <Navbar />}
    </div>
  );
}
