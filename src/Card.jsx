import React, { useContext } from 'react'
import i1 from './images/delete.svg'
import i2 from './images/edit.svg'
import NoteContext from './state/NoteContext'

const Card = (props) => {
    const context = useContext(NoteContext);
    function func(id)
    {
        props.func5('success','Note deleted successfully! ');
        context.deleteNote(id);
    }
    return (
        <>
            <div className="col-md-4">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">{props.data.title}</h5>
                        <p className="card-text">{props.data.desc}</p>
                        <div className="row justify-content-between">
                            <img src={i1} alt={i1} onClick={()=>{
                                func(props.data._id);
                            }} />
                            <img src={i2} alt={i2} onClick={()=>{
                                props.func2(props.data);
                            }} data-bs-toggle="modal" data-bs-target="#editModal" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Card;