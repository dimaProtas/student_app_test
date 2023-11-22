import React from "react";
import s from "./Teachers.module.css";
import FilterTeacherForm from "./FilterTeacer/FilterTeacherForm.jsx"
import AddNewTeacherForm from "./AddNewTeacherForm/AddNewTeacherForm.jsx";

const Teachers = ({teachers, semesters, filterTeacher, postTeacher}) => {
    const getSemesterNumById = (id, semesters) => {
        const foundSemester = semesters.find((semester) => semester.id === id);
        return foundSemester ? foundSemester.num_semester : 'Unknown Semester';
    };
    
    return (
        <div>
            <FilterTeacherForm filterTeacher={filterTeacher} />
            
            <div className={s.container}>
                
                {teachers.map(t => 
                    <div className={s.teacherContainer} key={t.id}>
                        <div className={s.avaName}>
                            <img src="https://kartinki.pibig.info/uploads/posts/2023-04/1681872043_kartinki-pibig-info-p-inkognito-kartinki-arti-vkontakte-5.jpg" alt="ava" />
                            <h2>{t.name_teacher} {t.last_name_teacher}</h2>
                            <p>{t.rank_teacher}</p>
                            <p>Номер семестров: 
                                {t.semester.map((semesterId) => (
                                <span key={semesterId}>
                                    {getSemesterNumById(semesterId, semesters)}{', '}
                                </span>
                                ))}
                            </p>
                        </div>
                        
                    </div>
                    )}
                <AddNewTeacherForm semesters={semesters} postTeacher={postTeacher} />
            </div>
        </div>
        
    )
}

export default Teachers