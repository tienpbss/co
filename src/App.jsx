import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Header,
  Footer,
  Article,
  Editor,
  Home,
  Login,
  Profile,
  Register,
  Settings,
} from "./components";

import "./App.css";
import { ProtectedRouter } from "./common";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/article/:slug" element={<Article />} />
        <Route path="/profile/:username" element={<Profile />} />
        <Route path="/profile/:username/favorites" element={<Profile />} />

        <Route element={<ProtectedRouter forLogged={false} />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route element={<ProtectedRouter forLogged={true} />} >
          <Route path="/settings" element={<Settings />} />
          <Route path="/editor" element={<Editor />} />
          <Route path="/editor/:slug" element={<Editor />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
