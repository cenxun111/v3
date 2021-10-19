import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { allYonPost } from "../../redux/postAction";
import { Link, useHistory } from "react-router-dom";
import Dropde from "./Dropde";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import CommentIcon from "@material-ui/icons/Comment";
import { likePost, unlikePost } from "../../redux/postAction";
import pug from "../../images/pug.png";
import { singleUser } from "../../redux/userAction";

const Allposts = () => {
  // const PF = "http://localhost:6400/images/";
  const PF = "/images/";
  const { login } = useSelector((state) => state);
  const { allPost } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const [vid, setVid] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const [loadLike, setLoadlike] = useState(false);

  useEffect(() => {
    if (login.userData.token) dispatch(allYonPost(login.userData.token));
  }, [dispatch, login.userData.token]);

  const handleLike = async () => {
    if (loadLike) return;
    setIsLike(true);
    setLoadlike(true);
    await likePost(posts, userData, dispatch);
    setLoadlike(false);
  };
  const handleUnlike = async () => {
    if (loadLike) return;
    setIsLike(false);
    setLoadlike(true);
    await unlikePost(posts, userData, dispatch);
    setLoadlike(false);
  };

  return (
    <div className="grid grid-cols-1 mx-1 md:grid-cols-4">
      {allPost.map((allps) => (
        <div key={allps._id}>
          <div
            // style={{
            //   backgroundImage: `url(${PF + allps.photo})`,
            //   backgroundSize: "cover",
            //   backgroundcolor: "transparent",
            // }}
          >
            <div className="h-full  mt-4 mx-1 rounded-md text-center pt-3 bg-gray-500 relative">
              {admin && <Dropde key={allps._id} postInfo={allps} />}
              <img
                src={pug}
                className="h-10 w-10 rounded-md absolute top-1 left-3"
              />
              <h1 className="hover:text-gray-300 text-gray-600 pl-16 absolute">
                <Link to={`/user/${allps.username}`}>{allps.username}</Link>
              </h1>
              <h1 className="pt-12 mx-2 text-left text-white">
           <Link to={`/user_post/${allps._id}`}>{allps.content}</Link>
         </h1>

              {!vid ? (
                <img
                  src={PF + allps.photo}
                  className="rounded-md pt-6 mx-auto"
                />
              ) : (
                <video
                  controls
                  src={PF + allps.photo}
                  className="rounded-md pt-3"
                />
              )}
              <div className="flex justify-between pt-3 pb-1 mx-2">
                <div>
                  {!isLike ? (
                    <button onClick={handleLike} className="pr-1">
                      {" "}
                      <FavoriteBorderIcon />{" "}
                    </button>
                  ) : (
                    <button onClick={handleUnlike}>
                      {" "}
                      <FavoriteIcon />{" "}
                    </button>
                  )}

                  <CommentIcon />
                </div>
                <BookmarkBorderIcon />
                {/* <BookmarkIcon /> */}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Allposts;
