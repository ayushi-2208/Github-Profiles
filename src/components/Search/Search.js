import React,{useState} from "react";
import './search.css'
import Info from '../Info/Info'
const Search = ()=>{
    const [username, setUsername] = useState("");
    const [info, setInfo] = useState({ element: <div style={{display : "none"}}/>});

    const handleSubmit=(e)=>{
        e.preventDefault();
        setInfo({element: <Info username={username}/>});
    }
    return(
        <div className="searchbar">
            <form className="form" onSubmit={handleSubmit}>
            <input type="text"placeholder="Search by username" onChange={e => setUsername(e.target.value)} required={true}/>
            <button className="button" type="submit">Search</button>
           
        </form>
        {info.element}
        </div>
        
        
    )
}

export default Search