import Home from './pages/Home';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import PaymentSuccess from './pages/PaymentSuccess';
import Company from './pages/company/Company';
import AddMember from './pages/company/AddMember';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AddKpi from './pages/Kpi/AddKpi';
import AddProjects from './pages/company/AddProjects';
const queryClient = new QueryClient()

function App() {
 
  return (
    <QueryClientProvider client={queryClient}>
  <Router>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/signup/success" element={<PaymentSuccess/>}/>
      <Route path="login" element={<Login/>}/>
      <Route path="*" element={<div>404</div>}/>
       
     <Route path="/company" element={<Company/>}>
        <Route index path="addMember" element={<AddMember/>}/>
        <Route path="addKpi" element={<AddKpi/>}/>
        <Route path="addProject" element={<AddProjects/>}/>
    </Route>
    </Routes>    
  </Router>
  </QueryClientProvider>
  );
}

export default App;
