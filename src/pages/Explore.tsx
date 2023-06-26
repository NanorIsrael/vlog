import Body from "../components/Body";
import PostProvider from "../components/Posts/Posts";
// import Posts from "../components/Posts/Posts";

export default function ExplorePage() {
  return (
    <Body sidebar>
      <PostProvider content="posts" />
    </Body>
  );
}
