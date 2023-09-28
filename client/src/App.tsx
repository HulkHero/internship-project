import Home from './pages/Home/Home';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Signup from './pages/Home/SignUp/Signup';
import Login from './pages/Home/SignUp/Login';
import PaymentSuccess from './pages/Home/SignUp/PaymentSuccess';
import Company from './pages/Company/Company';
import AddMember from './pages/Company/Member/AddMember/AddMember';
import { QueryClient, QueryClientProvider} from '@tanstack/react-query';
import AddKpi from './pages/Company/Kpi/AddKpi';
import AddProject from './pages/Company/Evaluation/Project/AddProject/addProject';
import Dashboard from './pages/Company/Dashboard/Dashboard';
import Chat from './pages/Company/chat/Chat';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import ProtectedRoute from './utils/ProtectRoute';
import Member from './pages/Company/Member/Member';
import LayoutMember from './pages/Company/Member/LayoutMember';
import LayoutEvaluation from './pages/Company/Evaluation/LayoutEvaluation';

import Project from './pages/Company/Evaluation/Project/Project';
import DetailPage from './pages/Company/Evaluation/Project/[_id]/DetailPage';
import Evaluate from './components/Evaluate/Evaluate';
import '/node_modules/react-grid-layout/css/styles.css'
import '/node_modules/react-resizable/css/styles.css'

import { SocketProvider } from './state/context';
import TimeBase from './pages/Company/Evaluation/TimeBase/TimeBase';
import AuthZProtect from './utils/AuthZProtect';
const queryClient = new QueryClient()

// const SocketCompany=withSocket(Chat)

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
     
      <Route path="/company" element={<ProtectedRoute><SocketProvider><Company></Company></SocketProvider></ProtectedRoute>}>
        <Route index element={<AuthZProtect roles={["admin"]}><Dashboard/></AuthZProtect>}/>
        <Route path="Member" element={<AuthZProtect roles={["admin","manager"]}><LayoutMember/></AuthZProtect>}>
           <Route index element={<Member/>}/>
           <Route path="addMember" element={<AddMember/>}/>
        </Route>
        <Route path="addKpi" element={<AuthZProtect roles={["admin","manager"]}><AddKpi/></AuthZProtect>}/>
        <Route path="evaluation" element={<AuthZProtect roles={["admin","manager"]}><LayoutEvaluation/></AuthZProtect>}>
            <Route index element={<Project/>}/>
            <Route path=":_id" element={<DetailPage></DetailPage>}/>
            <Route path=":_id/evaluate" element={<Evaluate></Evaluate>}/>
            <Route path="addProject" element={<AddProject/>}/>
            <Route path="timeBase" element={<TimeBase/>}/>
        </Route>
        <Route path="chat" element={<Chat/>} />
    </Route>
 
    </Routes>    
  </Router>
  
  <ReactQueryDevtools initialIsOpen={false} />
  
  </QueryClientProvider>
  );
}

export default App;
