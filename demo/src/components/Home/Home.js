import React, { useEffect, useState } from "react";
import Post from "../Post/Post";
import PostForm from "../Post/PostForm";

function Home() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [postList, setPostList] = useState([]);

  const RefreshPost = () => {
    fetch("/posts")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setPostList(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  };

  useEffect(() => {
    RefreshPost(); // Sayfa ilk defa render olduğunda çalışır
  }, []); // Boş array: Sadece bileşen ilk kez render olduğunda çalışacak

  if (error) {
    return <div>Error!!!</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="container">
        {localStorage.getItem("currentUser") == null ? "" : <PostForm userId={localStorage.getItem("currentUser")} userName={localStorage.getItem("userName")} refreshPost={RefreshPost} /> }
         {/* refreshPost'u props olarak geçiriyoruz */}
        {postList.map((post) => (
          <Post likes = {post.postLikes}
            postId={post.id}
            userId={post.userId}
            userName={post.userName}
            text={post.text}
            title={post.title}
          />
        ))}
      </div>
    );
  }
}

export default Home;
