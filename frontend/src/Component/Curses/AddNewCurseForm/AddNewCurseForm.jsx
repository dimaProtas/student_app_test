import React from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from 'yup';
import style from "../FilterCurses/FilterCurses.module.css";


const SignupSchema = Yup.object().shape({
    name_curses: Yup.string()
        .max(100, 'Too Long!'),
    num_curses: Yup.string()
        .max(100, 'Too Long!'),
});


const AddNewCurseForm = ({postCurse}) => {
    return (
        <Formik
            initialValues={{ name_curses: "", num_curses: ""}}
            onSubmit={async (values) => {
                postCurse(values.name_curses, values.num_curses)
            }}
            validationSchema={SignupSchema}
        >
            {({ errors, touched, status }) => (
                <div className={style.myForm}>
                    <Form>
                        <div className={errors.name_curses && touched.name_curses ? style.errors : null}>
                            {errors.name_curses && touched.name_curses ? (
                                <div>{errors.name_curses}</div>
                            ) : null}
                            <Field placeholder={'Name curse'} name={'name_curses'} type={'input'} />
                        </div>
                        <div className={errors.num_curses && touched.num_curses ? style.errors : null}>
                            {errors.num_curses && touched.num_curses ? (
                                <div>{errors.num_curses}</div>
                            ) : null}
                            <Field placeholder={'Num curse'} name={'num_curses'} type={'input'} />
                        </div>
                        <div>
                            <button type="submit">Create Curse</button>
                        </div>
                        
                    </Form>
                </div>

            )}
        </Formik>
    )
}


export default AddNewCurseForm;