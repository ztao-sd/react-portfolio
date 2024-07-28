import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "@/app/pages/Root";
import ErrorPage from "@/app/pages/Error";
import HomePage from "@/app/pages/Home";
import AboutPage from "@/app/pages/About";
import BlogPage from "@/app/pages/blog/Blog";
import TicTacToePage from "@/app/pages/TicTacToe";
import DemoBlog from "@/app/pages/blog/DemoBlog.mdx";

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
