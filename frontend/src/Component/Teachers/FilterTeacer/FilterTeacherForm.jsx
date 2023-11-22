import React from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from 'yup';
import style from "./FilterTeacherForm.module.css";


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
});


const FilterForm = ({filterTeacher}) => {
    return (
        <Formik
            initialValues={{ name_teacher: "", last_name_teacher: "", rank_teacher: ""}}
            onSubmit={async (values) => {
                filterTeacher(values.name_teacher, values.last_name_teacher, values.rank_teacher)
                
            }}
            validationSchema={SignupSchema}
        >
            {({ errors, touched, status }) => (
                <div className={style.myForm}>
                    <Form>
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
                        <div>
                            <button type="submit">Filter</button>
                        </div>
                        
                    </Form>
                </div>

            )}
        </Formik>
    )
}

export default FilterForm;