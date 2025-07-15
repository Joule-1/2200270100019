// src/components/StatisticsPage.js
import { useEffect, useState } from "react";

const StatisticsPage = () => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const map = JSON.parse(localStorage.getItem("urlMap") || "{}");
    const data = Object.entries(map).map(([code, url]) => {
      return {
        shortUrl: `http://localhost:3000/${code}`,
        originalUrl: url,
        createdAt: "(localStorage entry)",
        expiresAt: "(mock expires in 30 mins)",
        clickCount: 0,
        clicks: [],
      };
    });
    setStats(data);
  }, []);

  return (
    <div style={{ border: "1px solid #ccc", padding: 20, marginTop: 20, borderRadius: 6 }}>
      <h3>Shortened URL Statistics</h3>
      {stats.length === 0 && <div>No URLs found.</div>}
      {stats.map((s, idx) => (
        <div key={idx} style={{ marginTop: 10 }}>
          <div>
            🔗 <strong>{s.shortUrl}</strong> → {s.originalUrl}
          </div>
          <div>🕓 Created at: {s.createdAt}</div>
          <div>⏳ Expires at: {s.expiresAt}</div>
          <div>👁️‍🗨️ Clicks: {s.clickCount}</div>
          <ul>
            {s.clicks.map((click, i) => (
              <li key={i}>
                [{click.timestamp}] from {click.source} ({click.location})
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default StatisticsPage;
