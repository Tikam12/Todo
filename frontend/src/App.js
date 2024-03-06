import React, { useEffect } from "react";
import Navbar from "./components/navbar/Navbar";
import { Home } from "./components/home/Home";
import Footer from "./components/footer/Footer";
import Signup from "./components/signup/Signup";
import Signin from "./components/signup/Signin";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Todo from "./components/todo/Todo";
import { useDispatch } from 'react-redux';
import { authActions } from "./store";

const App = () => {
  const dispatch = useDispatch();

  useEffect( () => {
    const id = sessionStorage.getItem("id");
    if(id){
      dispatch(authActions.login());
    }
  },[dispatch]);

  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/todo" element={<Todo />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
};

export default App;