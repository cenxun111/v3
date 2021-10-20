import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { allPost } from "../../redux/postAction";
import pug from "../../images/pug.png";
import { Link, useHistory } from "react-router-dom";
import Dropde from "./Dropde";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import CommentIcon from "@material-ui/icons/Comment";
import Mainct from "./Mainct";
const MainContent = () => {
  // const PF = "http://localhost:6400/images/";
  const PF = "/images/";
  const { login } = useSelector((state) => state);
  const { post } = useSelector((state) => state);
  const [isLike, setIsLike] = useState(false);
  const handleLike = () => {
    setIsLike(true)
  }
  const handleUnlike = () => {
    setIsLike(false)
  }
  // const [userPost,setUserPost] = useState([])
  const dispatch = useDispatch();
  const [vid, setVid] = useState(false);
  // useEffect(()=> {
  //     setUserPost (post.userPosts)
  // })
  //  dispatch((login.userData.token));
  useEffect(() => {
    if (login.userData.token) dispatch(allPost(login.userData.token));
  }, [dispatch, login.userData.token]);
  // console.log(post.userPosts);
  return (
    <div className="pt-2">
    
    <div className=" grid grid-cols-2 gap-1 mx-1 md:grid-cols-4 ">
    {post.userPosts.map(item => (
         <Mainct  key={item._id} posts={item}/>))}
</div>
</div>

  )
}

export default MainContent;
