import React, { useContext, useEffect, useState } from 'react'
import AddNote from './AddNote'
import Card from './Card';
import NoteContext from './state/NoteContext'
import EditModal from './EditModal';
import Alert from './Alert';

const Home = (props) => {
    const [flag, setFlag] = useState(false);
    const [color, setColor] = useState('');
    const [message, setMessage] = useState('');
    const data=useContext(NoteContext);
    useEffect(()=>{
        data.getData(props.topl);
    },[])
    const [data1, setData1] = useState({
        editTitle:'',
        editDesc:''
    });
    const [id, setId] = useState(0);
    function func(e)
    {
        setData1({...data1,[e.target.name]:e.target.value});
    }
    function func2(data)
    {
        setId(data._id);
        setData1({
            editTitle:data.title,
            editDesc:data.desc,
        });
    }
    function func1(e)
    {
        e.preventDefault();
        data.editNote(data1.editTitle,data1.editDesc,id,props.topl);
        trigger('success','Note edited successfully! ');
    }
    function trigger(color,message)
    {
        setColor(color);
        setMessage(message);
        setFlag(true);
        setTimeout(() => {
            setFlag(false);
        }, 4000);
    }
    return (
        <>
            {flag ? <Alert color={color} message={message} /> : null}
            <EditModal func={func} data={data1} func1={func1} />
            <div className="container my-2">
                <h1 className="my-3">Notes App React</h1>
                {localStorage.getItem('token') ? 
                <>
                    <h3 className="mb-4">Add a note</h3>
                    <AddNote topl={props.topl} func5={trigger} />
                    <div className="my-4 row">
                        {data.data.length!==0 ? 
                            data.data.map((e,index)=>{
                                return (
                                    <Card func5={trigger} key={index} func2={func2} data={e}/>
                                )
                            })
                        : <h4>No notes available, Add some notes first! </h4>}
                    </div>
                </>
                : <h3>Login to add a note! </h3>}

            </div>
        </>
    )
}

export default Home;