import { Log } from "../utils/logger";

export const shortenURL = async (url, validity, shortcode) => {
  await Log("frontend", "info", "api", `Mock shortening for URL: ${url}`);

  const code = shortcode || Math.random().toString(36).substring(2, 7);

  const map = JSON.parse(localStorage.getItem("urlMap") || "{}");
  map[code] = url;
  localStorage.setItem("urlMap", JSON.stringify(map));

  return {
    shortUrl: `http://localhost:3000/${code}`,
    expiresAt: new Date(Date.now() + (validity || 30) * 60000).toISOString(),
  };
};


export const fetchStats = async () => {
  await Log("frontend", "info", "api", "Mock fetching stats");

  const map = JSON.parse(localStorage.getItem("urlMap") || "{}");

  return Object.entries(map).map(([code, url]) => ({
    shortUrl: `http://localhost:3000/${code}`,
    createdAt: "(from localStorage)",
    expiresAt: "(mocked expiry in 30 mins)",
    clickCount: 0,
    clicks: [],
  }));
};

