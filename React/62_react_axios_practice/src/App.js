import { Routes, Route } from "react-router-dom";
import { NotFound, PostsPage } from "./pages";
import DefaultTemplate from "./components/template/DefaultTemplate";
import { PostPage } from "./pages";
const App = () => {
  return (
    <DefaultTemplate>
      <Routes>
        <Route path="/" element={<h1>home~</h1>} />
        <Route path="/posts" element={<PostsPage />} />
        <Route path="/posts/:postId" element={<PostPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </DefaultTemplate>
  );
};
export default App;
