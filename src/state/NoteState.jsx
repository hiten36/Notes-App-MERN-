import React, { useState } from 'react'
import NoteContext from './NoteContext'
const host=`http://localhost:5000`;

const NoteState = (props) => {
    const [data, setData] = useState([]);
    async function getData(topl)
    {
        topl(20);
        const response=await fetch(`${host}/notes`,{
            method:'GET',
            headers:{
                'content-type':'application/json',
                'jwt':localStorage.getItem('token')
            }
        })
        topl(50);
        const value=await response.json();
        topl(80);
        setData(value);
        topl(100);
    }
    async function addNote(title,desc,topl)
    {
        topl(20);
        let response=await fetch(`${host}/notes`,{
            method:'POST',
            headers:{
                'content-type':'application/json',
                'jwt':localStorage.getItem('token')
            },
            body:JSON.stringify({title,desc})
        });
        topl(50);
        let value=await response.json();
        topl(80);
        setData(data.concat(value));
        topl(100);
    }
    async function editNote(title,desc,id,topl)
    {
        topl(20);
        await fetch(`${host}/notes/${id}`,{
            method:'PUT',
            headers:{
                'content-type':'application/json',
                'jwt':localStorage.getItem('token')
            },
            body:JSON.stringify({title,desc})
        });
        topl(50)
        let data1=[];
        for(let i=0;i<data.length;i++)
        {
            let currNote=data[i];
            if(currNote._id===id)
            {
                currNote.title=title;
                currNote.desc=desc;
            }
            data1.push(currNote);
        }
        topl(80);
        setData(data1);
        topl(100);
    }
    async function deleteNote(id,topl)
    {
        topl(20);
        await fetch(`${host}/notes/${id}`,{
            method:'DELETE',
            headers:{
                'content-type':'application/json',
                'jwt':localStorage.getItem('token')
            }
        })
        topl(60);
        setData(data.filter((e)=>{
            return e._id!==id;
        }))
        topl(100);
    }
    async function signin(name,age,password,topl)
    {
        topl(20);
        let response=await fetch(`${host}/signin`,{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify({name,age,password})
        });
        topl(60);
        let data=await response.json();
        topl(100);
        return data;
    }
    async function login(name,password,topl)
    {
        topl(20);
        let response=await fetch(`${host}/login`,{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify({name,password})
        });
        topl(60);
        let data=await response.json();
        topl(100);
        return data;
    }
    async function logout()
    {
        await fetch(`${host}/logout`,{
            method:'GET',
        });
        localStorage.removeItem('token');
    }
    return (
        <NoteContext.Provider value={{data,getData,addNote,editNote,deleteNote,login,signin,logout}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;