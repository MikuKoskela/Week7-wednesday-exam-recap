import { Navigate, BrowserRouter, Routes, Route } from "react-router-dom";
import {useState} from 'react'
// pages & components
import Home from "./pages/HomePage";
import AddProductPage from "./pages/AddProductPage"
import Navbar from "./components/Navbar";
import NotFoundPage from "./pages/NotFoundPage"
import EditProductPage from "./pages/EditProductPage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(sessionStorage.getItem("isAuthenticated")=== "true")
    return (
      <div className="App">
        <BrowserRouter>
          <Navbar isAuthenticated={isAuthenticated}/>
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/add-product" element={isAuthenticated?<AddProductPage />:  <Navigate to="/login"/>} />
              <Route path='*' element={<NotFoundPage />} />
              <Route path="/edit-product/:id"  element={isAuthenticated ?<EditProductPage/>: <Navigate to ="/login"/>} />
              <Route path="/signup"
                  element={
                    isAuthenticated ? (
                      <Navigate to="/" />
                    ) : (
                      <Signup setIsAuthenticated={setIsAuthenticated} />
                    )
                  }
                 />
              <Route path="/login"  
              element={
                    isAuthenticated ? (
                      <Navigate to="/" />
                    ) : (
                      <Login setIsAuthenticated={setIsAuthenticated} />
                    )
                  } />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    );
  }
  
  export default App;
