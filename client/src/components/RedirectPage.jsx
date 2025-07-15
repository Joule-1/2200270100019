import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Log } from "../utils/logger";

const RedirectPage = () => {
  const { shortcode } = useParams();

  useEffect(() => {
    const map = JSON.parse(localStorage.getItem("urlMap") || "{}");
    const url = map[shortcode];

    if (url) {
      Log("frontend", "info", "redirect", `Redirecting to ${url}`);
      setTimeout(() => {
        window.location.href = url;
      }, 1000);
    } else {
      Log("frontend", "error", "redirect", `Invalid shortcode: ${shortcode}`);
      alert("Invalid or expired shortcode.");
    }
  }, [shortcode]);

  return <div>Redirecting...</div>;
};

export default RedirectPage;
