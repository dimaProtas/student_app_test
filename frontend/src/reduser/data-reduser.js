import {dataAPI} from "../api/api.js";

const SET_STUDENTS = "SET_STUDENTS";
const SET_CURSES = "SET_CURSES";
const SET_SEMESTER = "SET_SEMESTER";
const SET_SEMESTER_CURSES = "SET_SEMESTER_CURSES";
const DELETE_STUDENT = "DELETE_STUDENT";
const DELETE_CURSE = "DELETE_CURSE"
const DELETE_SEMESTER = "DELETE_SEMESTER";
const SET_TEACHER = "SET_TEACHER";
const SET_NEW_STUDENT = "SET_NEW_STUDENT";
const SET_NEW_TEACHER = "SET_NEW_TEACHER";
const SET_NEW_CURSE = "SET_NEW_CURSE";
const SET_NEW_SEMESTER = "SET_NEW_SEMESTER";


let initialState = {
  students: [],
  curses: [],
  semester: [],
  semesterCurses: [],
  teachers: [],
};

const DataReduser = (state = initialState, action) => {
  switch (action.type) {

    case SET_NEW_SEMESTER:
      return {
        ...state,
        semester: [...state.semester, action.newSemester],
      };

    case SET_NEW_CURSE:
      return {
        ...state,
        curses: [...state.curses, action.newCurse],
      };

    case SET_NEW_TEACHER:
      return {
        ...state,
        teachers: [...state.teachers, action.newTeacher]
      }

    case SET_NEW_STUDENT:
      return {
        ...state,
        students: [...state.students, action.newStudent],
      };

    case DELETE_SEMESTER:
      return {
        ...state,
        semester: state.semester.filter(sem => sem.id !== action.semester_id)
      }

    case DELETE_CURSE:
      return {
        ...state,
        curses: state.curses.filter(curse => curse.id !== action.curse_id)
      }

    case DELETE_STUDENT:
      return {
        ...state,
        students: state.students.filter(student => student.id !== action.student_id)
      } 

    case SET_TEACHER:
      return {
        ...state,
        teachers: [...action.teachers]
      }

    case SET_SEMESTER_CURSES:
      return {
        ...state,
        semesterCurses: [...action.semesterCurces],
      };

    case SET_SEMESTER:
      return {
        ...state,
        semester: [...action.semester]
      }

    case SET_CURSES:
        return{
            ...state,
            curses: [...action.curses]
        }

    case SET_STUDENTS:
      return {
        ...state,
        students: [...action.students],
      };

    default:
      return state;
  }
};

export default DataReduser;

export const postSemester = (num_semester) => {
  return async (dispatch) => {
    try {
      const response = await dataAPI.postSemester(num_semester);
      if (response.status === 201) {
        dispatch(setNewSemester(response.data))
      }
    } catch (error) {
      console.log("Create semester error:", error)
    }
  }
}

export const postCurse = (name_curses, num_curses) => {
  return async (dispatch) => {
    try {
      const response = await dataAPI.postCurse(name_curses, num_curses);
      if (response.status === 201) {
        dispatch(setNewCurse(response.data))
      } 
    } catch (error) {
      console.log("Create curse error:", error)
    }
  }
}; 

export const postTeacher = (name_teacher, last_name_teacher, rank_teacher, semester) => {
  return async (dispatch) => {
    try {
      const response = await dataAPI.postTeacher(name_teacher, last_name_teacher, rank_teacher, semester);
      if (response.status === 201) {
        dispatch(setNewTeacher(response.data)) 
      }
    } catch (error) {
      console.log("Create teacher error:", error)
    }
  }
}

export const postStudent = (name, last_name) => {
  return async (dispatch) => {
    try {
      const response = await dataAPI.postStudent(name, last_name);
      if (response.status === 201) {
        dispatch(setNewStudent(response.data))
      }
    } catch (error) {
      console.log("Create new student error:", error)
    }
  }
}

export const deleteSemester = (semester_id) => {
  return async (dispatch) => {
    const response = await dataAPI.deleteSemester(semester_id);
    try {
      if (response.status === 204) {
        dispatch(deleteSemesterDispath(semester_id))
      }
    } catch (error) {
      console.log("Semester delete error:", error)
    }
  }
}

export const deleteCurse = (curse_id) => {
  return async (dispatch) => {
    const response = await dataAPI.deleteCurse(curse_id);
    try {
      if (response.status ===  204) {
        dispatch(deleteCurseDispath(curse_id))
      }
    } catch (error) {
      console.log("Curse delete error:", error)
    }
  }
}


export const deleteStudent = (student_id) => {
  return async (dispatch) => {
    const response = await dataAPI.deleteStudent(student_id);
    try {
      if (response.status === 204) {
        dispatch(deleteStudentDispacher(student_id))
      }
    } catch (error) {
      console.log("Delete student error: ", error)
    }
  }
}

export const getTeachers = (name_teacher="", last_name_teacher="", rank_teacher="") => {
  return async (dispatch) => {
    try {
      const response = await dataAPI.getTeachers(
        name_teacher,
        last_name_teacher,
        rank_teacher
      );
      if (response.status === 200) {
        dispatch(setTeachers(response.data));
      }
    } catch (error) {
      console.log("Get Teacher error:", error);
    }
  };
};

export const getSemesterCurses = () => {
  return async (dispatch) => {
    try {
      const response = await dataAPI.getSemesterCurses();
      if (response.status === 200) {
        dispatch(setSemesterCurses(response.data));
      }
    } catch (error) {
      console.log('SemesterCurses error:', error)
    }
  }
}

export const getSemester = () => {
  return async (dispatch) => {
    try {
      const response = await dataAPI.getSemester();
      if (response.status === 200) {
        dispatch(setSemester(response.data))
      }
    } catch (error) {
      console.log('Semester error:', error)
    }
  }
}

export const getCurses = () => {
    return async (dispatch) => {
      try {
        const response = await dataAPI.getCurses('', null);
        if (response.status === 200) {
          dispatch(setCurses(response.data));
        }
      } catch (error) {
        console.error("Curses error:", error);
      }
    }
}


export const getStudent = () => {
  return async (dispatch) => {
    try {
      const response = await dataAPI.getStudent("", "");
      if (response.status === 200) {
        
        dispatch(setStudent(response.data));
      } 
    } catch (error) {
      console.error("Student error:", error);
    }

  };
};

export const filterStudent = (name, last_name) => {
  return async (dispatch) => {
    try {
      const response = await dataAPI.getStudent(name, last_name)
      if (response.status === 200) {
        dispatch(setStudent(response.data))
      }
    } catch (error) {
      console.log("Filter student error:", error)
    }
  }
};

export const filterCurse = (name_curses, num_curses) => {
  return async (dispatch) => {
    try {
      const response = await dataAPI.getCurses(name_curses, num_curses);
      if (response.status === 200) {
          dispatch(setCurses(response.data))
      }
    } catch (error) {
      console.log("Filter curse error:", error)
    }
  }
};

export const filterTeacher = (name_teacher, last_name_teacher, rank_teacher) => {
  return async (dispatch) => {
    try {
      const response = await dataAPI.getTeachers(name_teacher, last_name_teacher, rank_teacher);
      if (response.status === 200) {
        dispatch(setTeachers(response.data))
      } 
    } catch (error) {
        console.log("Filter teacher error:", error)
      }
  }
}


export const setStudent = (students) => ({ type: SET_STUDENTS, students });
export const setCurses = (curses) => ({type: SET_CURSES, curses})
export const setSemester = (semester) => ({type: SET_SEMESTER, semester})
export const setSemesterCurses = (semesterCurces) => ({type: SET_SEMESTER_CURSES, semesterCurces})
export const deleteStudentDispacher = (student_id) => ({type: DELETE_STUDENT, student_id})
export const deleteCurseDispath = (curse_id) => ({ type: DELETE_CURSE, curse_id });
export const deleteSemesterDispath = (semester_id) => ({type: DELETE_SEMESTER, semester_id})
export const setTeachers = (teachers) => ({type: SET_TEACHER, teachers})
export const setNewStudent = (newStudent) => ({type: SET_NEW_STUDENT, newStudent})
export const setNewTeacher = (newTeacher) => ({type: SET_NEW_TEACHER, newTeacher})
export const setNewCurse = (newCurse) => ({type: SET_NEW_CURSE, newCurse})
export const setNewSemester = (newSemester) => ({type: SET_NEW_SEMESTER, newSemester})

