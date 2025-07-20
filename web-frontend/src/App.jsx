
import { Route, Routes } from "react-router-dom";

// Test Routes
import HomePage from "./pages/HomePage.jsx";
import CreateSelector from "./pages/CreateSelector";
import CreateQuestion from "./pages/create/CreateQuestion";
import CreateMessage from "./pages/create/CreateMessage";
import CreateSuggestion from "./pages/create/CreateSuggestion";


// 
import AdminPage from "./pages/admin.jsx";
import OwnerPage from "./pages/owner.jsx";
import MemberPage from "./pages/member.jsx";

// Component
import Register from "./components/auth/Register.jsx";
import Login from "./components/auth/Login.jsx";
import ProtectedRoute from "./components/auth/ProtectedRoutes.jsx"

// import CreatePoll from "./pages/create/CreatePoll";
// import CreateProposal from "./pages/create/CreateProposal";
function App() {
  return (
    <>
      <div className="h-screen w-screen">
        <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route path="/admin" element={
          <ProtectedRoute roles={["admin"]}><AdminPage /></ProtectedRoute>
        } />
        <Route path="/owner" element={
          <ProtectedRoute roles={["team_owner"]}><OwnerPage /></ProtectedRoute>
        } />
        <Route path="/member" element={
          <ProtectedRoute roles={["team_owner", "member"]}><MemberPage /></ProtectedRoute>
        } />

        {/* Create Routes */}
        <Route path="/create" element={<CreateSelector />} />
        <Route path="/create/question" element={<CreateQuestion />} />
        <Route path="/create/message" element={<CreateMessage />} />
        <Route path="/create/suggestion" element={<CreateSuggestion />} />
      </Routes>

      </div>
    </>
  );
}

export default App;
