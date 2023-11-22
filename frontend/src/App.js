import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import {initializedApp} from "./reduser/app-reduser.js"
import HeaderContainer from "./Component/Header/HeaderContainer.jsx"
import Login from "./Component/LoginForm/LoginForm.jsx";
import Register from "./Component/RegisterForm/RegisterForm.jsx";
import Home from "./Component/Home/Home.jsx"
import StudentsContainer from "./Component/Students/StudentsContainer.js";
import CursesContainer from "./Component/Curses/CursesContainer.js";
import SemesterContainer from "./Component/Semester/SemesterContainer.js";
import SemesterCursesContainer from "./Component/SemesterCurses/SemesterCursesContainer.js";
import TeachersContainer from "./Component/Teachers/TeachersContainer.js";


class App extends React.Component {
  componentDidMount() {
    this.props.initializedApp();
  }

  render() {
    return (
      <div>
        <HeaderContainer />
        <Routes>
          <Route path="/teachers/" element={<TeachersContainer />} />
          <Route
            path="/semester_curses"
            element={<SemesterCursesContainer />}
          />
          <Route path="/semester" element={<SemesterContainer />} />
          <Route path="/curses" element={<CursesContainer />} />
          <Route path="/students" element={<StudentsContainer />} />
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="/friends" element={withSuspense(FriendsContainer)} /> */}
        </Routes>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized,
});

export default compose(connect(mapStateToProps, { initializedApp }))(App);
