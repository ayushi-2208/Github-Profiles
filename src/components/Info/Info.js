import React,{useState, useEffect} from "react";
import swal from 'sweetalert';
import './info.css'

const Info = ({ username }) => {
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [found, setFound] = useState(false);

  async function getUser(username) {
    try {
      setFound(true);
      const data = await fetch(`https://api.github.com/users/${username}`);
      console.log(data, "users data")
      data.json().then((response) => setUser(response));
      const reposData = await fetch(
        `https://api.github.com/users/${username}/repos`
      );
      reposData.json().then((response) => {
        try {
          response.sort((a, b) => {
            if (a.created_at < b.created_at) {
              return 1;
            }
            if (a.created_at > b.created_at) {
              return -1;
            }
            return 0;
          });
          setRepos(response.slice(0, 4));
        } catch (error) {
          swal("User not found");
          setFound(false);
        }
      });
    } catch (error) {
      swal("User not found");
    }
  }
  const userInfo = (user) => {
    return(<div className="outer_container">
      <div className="inner_container">
        <img src={user.avatar_url} className="image"/>
        <div className="textbox">
          Name: {user.name}<br/>Username: {user.login}<br/>Followers: {user.followers}<br/>Repositories count: {user.public_repos}
        </div>
        <div className="textbox">
        Newest Repositories:<br/>{ repos.map(element => { return ( <div key={element.id}> {element.name} <br/> </div>)})}
        </div>
      </div>
      
    </div>
    )
    
  }
  useEffect( () => {
    getUser(username);
  }, [username]);

  return(
    <>{(user !== {} & found === true) ? userInfo(user) : null }</>
  );
};

export default Info;
