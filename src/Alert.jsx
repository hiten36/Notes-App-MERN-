import React from 'react'

const Alert = (props) => {
    let cls=`alert alert-${props.color} alert-dismissible fade show`;
    return (
        <div className={cls} role="alert">
            <strong>{props.message}</strong>
        </div>
    )
}

export default Alert;