import React, { useState } from 'react'
import { Formik } from 'formik';
import  MultiStepFormProgessTracker from './MultiStepFormProgessTracker'

// MultiStepFormPage is to be nested in MultiStepForm to demarcate where each form page begins and ends. 

function MultiStepFormPage({ children, title }) {
    return (children)
  }  

function MultiStepForm({ initialValues, children, onSubmit, validationSchema }) {
    const [pageIndex, setPage] = useState(0)
    const [values, setValues] = useState(initialValues)
    const pages = React.Children.toArray(children)
    const activePage = pages[pageIndex];
    const isLastPage = pageIndex === React.Children.count(children) - 1;
    const isSubmissionPage = pageIndex === React.Children.count(children) - 2;
    const pageTitles = pages.map(page => page.props.title)

    const next = (values) => {
        setPage(Math.min(pageIndex + 1, children.length - 1))
        setValues(values)
    }

    const previous = () => {
        setPage(Math.max(pageIndex - 1, 0))
    }

    const handleSubmit = (values, FormikBag) => { // only submit the form if the user is on the submission
        if (isSubmissionPage) {
            next(values); // continue on to the success page
            return onSubmit(values, FormikBag);
        } else {
            FormikBag.setTouched({});
            FormikBag.setSubmitting(false);
            next(values);
        }
    };


    return (
        <div className='multistep-form'>
            <MultiStepFormProgessTracker
                pageTitles={pageTitles}
                pageIndex={pageIndex}
            />
            <Formik
                initialValues={values}
                enableReinitialize={false}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ handleSubmit, isSubmitting }) => (
                    <form onSubmit={handleSubmit}>
                        {activePage}
                        <div className="buttons">
                            {pageIndex > 0 && (
                                <button
                                    type="button"
                                    className="button secondary"
                                    onClick={previous}
                                >
                                    « Previous
                                </button>
                            )}

                            {(!isLastPage && !isSubmissionPage) && (  // add the next button to pages before the submission page
                                <button className="button" data-testid="next" type="submit">Next »</button>
                            )}
                            {isSubmissionPage && (
                                <button className="button" data-testid="submit" type="submit" disabled={isSubmitting}>
                                    Submit
                                </button>
                            )}
                        </div>

                    </form>
                )}
            </Formik>
        </div>

    );
}

export {MultiStepForm, MultiStepFormPage}
