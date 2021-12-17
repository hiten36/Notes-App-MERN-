import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import NoteContext from './state/NoteContext';

const Login = (props) => {
    const context = useContext(NoteContext);
    const navigate=useNavigate();
    useEffect(()=>{
        props.topl(100);
        if(localStorage.getItem('token'))
        {
            navigate('/');
        }
    },[])
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
        let value=await context.login(data.name,data.password,props.topl);
        let token=value.jwt;
        localStorage.setItem('token',token);
        if(value.success)
        {
            navigate('/');
            props.trigger('success',value.message);
        }
        else{
            props.trigger('danger',value.message);
        }
    }
    return (
        <>
            <div className="container">
                <h1 className="my-4">Login</h1>
                <form onSubmit={func4}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">User Name</label>
                        <input type="text" className="form-control" id="name" name="name" placeholder="Enter Name" value={data.name} onChange={func3} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="text" className="form-control" id="password" name="password" placeholder="Enter Password" value={data.password} onChange={func3} required />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </>
    )
}

export default Login;