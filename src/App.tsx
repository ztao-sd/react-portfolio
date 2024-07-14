import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/Root";
import ErrorPage from "./routes/Error";
import HomePage from "./routes/Home";
import AboutPage from "./routes/About";
import BlogPage from "./routes/blog/Blog";
import TicTacToePage from "./routes/TicTacToe";
import DemoBlog from "./routes/blog/DemoBlog.mdx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/home",
        element: <HomePage></HomePage>,
      },
      {
        path: "/about",
        element: <AboutPage></AboutPage>,
      },
      {
        path: "/blog",
        element: <BlogPage></BlogPage>,
        children: [
          {
            path: "/blog/demo",
            element: <DemoBlog></DemoBlog>,
          },
        ],
      },
      {
        path: "/tictactoe",
        element: <TicTacToePage></TicTacToePage>,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
