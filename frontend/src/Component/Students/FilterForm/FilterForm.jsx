import React from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from 'yup';
import style from "./FilterForm.module.css";


const SignupSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Too Short!')
        .max(100, 'Too Long!'),
    lastName: Yup.string()
        .min(2, 'Too Short!')
        .max(100, 'Too Long!'),
});


const FilterForm = ({filterStudent}) => {
    return (
        <Formik
            initialValues={{ name: "", lastName: ""}}
            onSubmit={async (values) => {
                filterStudent(values.name, values.lastName)
                // setSubmitting(false);
                
            }}
            validationSchema={SignupSchema}
        >
            {({ errors, touched, status }) => (
                <div className={style.myForm}>
                    <Form>
                        <div className={errors.name && touched.name ? style.errors : null}>
                            {errors.name && touched.name ? (
                                <div>{errors.name}</div>
                            ) : null}
                            <Field placeholder={'Name'} name={'name'} type={'input'} />
                        </div>
                        <div className={errors.lastName && touched.lastName ? style.errors : null}>
                            {errors.lastName && touched.lastName ? (
                                <div>{errors.lastName}</div>
                            ) : null}
                            <Field placeholder={'Last Name'} name={'lastName'} type={'input'} />
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