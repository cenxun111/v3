import React, { useState, useEffect, useRef } from "react";
import infopic from "../../images/pug.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/authAction";
import { singleUser } from "../../redux/userAction";

const Evdrop = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.login);
  const { login } = useSelector((state) => state);
  // const { userName } = useSelector((state) => state.login);
  // const { userdata } = useSelector((state) => state);
  const [isActive, setIsActive] = useState(false);
// const {username} = login.userName.username
//   useEffect(() => {
//     dispatch(singleUser({username}, login.userData.token));
//   }, [dispatch,login.userData.token]);
// console.log(login.userName.username)
// console.log(login.userData.token)
  let menuRef = useRef();
// console.log(userInfo.username)
  useEffect(() => {
    let handler = (event) => {
      if (!menuRef.current.contains(event.target)) {
        setIsActive(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });
  return (
    <div ref={menuRef} className="relative" >
      <div className=" w-20 md:w-28">
        <img
          className="w-10 h-10 rounded-full  mx-auto"
          src={infopic}
          alt=""
          onClick={(e) => setIsActive(!isActive)}
        />
      </div>
      {isActive && (
         <div className=" p-2 text-green-500 bg-gray-500 rounded-md text-xl mt-12 py-2 w-24 mx-1 z-30 absolute top-0 right-0 md:w-28">
          <div className="flex justify-center py-2 hover:bg-gray-300 rounded-md">
            <h1 onClick={(e) => setIsActive(!isActive)}>
              <Link to={`/user_info/${userInfo.username}`}>
                {userInfo.username}
              </Link>
            </h1>
          </div>
          <div className="flex justify-center py-2 hover:bg-gray-300 rounded-md">
            <h1 onClick={(e) => setIsActive(!isActive)}>
              <Link to="/upload">upload</Link>
            </h1>
          </div>
          <div className="flex justify-center py-2 hover:bg-gray-300 rounded-md">
            <h1 onClick={(e) => setIsActive(!isActive)}>
              <Link to="/mylikedpost">favlike</Link>
            </h1>
          </div>
          <div className="flex justify-center py-2 hover:bg-gray-300 rounded-md">
            <h1 onClick={(e) => setIsActive(!isActive)}>
            <Link to ="/alluser">ALLUSER</Link>
            </h1>
          </div>
          <div className="flex justify-center py-2 hover:bg-gray-300 rounded-md">
            <h1 onClick={(e) => setIsActive(!isActive)}>
            <Link to ="/mypost">Myposts</Link>
            </h1>
          </div>
          {/* <div className="flex justify-center py-2">UPLOAD</div> */}
          <div className="flex justify-center py-2 hover:bg-gray-300 rounded-md">
            <h1 onClick={() => dispatch(logout())}>logout</h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default Evdrop;
