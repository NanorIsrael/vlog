import { memo } from "react";
import { useEffect, useState } from "react";
import { useApi } from "../../data/ApiProvider";
// import { Provider, useSelector } from "react-redux";
// import Store from '../../store'
import { PostResult, PostType } from "../../models/post";
import Post from "./post";
// import {useDispatch} from "react-redux";
// import {post} from "../../PostSlice";



type postProps = { content: string };
export default memo(function Posts({ content }: postProps) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  // const posts:  PostType[] | null |undefined = useSelector<null, PostType[] | undefined | null>((state) => state as  PostType[] | null | undefined) 
  const [posts, setPost] = useState(undefined as PostType[] | undefined  | null);
  const api = useApi();
  // const  dispatch  = useDispatch();

  // console.log("this is post", posts)
  let url: string;
  switch (content) {
    case "feed":
    case undefined:
      url = "/feed";
      break;
    case "posts":
      url = "/posts";
      break;
    default:
      url = "/users/" + content + "/posts";
  }
  useEffect(() => {
    void (async () => {
      const res = await api.get<PostResult>(url);
      if (res.ok) {
        setPost(res.body?.data);
        // dispatch(post(res.body?.data))
      } else {
        // dispatch(post(null));
        setPost(null);
      }
    })();
  }, [api, url]);

  return (
    <article className="grid gap-4 sm:grid-cols-2">
       {posts === undefined ? (
        <p>Loading</p>
      ) : (
        <div >
          {posts === null ? (
            <p>Could not retrieve blog post</p>
          ) : posts.length === 0 ? (
            <p>Create post</p>
          ) : (
            <>
              {posts.map((post) => {
                return <Post {...post} key={post.id} />;
              })}
            </>
          )} 
        </div>
      )}
    </article>
  );
});


// export default function PostProvider({ content }: postProps){
//   return (
//           <Provider store={Store}>
//             <Posts content={content}/>
//           </Provider>
//   )
// }