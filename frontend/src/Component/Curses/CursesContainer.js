import React from "react";
import Curses from "./Curses.jsx";
import { connect } from "react-redux";
import {
  getCurses,
  deleteCurse,
  filterCurse,
  postCurse,
} from "../../reduser/data-reduser.js";

class CursesContainer extends React.Component {
  componentDidMount() {
    this.props.getCurses();
  }

  render() {
    return (
      <Curses
        curses={this.props.curses}
        deleteCurse={this.props.deleteCurse}
        filterCurse={this.props.filterCurse}
        postCurse={this.props.postCurse}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  curses: state.data.curses,
});

export default connect(mapStateToProps, {
  getCurses,
  deleteCurse,
  filterCurse,
  postCurse,
})(CursesContainer);
