import React, { useState } from 'react'
import { Formik } from 'formik';

import  MultiStepFormTracker from './MultiStepFormTracker'

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

    const handleSubmit = (values, bag) => {
        if (isSubmissionPage) {
            next(values);
            return onSubmit(values, bag);
        } else {
            bag.setTouched({});
            bag.setSubmitting(false);
            next(values);
        }
    };


    return (
        <div className='multistep-form'>
            <MultiStepFormTracker
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

                            {(!isLastPage && !isSubmissionPage) && <button className="button" data-testid="next" type="submit">Next »</button>}
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

export default MultiStepForm
