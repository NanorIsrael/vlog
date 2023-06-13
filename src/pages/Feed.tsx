import Body from "../components/Body";
import Posts from "../components/Posts/Posts";

export default function FeedPage() {
  return (
    <Body sidebar>
      <Posts content="feed" />
    </Body>
  );
}