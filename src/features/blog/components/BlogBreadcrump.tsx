import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface Path {
  pathname: string;
}

interface BlogBreadcrumbProps {
  location: Path;
}

const BlogBreadcrumb = ({ location }: BlogBreadcrumbProps) => {
  let blogPath = "";
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

export default BlogBreadcrumb;
