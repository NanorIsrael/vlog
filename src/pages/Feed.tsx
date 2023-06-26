import Body from "../components/Body";
import PostProvider from "../components/Posts/Posts";

export default function FeedPage() {
  return (
    <Body sidebar>
      <PostProvider content="feed" />
    </Body>
  );
}
