import Home from './pages/Home/Home';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Signup from './pages/Home/SignUp/Signup';
import Login from './pages/Home/SignUp/Login';
import PaymentSuccess from './pages/Home/SignUp/PaymentSuccess';
import Company from './pages/Company/Company';
import AddMember from './pages/Company/Member/AddMember/AddMember';
import { QueryClient, QueryClientProvider} from '@tanstack/react-query';
import AddKpi from './pages/Company/Kpi/AddKpi';
import AddProject from './pages/Company/addProject/addProject';
import Dashboard from './pages/Company/Dashboard/Dashboard';
import Chat from './pages/Company/chat/Chat';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import ProtectedRoute from './ProtectRoute';
import Member from './pages/Company/Member/Member';
import LayoutMember from './pages/Company/Member/LayoutMember';
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
      <Route path="/company" element={<ProtectedRoute><Company/></ProtectedRoute>}>
        <Route index element={<Dashboard/>}/>
        <Route path="Member" element={<LayoutMember/>}>
           <Route index element={<Member/>}/>
          <Route path="addMember" element={<AddMember/>}/>
        </Route>
        <Route path="addKpi" element={<AddKpi/>}/>
        <Route path="chat" element={<Chat/>} />
        <Route path="addProject" element={<AddProject/>}/>
    </Route>
    </Routes>    
  </Router>
  <ReactQueryDevtools initialIsOpen={false} />
  
  </QueryClientProvider>
  );
}

export default App;
