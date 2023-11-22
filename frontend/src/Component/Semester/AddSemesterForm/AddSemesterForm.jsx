import React from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from 'yup';
import style from "../../Students/FilterForm/FilterForm.module.css";

const SignupSchema = Yup.object().shape({
    num_semester: Yup.string()
        .max(100, 'Too Long!')
        .required('Required'),
});


const AddSemesterForm = ({postSemester}) => {
    return (
        <Formik
            initialValues={{ num_semester: null}}
            onSubmit={async (values, {setValues}) => {
                postSemester(values.num_semester)
                setValues({ num_semester: "" });

            }}
            validationSchema={SignupSchema}
        >
            {({ errors, touched, status }) => (
                <div className={style.myForm}>
                    <Form>
                        <div className={errors.num_semester && touched.num_semester ? style.errors : null}>
                            {errors.num_semester && touched.num_semester ? (
                                <div>{errors.num_semester}</div>
                            ) : null}
                            <Field placeholder={'Num semester'} name={'num_semester'} type={'input'} />
                        </div>
                        <div>
                            <button type="submit">Create Semester</button>
                        </div>
                        
                    </Form>
                </div>

            )}
        </Formik>
    )
}

export default AddSemesterForm;