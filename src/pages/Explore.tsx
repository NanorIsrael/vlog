import Body from "../components/Body";
import Posts from "../components/Posts/Posts";

export default function ExplorePage() {
  return (
    <Body sidebar>
      <Posts content="posts" />
    </Body>
  );
}
