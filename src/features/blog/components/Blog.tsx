import { Outlet, useLocation } from "react-router-dom";
import { BLOG_LINKS } from "@/config/constants";
import BlogBreadcrumb from "@/features/blog/components/BlogBreadcrump";
import BlogLink from "@/features/blog/components/BlogLink";

const blogLinks = BLOG_LINKS;

const Blog = () => {
  const location = useLocation();

  return (
    <div className="ml-4 mt-2">
      <BlogBreadcrumb location={location}></BlogBreadcrumb>
      <div className="mx-14 mt-4 flex flex-col rounded bg-white/70 px-4 pb-2 pt-2 backdrop-blur">
        {location.pathname === "/blog" ? (
          blogLinks.map((item, idx) => {
            return (
              <BlogLink
                link={item.route}
                title={item.label}
                author="Tao"
                date={new Date()}
                tags={["React", "TypeScript"]}
                preview="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                key={idx}
              />
              // <Link to={item.route} key={idx} className="hover:text-sky-600">
              //   {item.label}
              // </Link>
            );
          })
        ) : (
          <div className="markdown">
            <Outlet></Outlet>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
