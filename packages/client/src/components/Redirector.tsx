import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCheckCodeMutation } from "../services/api";
import NotFound from "../pages/NotFound";

export const Redirector = () => {
  const { code } = useParams<{ code: string }>();
  const [checkCode, { isLoading, isError }] = useCheckCodeMutation();

  useEffect(() => {
    if (code) {
      checkCode(code)
        .unwrap()
        .then((result) => {
          // We could handle the instance of no result.url, but it should be 100% impossible.
          // Our API would be very broken
          window.location.replace(result.long_url);
        })
        .catch(console.error);
    }
  }, [checkCode, code]);

  // This could actually check the status code and return a specific component
  // for the error code, but this will do for now.
  if (isError) {
    return <NotFound />;
  }

  if (isLoading) {
    return null;
  }

  return null;
};

export default Redirector;
