import React,{useState} from 'react'
import { upPost } from '../../redux/postAction';
import { upPostC } from '../../redux/postAction';
import { useDispatch,useSelector } from 'react-redux';
import {postDataAPI} from '../../redux/fetchData'
import ImageIcon from "@material-ui/icons/Image";

const Editpost = ({postdata}) => {

    const { login } = useSelector((state) => state);
    const [content,setContent] = useState("")
    const [photo,setPhoto] = useState("")
    console.log(content)
    const dispatch = useDispatch()
  
    const handleSubmit = async (e) =>{
        e.preventDefault();
        const newPost = {
            // content
              };
              if (photo) {
                const data = new FormData();
                const filename = Date.now() + photo.name;
                console.log(filename);
                data.append("name", filename);
                data.append("file", photo);
                newPost.photo = filename;
                try {
                  await postDataAPI("upload", data);
                } catch (err) {}
                upPost(newPost,(postdata._id),login.userData.token,dispatch)
        // console.log(({email,password}))
    };
 if(content){
  upPostC({content},(postdata._id),login.userData.token,dispatch)}
}
    return (
        <div className='bg-green-500  mx-auto text-center md:h-3/6 w-5/6' >
            {/* <h1>{postdata._id}</h1>
            <h1>hello world</h1> */}
            <form onSubmit={handleSubmit} >
                <div className ="">
            <h1>update content</h1>
            <textarea
                  className=" bg-gray-200 rounded-md py-1 pl-2 mt-2 h-36 md:w-5/6"
                  type="text"
                  defaultValue={postdata.content}
                // value="kagjklgjagkajg"
                  placeholder="Your's content..."
                  onChange={(e) => setContent(e.target.value)}
                />
                   <label className="p-4 bg-green-100 rounded-lg cursor-pointer">
                  <ImageIcon />
                  <input
                    type="file"
                    multiple
                    onChange={(e) => setPhoto(e.target.files[0])}
                    className="hidden"
                  />
                </label>
                <div>
                <button className="bg-gray-300 p-2 m-2 rounded-md" type="submit">update</button>
                </div>
                </div>
                </form>
        </div>
    )
}

export default Editpost
