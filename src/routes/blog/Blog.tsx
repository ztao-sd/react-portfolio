import { Link, Outlet, useLocation } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { BLOG_LINKS } from "@/constants/constants";
import { cn } from "@/lib/utils";

const blogLinks = BLOG_LINKS;

interface BlogLinkProps {
  link: string;
  title: string;
  author: string;
  date: Date;
  tags: string[];
  preview: string;
}

const BlogLink: React.FC<BlogLinkProps> = ({
  link,
  title,
  author,
  date,
  tags,
  preview,
}) => {
  let color_idx = Math.floor(Math.random() * 10);
  return (
    <div className="my-2">
      <Link to={link} className="text-slate-900">
        <h2 className="text-xl font-bold">{title}</h2>
      </Link>

      <div className="flex gap-2">
        <p className="text-sm text-gray-500">By {author}</p>
        <span className="text-sm text-gray-500">{date.toString()}</span>
      </div>
      <div className="mt-2 flex flex-wrap">
        {tags.map((tag, idx) => {
          color_idx++;
          const rem = color_idx % 10;
          return (
            <span
              key={idx}
              className={cn(
                "mr-2 rounded border bg-blue-300 text-sm text-gray-500",
                {
                  ["bg-red-300"]: rem % 10 === 0,
                  ["bg-yellow-300"]: rem % 10 === 1,
                  ["bg-green-300"]: rem % 10 === 2,
                  ["bg-blue-300"]: rem % 10 === 3,
                  ["bg-indigo-300"]: rem % 10 === 4,
                  ["bg-purple-300"]: rem % 10 === 5,
                  ["bg-pink-300"]: rem % 10 === 6,
                  ["bg-gray-300"]: rem % 10 === 7,
                  ["bg-slate-300"]: rem % 10 === 8,
                  ["bg-orange-300"]: rem % 10 === 9,
                },
              )}
            >
              {tag}
            </span>
          );
        })}
      </div>
      <p className="mt-2">{preview}</p>
      <hr className="my-8 h-px border-0 bg-gray-400 dark:bg-gray-700"></hr>
    </div>
  );
};

const BlogPage = () => {
  const location = useLocation();
  let blogPath = "";

  const generateBreadcrumb = () => {
    let dirs = location.pathname.split("/");
    const index = dirs.indexOf("blog");
    if (index > 0) {
      dirs = dirs.slice(index);
    }
    return (
      <div className="h-4">
        <Breadcrumb>
          <BreadcrumbList>
            {dirs.map((dir, idx) => {
              blogPath += `/${dir}`;
              return (
                <>
                  <BreadcrumbItem key={idx}>
                    <Link to={blogPath} className="text-slate-900">
                      {dir}
                    </Link>
                  </BreadcrumbItem>
                  {idx < dirs.length - 1 ? <BreadcrumbSeparator /> : null}
                </>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    );
  };

  return (
    <div className="ml-4 mt-2">
      {generateBreadcrumb()}
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

export default BlogPage;
