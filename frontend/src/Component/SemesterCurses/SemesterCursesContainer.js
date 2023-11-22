import React from "react";
import { connect } from "react-redux";
import { getSemesterCurses } from "../../reduser/data-reduser";
import SemesterCurses from "./SemesterCurses.jsx";


class SemesterCursesContainer extends React.Component {
    componentDidMount() {
        this.props.getSemesterCurses();
    }

    render() {
        return <SemesterCurses {...this.props} />
    }
}

const mapStateToProps = (state) => ({
  semesterCurses: state.data.semesterCurses,
  semester: state.data.semester,
  curses: state.data.curses,
});

export default connect(mapStateToProps, {getSemesterCurses}) (SemesterCursesContainer)