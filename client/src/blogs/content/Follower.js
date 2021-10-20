import React from 'react'
// import { useSelector, useDispatch } from "react-redux";
// import { singleUser } from "../../redux/userAction";
import { Link, useHistory, useParams } from "react-router-dom";
const Following = ({userInfo}) => {
    return (
        <div className="z-10 bg-blue-100 h-96 w-72 absolute top-0 left-3 ml-96 rounded-md pt-2">
            {userInfo.followers.map((follow) => (
                <div className="bg-blue-300 mt-2">
                    <Link to={`/user_xin/${follow.username}`}>
                    <h1>{follow.username}</h1>
                    </Link>
                    <h1>{follow.email}</h1>
                </div>
            ))}
        </div>
    )
}

export default Following