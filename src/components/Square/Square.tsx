import React from 'react';
import classes from './Square.module.scss';

const Square = props => {
    const rowClasses = [classes.Square, 'd-flex', 'justify-content-center']; 

    return (
        <div className={rowClasses.join(' ')}>
            { props.children  }
        </div>
    )
}

export default React.memo(Square);