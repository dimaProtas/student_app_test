import React from "react";
import FilterForm from "./FilterForm/FilterForm";
import AddStudentForm from "./AddStudentForm/AddStudentForm";
import s from "./Student.module.css";
import { AiOutlineDelete } from "react-icons/ai";


const StudentsCompanent = ({students, deleteStudent, filterStudent, postStudent}) => {
    return (
        <div>
            <FilterForm filterStudent={filterStudent} />
            <div className={s.container}>
                {students.map(p => 
                <div key={p.id} className={s.studentContainer}>
                    <div className={s.avaName}>
                        <img src="https://kartinki.pibig.info/uploads/posts/2023-04/1681872043_kartinki-pibig-info-p-inkognito-kartinki-arti-vkontakte-5.jpg" alt="ava" />
                        <h1>{p.name} {p.last_name}</h1> 
                        <AiOutlineDelete onClick={() => deleteStudent(p.id)} />
                    </div>
                    <p></p>
                </div>
                    
                )}
            </div>
            <AddStudentForm postStudent={postStudent} />
        </div>
        
    )
}

export default StudentsCompanent