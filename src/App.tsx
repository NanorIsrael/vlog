import React from "react";
import "./App.css";
import FeedPage from "./pages/Feed";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ExplorePage from "./pages/Explore";
import LoginPage from "./pages/LoginPage";
import UserPage from "./pages/UserPage";
import ApiProvider from "./data/ApiProvider";
import RegistrationPage from "./pages/RegistrationPage";
import QueryProvider from "./data/QueryProvider";
import ErrorBoundary from "./ErrorBoundary";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <QueryProvider>
      <ApiProvider>
        <ErrorBoundary>
          <header>My Blog</header>
          <Routes>
            <Route path="/" element={<FeedPage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/users/:username" element={<UserPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          </ErrorBoundary>
        </ApiProvider>
      </QueryProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
