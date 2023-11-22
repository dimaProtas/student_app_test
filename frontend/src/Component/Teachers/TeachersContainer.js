import React from "react";
import { connect } from "react-redux";
import { getTeachers, filterTeacher, postTeacher } from "../../reduser/data-reduser";
import Teachers from "./Teachers.jsx"


class TeacherCompanent extends React.Component {
    componentDidMount() {
        this.props.getTeachers()
    }

    render() {
        return (
          <Teachers
            teachers={this.props.teachers}
            semesters={this.props.semesters}
            filterTeacher={this.props.filterTeacher}
            postTeacher={this.props.postTeacher}
          />
        );
    }
}

const mapStateToProps = (state) => ({
  teachers: state.data.teachers,
  semesters: state.data.semester,
});

export default connect(mapStateToProps, {
  getTeachers,
  filterTeacher,
  postTeacher,
})(TeacherCompanent);