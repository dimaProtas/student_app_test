import React from "react";
import StudentsCompanent from "./StudentsCompanent.jsx";
import { connect } from "react-redux";
import  { getStudent, deleteStudent, filterStudent, postStudent }  from "../../reduser/data-reduser.js";

class StudentsContainer extends React.Component {

  componentDidMount() {
    this.props.getStudent();
  }

  render() {
    return (
      <StudentsCompanent
        students={this.props.students}
        deleteStudent={this.props.deleteStudent}
        filterStudent={this.props.filterStudent}
        postStudent={this.props.postStudent}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  students: state.data.students,
});

export default connect(mapStateToProps, {
  getStudent,
  deleteStudent,
  filterStudent,
  postStudent,
})(StudentsContainer);
