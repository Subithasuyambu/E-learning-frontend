import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Header from "./components/header/Header";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Verify from "./pages/auth/Verify";
import Foot from "./components/footer/Foot";
import About from "./pages/about/About";
import Account from "./pages/accounts/Account";
import { UseData } from "./context/UserContext";
import Loading from "./components/loading/Loading";
import Course from "./pages/courses/Course";
import CourseDescription from "./pages/coursedescription/CourseDescription";
import Payementsuccess from "./pages/paymentsuccess/Payementsuccess";
import Dashboard from "./pages/dashboard/Dashboard";
import CourseStudy from "./pages/coursestudy/CourseStudy";
import Lecture from "./pages/lecture/Lecture";
import Admindashboard from "./admin/Dashboard/Admindashboard";
import Admincourse from "./admin/Courses/Admincourse";
import AdminUser from "./admin/Users/AdminUser";
import Forgotpassword from "./pages/auth/Forgotpassword";
import ResetPassword from "./pages/auth/ResetPassword";

const App = () => {
  const { isAuth, user, loading } = UseData();

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <BrowserRouter>
          <Header isAuth={isAuth} />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/courses" element={<Course />} />
            <Route
              path="/account"
              element={isAuth ? <Account user={user} /> : <Login />}
            />
              <Route path="/login" element={isAuth ? <Home /> : <Login />} />
              <Route path="/forgot" element={isAuth ? <Home /> : <Forgotpassword />} />
              <Route path="/reset-password/:token" element={isAuth ? <Home /> : <ResetPassword />} />
            <Route
              path="/register"
              element={isAuth ? <Home /> : <Register />}
            />
            <Route path="/verify" element={isAuth ? <Home /> : <Verify />} />
            <Route
              path="/courses/:id"
              element={isAuth ? <CourseDescription user={user} /> : <Login />}
            />
            <Route
              path="/payment-success/:id"
              element={
                isAuth && user ? <Payementsuccess user={user} /> : <Login />
              }
            ></Route>
            <Route
              path=":id/dashboard"
              element={isAuth && user ? <Dashboard user={user} /> : <Login />}
            ></Route>
            <Route
              path="/courses/study/:id"
              element={isAuth && user ? <CourseStudy user={user} /> : <Login />}
            ></Route>
            <Route
              path="/lectures/:id"
              element={isAuth && user ? <Lecture user={user} /> : <Login />}
            ></Route>
            <Route
              path="/lectures/:id"
              element={isAuth && user ? <Lecture user={user} /> : <Login />}
            ></Route>
            <Route
              path="/admin/dashboard"
              element={
                isAuth && user ? <Admindashboard user={user} /> : <Login />
              }
              ></Route>
              <Route
              path="/admin/course"
              element={
                isAuth && user ? <Admincourse user={user} /> : <Login />
              }
              ></Route>
               <Route
              path="/admin/users"
              element={
                isAuth  ? <AdminUser user={user} /> : <Login />
              }
            ></Route>
          </Routes>
          <Foot />
        </BrowserRouter>
      )}
    </>
  );
};

export default App;
