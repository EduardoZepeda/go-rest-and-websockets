import { useEffect, useState, useRef } from 'react'
import './App.css';

function App() {
  const [posts, setPosts] = useState([])
  const stateRef = useRef(null);
  let content

  useEffect(()=>{
    // this sets a reference to posts and saves it in current
    stateRef.current = posts
  }, [posts])
  
  useEffect(()=>{

    const fetchPosts = async () => {
      const data = await fetch("http://localhost:5050/posts", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
      })
      const json = await data.json()
      setPosts(json)
    }

    fetchPosts()

    var socket = new WebSocket("ws://localhost:5050/ws")

    socket.onopen = (event) => {
        console.log("Connected to websocket")
    }
    socket.onmessage = (event) => {
        const messageJson = JSON.parse(event.data)
        if(messageJson.type === 'Post_Created'){
          // if we use posts instead the function is created when posts = []
          // So the function is called and will set state to [newPost, ...[]] = [newPost]
          setPosts([messageJson.payload, ...stateRef.current])
        }
    }
    socket.onerror = (event) => {
        console.log("error: " + event.data)
    }
    
    return () => { socket.OPEN && socket.close() }

      }, [])

  if(posts){
    content = posts.map(({id, post_content, created_at, user_id}) => {
      return (
        <article key={id} className='post'>
          <h2 className="post-title">{post_content}</h2>
          <small className="post-data">{created_at} by user {user_id}</small>
        </article>
      )
    })
  } else {
    content = "Nothing to see here"
  }

  return (
    <>
    <h1>My golang blog served with React</h1>
    <div className='posts-container'>{content}</div>
    </>
  );
}

export default App;
