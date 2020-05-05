import React from 'react';

function MultiStepFormProgessTracker({ pageTitles, pageIndex }) {
    const listItems = pageTitles.map((title, i) => {
        return (<li className={'step ' + (i === pageIndex ? 'active' : '')} key={i}>
            {title}
        </li>);
    });
    return (<div className='ordered steps'>
        <ul>{listItems}</ul>
    </div>);
}

export default MultiStepFormProgessTracker