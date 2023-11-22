import React from "react";
import s from "./SemesterCurses.module.css";

const SemesterCurses = (props) => {
    const getSemesterNumById = (id, semesters) => {
        const foundSemester = semesters.find((semester) => semester.id === id);
        return foundSemester ? foundSemester.num_semester : 'Unknown Semester';
    };

    const getCurseNameById = (id, curses) => {
        const foundCurse = curses.find((curse) => curse.id === id);
        return foundCurse ? foundCurse.name_curses : 'Unknown Curse';
    };

    return (
        <div>
            {props.semesterCurses.map(sc => 
                <div key={sc.id} className={s.containerSemesterCurses}>
                    <div>
                        <span> Семестр №: {getSemesterNumById(sc.id_semester, props.semester)}</span>
                        <p>{getCurseNameById(sc.id_curses, props.curses)}</p>
                    </div>
                    <div>
                        <p>Начало курса: {sc.date_start}</p>
                        <p>Конец курса: {sc.date_end}</p>
                    </div>
                </div>
                )}
        </div>
    )
}

export default SemesterCurses