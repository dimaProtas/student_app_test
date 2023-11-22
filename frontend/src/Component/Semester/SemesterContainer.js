import React from "react";
import { connect } from "react-redux";
import {getSemester, deleteSemester, postSemester} from "../../reduser/data-reduser.js";
import Semester from "./Semester.jsx";


class SemesterContainer extends React.Component {
    componentDidMount() {
        this.props.getSemester();
    }
    render() {
        return (
          <Semester
            semester={this.props.semester}
            deleteSemester={this.props.deleteSemester}
            postSemester={this.props.postSemester}
          />
        );
    }
}


const mapStateToProps = (state) => ({
  semester: state.data.semester,
});

export default connect(mapStateToProps, { getSemester, deleteSemester, postSemester })(SemesterContainer);

