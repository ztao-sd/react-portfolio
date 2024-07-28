import { useRouteError } from "react-router-dom";

interface ErrorInterface {
  status: number;
  statusText: string;
  data: string;
}

export default function ErrorPage() {
  const error = useRouteError() as ErrorInterface;
  console.error(error);

  return (
    <div
      id="error-page"
      className="flex h-screen flex-col items-center justify-center gap-4"
    >
      <h1>Oops!</h1>
      <p>An unexpected error has occured!</p>
      <p>
        <i>
          {error.status} {error.statusText} {error.data}
        </i>
      </p>
    </div>
  );
}
