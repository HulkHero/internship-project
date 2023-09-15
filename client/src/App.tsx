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
import ProtectedRoute from './ProtectRoute';
import Member from './pages/Company/Member/Member';
import LayoutMember from './pages/Company/Member/LayoutMember';
import LayoutEvaluation from './pages/Company/Evaluation/LayoutEvaluation';
import Day15Evaluation from './pages/Company/Evaluation/15DayEvaluation/15DayEvaluation';
import Day30Evaluation from './pages/Company/Evaluation/30DayEvaluation/Day30Evaluation';
import Project from './pages/Company/Evaluation/Project/Project';
import DetailPage from './pages/Company/Evaluation/Project/[_id]/DetailPage';
import Evaluate from './components/Evaluate/Evaluate';
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
        <Route path="evaluation" element={<LayoutEvaluation/>}>
            <Route index element={<Project/>}/>
            <Route path=":_id" element={<DetailPage></DetailPage>}/>
            <Route path=":_id/evaluate" element={<Evaluate></Evaluate>}/>
            <Route path="addProject" element={<AddProject/>}/>
            <Route path="15Days" element={<Day15Evaluation/>}/>
            <Route path="30Days" element={<Day30Evaluation/>}/>
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
