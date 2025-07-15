// src/components/URLForm.js
import { useState } from "react";
import { shortenURL } from "../api/APIShortener";
import { Log } from "../utils/logger";

const URLForm = () => {
  const [urls, setUrls] = useState([{ url: "", validity: "", shortcode: "" }]);
  const [results, setResults] = useState([]);

  const handleChange = (i, field, value) => {
    const updated = [...urls];
    updated[i][field] = value;
    setUrls(updated);
  };

  const addField = () => {
    if (urls.length < 5) {
      setUrls([...urls, { url: "", validity: "", shortcode: "" }]);
    }
  };

  const validateURL = (url) =>
    /^(https?:\/\/)[^\s$.?#].[^\s]*$/gm.test(url.trim());

  const handleSubmit = async () => {
    const validInputs = urls.filter(({ url }) => validateURL(url));
    if (validInputs.length === 0) {
      await Log("frontend", "warn", "component", "No valid URLs provided");
      return alert("Please enter at least one valid URL.");
    }

    const promises = validInputs.map(async ({ url, validity, shortcode }) => {
      try {
        const data = await shortenURL(url, validity, shortcode);
        return { original: url, ...data };
      } catch (err) {
        return { original: url, error: err.message };
      }
    });

    const res = await Promise.all(promises);
    setResults(res);
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: 20, borderRadius: 6 }}>
      <h2>Shorten URLs</h2>
      {urls.map((entry, i) => (
        <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10 }}>
          <input
            type="text"
            placeholder="Original URL"
            value={entry.url}
            onChange={(e) => handleChange(i, "url", e.target.value)}
            style={{ flex: 2 }}
          />
          <input
            type="number"
            placeholder="Validity (min)"
            value={entry.validity}
            onChange={(e) => handleChange(i, "validity", e.target.value)}
            style={{ flex: 1 }}
          />
          <input
            type="text"
            placeholder="Custom Shortcode"
            value={entry.shortcode}
            onChange={(e) => handleChange(i, "shortcode", e.target.value)}
            style={{ flex: 1 }}
          />
        </div>
      ))}
      <button onClick={addField}>+ Add Another</button>
      <button onClick={handleSubmit} style={{ marginLeft: 10 }}>Shorten</button>

      <div style={{ marginTop: 20 }}>
        {results.map((r, idx) => (
          <div key={idx}>
            {r.error
              ? `❌ ${r.original} - ${r.error}`
              : `✅ ${r.original} → ${r.shortUrl} (Expires: ${r.expiresAt})`}
          </div>
        ))}
      </div>
    </div>
  );
};

export default URLForm;