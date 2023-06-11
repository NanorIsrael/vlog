import React from "react";
// import "./App.css";
import FeedPage from "./pages/Feed";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ExplorePage from "./pages/Explore";
import LoginPage from "./pages/LoginPage";
import UserPage from "./pages/UserPage";
import ApiProvider from "./data/ApiProvider";
import RegistrationPage from "./pages/RegistrationPage";
import QueryProvider from "./data/QueryProvider";
import ErrorBoundary from "./ErrorBoundary";
import FlashProvider from "./data/FlashProvider";


function App() {
  return (
    <div className="p-0 m-0" style={{background:'url(http://pets-images.dev-apis.com/pets/wallpaperA.jpg)'}}>
      <BrowserRouter>
      <QueryProvider>
      <ApiProvider>
        <ErrorBoundary>
          <header className={"w-full mb-10 text-center bg-gradient-to-b from-yellow-400 via-orange-500 to-red-500 p-7 text-6xl text-white hover:text-gray-200"}>My Blog</header>
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
