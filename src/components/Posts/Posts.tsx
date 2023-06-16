import React from "react";
import { useEffect, useState } from "react";
import { useApi } from "../../data/ApiProvider";
import { PostType } from "../../models/post";
import Post from "./post";

type postProps = { content: string };
export default function Posts({ content }: postProps) {
  const [posts, setPost] = useState(undefined as PostType[] | undefined  | null);
  const api = useApi();

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
      } else {
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
}
interface PostResult {
  data: PostType[] | null | undefined
}