import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import CreateSelector from "./pages/CreateSelector";
import CreateQuestion from "./pages/create/CreateQuestion";
import CreateMessage from "./pages/create/CreateMessage";
import CreateSuggestion from "./pages/create/CreateSuggestion";
// import CreatePoll from "./pages/create/CreatePoll";
// import CreateProposal from "./pages/create/CreateProposal";
function App() {
  return (
    <>
      <div className="h-screen w-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
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
