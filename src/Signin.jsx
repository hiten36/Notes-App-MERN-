import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import NoteContext from './state/NoteContext';

const Signin = (props) => {
    const context = useContext(NoteContext);
    const navigate=useNavigate();
    useEffect(()=>{
        props.topl(100);
        if(localStorage.getItem('token'))
        {
            navigate('/');
        }
    },[]);
    const [data, setData] = useState({
        name:'',
        age:'',
        password:''
    });
    function func3(e)
    {
        setData({...data,[e.target.name]:e.target.value});
    }
    async function func4(e)
    {
        e.preventDefault();
        let value=await context.signin(data.name,data.age,data.password,props.topl);
        if(value.success)
        {
            props.trigger('success',value.message);
            navigate('/');
        }
        else{
            props.trigger('danger',value.message);
        }
    }

    return (
        <>
         
            <div className="container">
                <h1 className="my-4">Signin</h1>
                <form onSubmit={func4}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">User Name</label>
                        <input type="text" className="form-control" id="name" name="name" placeholder="Enter Name" value={data.name} onChange={func3} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="age" className="form-label">Age</label>
                        <input type="text" className="form-control" id="age" name="age" placeholder="Enter Age" value={data.age} onChange={func3} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="text" className="form-control" id="password" name="password" placeholder="Enter Password" value={data.password} onChange={func3} required/>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </>
    )
}

export default Signin;