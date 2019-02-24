import React from 'react';
import classes from './Backdrop.css';

const backDrop = props => (
    props.showModal ? <div className={classes.Backdrop}
                        onClick={props.backClicked}></div> : null
);

export default backDrop;