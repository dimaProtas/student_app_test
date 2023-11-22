import React from "react";
import style from "./Smester.module.css";
import { AiOutlineDelete } from "react-icons/ai";
import AddSemesterForm from "./AddSemesterForm/AddSemesterForm";

const Semester = ({semester, deleteSemester, postSemester}) => {
    return (
        <div>
            <AddSemesterForm postSemester={postSemester} />
            {semester.map(s => 
                <div key={s.id} className={style.conteinerSemester}>
                    <p>Семестр №: {s.num_semester}</p>
                    <AiOutlineDelete onClick={() => deleteSemester(s.id)} />
                </div>
            )}
        </div>
    )
}

export default Semester;