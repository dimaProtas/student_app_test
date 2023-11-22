import React from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from 'yup';
import style from "./AddNewTeacherForm.module.css";


const SignupSchema = Yup.object().shape({
    name_teacher: Yup.string()
        .min(2, 'Too Short!')
        .max(100, 'Too Long!'),
    last_name_teacher: Yup.string()
        .min(2, 'Too Short!')
        .max(100, 'Too Long!'),
    rank_teacher: Yup.string()
        .min(2, 'Too Short!')
        .max(100, 'Too Long!'),
    // semester: Yup.string()
        // .min(2, 'Too Short!')
        // .max(100, 'Too Long!'),
});


const AddNewTeacherForm = ({postTeacher, semesters}) => {
    return (
        <Formik
            initialValues={{ name_teacher: "", last_name_teacher: "", rank_teacher: "", semester: []}}
            onSubmit={async (values) => {
                postTeacher(values.name_teacher, values.last_name_teacher, values.rank_teacher, values.semester)
            }}
            validationSchema={SignupSchema}
        >
            {({ errors, touched, status }) => (
                <div className={style.myForm}>
                    <Form>
                        <img src="https://kartinki.pibig.info/uploads/posts/2023-04/1681872043_kartinki-pibig-info-p-inkognito-kartinki-arti-vkontakte-5.jpg" alt="ava" />
                        <div className={errors.name_teacher && touched.name_teacher ? style.errors : null}>
                            {errors.name_teacher && touched.name_teacher ? (
                                <div>{errors.name_teacher}</div>
                            ) : null}
                            <Field placeholder={'Name teacher'} name={'name_teacher'} type={'input'} />
                        </div>
                        <div className={errors.last_name_teacher && touched.last_name_teacher ? style.errors : null}>
                            {errors.last_name_teacher && touched.last_name_teacher ? (
                                <div>{errors.last_name_teacher}</div>
                            ) : null}
                            <Field placeholder={'Last Name teacher'} name={'last_name_teacher'} type={'input'} />
                        </div>
                        <div className={errors.rank_teacher && touched.rank_teacher ? style.errors : null}>
                            {errors.rank_teacher && touched.rank_teacher ? (
                                <div>{errors.rank_teacher}</div>
                            ) : null}
                            <Field placeholder={'Rank teacher'} name={'rank_teacher'} type={'input'} />
                        </div>
                        <Field
                            as="select"
                            name="semester"
                            id="semester"
                            placeholder="Semester"
                            multiple
                        >
                            <option value="" label="Select a semester" />
                            {semesters.map((semester) => (
                            <option key={semester.id} value={semester.id}>
                                {semester.num_semester}
                            </option>
                            ))}
                        </Field>

                        <div>
                            <button type="submit">Create Teacher</button>
                        </div>
                        
                    </Form>
                </div>

            )}
        </Formik>
    )
}

export default AddNewTeacherForm;