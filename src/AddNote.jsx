import React, { useState, useContext } from 'react'
import NoteContext from './state/NoteContext';

const AddNote = (props) => {
    const context = useContext(NoteContext)
    const [data, setData] = useState({
        title:'',
        desc:''
    });
    function func(e)
    {
        setData({...data,[e.target.name]:e.target.value});
    }
    function func1(e)
    {
        e.preventDefault();
        setData({
            title:'',
            desc:''
        })
        context.addNote(data.title,data.desc,props.topl);
        props.func5('success','Note created successfully1 ');
    }
    return (
        <>
            <form onSubmit={func1}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Note Title</label>
                    <input type="text" className="form-control" id="title" name="title" placeholder="Enter Title" value={data.title} onChange={func} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="desc" className="form-label">Note Description</label>
                    <textarea className="form-control" id="desc" name="desc" placeholder="Enter Description" value={data.desc} rows="3" onChange={func} required></textarea>
                </div>
                <button className="btn btn-primary">Add Note</button>
            </form>
        </>
    )
}

export default AddNote