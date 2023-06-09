import { PostType } from "../../models/post";
import TimeAgo from "../TimeAgo";

export default function Post({ id, author, text, timestamp }: PostType) {
  return (
    <>
      <img src={author.avatar_url + "&s=48"} alt="" />
      <p>
        <strong>{author.username}</strong> &mdash;&nbsp;
        <TimeAgo isoDate={timestamp} />
        <br />
        {text}
      </p>
    </>
  );
}
