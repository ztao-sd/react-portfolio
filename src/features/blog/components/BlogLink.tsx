import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

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

export default BlogLink;
