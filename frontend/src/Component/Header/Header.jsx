import React from "react";
import { NavLink } from 'react-router-dom';
import { IoExitOutline } from "react-icons/io5";
import s from './Header.module.css';


const Header = (props) => {
    return (
        <header className={ s.header }>
            {props.isAuth 
                ?
            <div className={s.menu}>
                <NavLink to={'home/'}>Home</NavLink>
                <NavLink to={'students/'}>Studens</NavLink>
                <NavLink to={'teachers/'}>Teachers</NavLink>
                <NavLink to={'curses/'}>Curses</NavLink>
                <NavLink to={'semester/'}>Semester</NavLink>
                <NavLink to={'semester_curses/'}>Curses Semester</NavLink>
            </div> : <div className={s.menu}><NavLink to={'home/'}>Home</NavLink></div>}

            <div className={ s.header_text }>Student Dashbord</div>
            {props.isAuth 
                ? <div className={s.login}>{props.username} <button onClick={props.logout}><IoExitOutline /></button></div>
            : <div>
                <div className={s.login}>
                    <NavLink to={'login/'}>Login</NavLink>
                </div>
                <div className={s.register}>
                    <NavLink to={'register/'}>Register</NavLink>
                </div>
            </div>
            }
            
        </header>
    )
}

export default Header;