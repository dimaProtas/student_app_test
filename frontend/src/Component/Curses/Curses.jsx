import React from "react";
import s from "./Curses.module.css";
import { AiOutlineDelete } from "react-icons/ai";
import FilterCurse from "./FilterCurses/FilterCurses.jsx";
import AddNewCurseForm from "./AddNewCurseForm/AddNewCurseForm.jsx";


const Curses = ({curses, deleteCurse, filterCurse, postCurse}) => {
    return (
        <div>
            <FilterCurse filterCurse={filterCurse} />
            
            <div>
                {curses.map(c => 
                    <div key={c.id} className={s.cursesContainer}>
                        <div className={s.nameCurse}> 
                            <div className={s.iconName}>
                                <h2>{c.name_curses}</h2>
                                <AiOutlineDelete onClick={() => deleteCurse(c.id)} />
                            </div>
                            <span>Номер курса: {c.num_curses}</span>
                        </div>

                        <div>
                            <h4>Записаны на курс: </h4>
                            <div className={s.studentBlock}>
                                {c.student.map(s => 
                                    <div key={s.id} className={s.student}>{s.name}</div>
                                    )}
                            </div>
                        </div>
                    </div>
                    )}
            </div>
            <AddNewCurseForm postCurse={postCurse} />
        </div>
        
    )
}


export default Curses;