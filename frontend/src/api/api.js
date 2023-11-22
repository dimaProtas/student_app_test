import axios from "axios";
import { selectAccessToken } from "../reduser/selectors.js";

let store;

export const setStore = (s) => {
  store = s;
};

const axiosWithoutToken = axios.create({
  baseURL: "http://localhost:8000/api/",
  headers: { "Content-Type": "application/json" },
});

export const instans = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:8000/api/'
})


export const configureAxiosInterceptors = () => {
  // Добавляем interceptor для автоматического добавления токена в заголовок запроса
  instans.interceptors.request.use(
    (config) => {
      const token = selectAccessToken(store.getState()); // Получаем токен из State
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

export const dataAPI = {
  deleteSemester(semester_id) {
    return instans.delete(`semestr/${semester_id}/`);
  },

  deleteCurse(curse_id) {
    return instans.delete(`curses/${curse_id}/`);
  },

  deleteStudent(student_id) {
    return instans.delete(`students/${student_id}/`);
  },

  getTeachers(name_teacher, last_name_teacher, rank_teacher) {
    return instans.get(
      `teachers/?name_teacher=${name_teacher}&last_name_teacher=${last_name_teacher}&rank_teacher=${rank_teacher}`
    );
  },

  postTeacher(name_teacher, last_name_teacher, rank_teacher, semester) {
    return instans.post(`teachers/`, {
      name_teacher,
      last_name_teacher,
      rank_teacher,
      semester,
    });
  },

  getStudent(name, last_name) {
    return instans.get(`students/?name=${name}&last_name=${last_name}`);
  },

  postStudent(name, last_name) {
    return instans.post(`students/`, { name, last_name });
  },

  getCurses(name_curses, num_curses) {
    return instans.get(
      `curses/?name_curses=${name_curses}&num_curses=${num_curses}`
    );
  },

  postCurse(name_curses, num_curses) {
    return instans.post(`curses/`, { name_curses, num_curses });
  },

  getSemester() {
    return instans.get(`semestr/`);
  },

  postSemester(num_semester) {
    return instans.post(`semestr/`, { num_semester });
  },

  getSemesterCurses() {
    return instans.get(`semester_curses/`);
  },
};


const authAPI = {
  authMe(refreshToken) {
    let result = instans.post(`token/refresh/`, { refresh: refreshToken });
    return result;
  },

  getAythUser() {
    return instans.get(`user/`);
  },

  registerUser(username, first_name, last_name, email, password) {
    let result = axiosWithoutToken.post(
      `register/`,
      {
        username,
        first_name,
        last_name,
        email,
        password,
      },
      { headers: { "Content-Type": "application/json" } }
    );
    return result;
  },

  loginUser(username, password) {
    let result = instans.post(
      "token/obtain/",
      { username, password },
      { headers: { "Content-Type": "application/json" } }
    );
    return result;
  },

  logout() {
    return instans.delete("auth/logout/");
  },

  refreshToken(refreshToken) {
    let result = instans.post("token/refresh/", { refresh: refreshToken });
    return result;
  },
}; 





export default authAPI
