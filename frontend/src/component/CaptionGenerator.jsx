import React, { useState } from "react";
import "./Caption.css";

function CaptionGenerator() {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [captionError, setCaptionError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCaptionError("");
    if (!image) return setCaptionError("Please upload an image!");

    const formData = new FormData();
    formData.append("image", image);

    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/api/posts/", {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      const data = await res.json();
      if (res.ok && data.post && data.post.image) {
        setCaption(data.post.caption || "");
        setImagePreview(data.post.image);
      } else if (res.ok && data.caption) {
        setCaption(data.caption);
      } else {
        setCaption("");
        setCaptionError(data.message || "No caption generated.");
      }
    } catch (err) {
      setCaption("");
      setCaptionError("Error: Failed to generate caption.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0] || null;
    setImage(file);
    setCaption("");
    setCaptionError("");
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
    }
  };

  return (
    <section className="caption-page">
      <div className="caption-card">
        <h2>Generate an image caption</h2>
        <p className="muted">Upload a photo and let the caption bot do the rest.</p>

        <form onSubmit={handleSubmit}>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          <button type="submit" className="primary-btn" disabled={loading}>
            {loading ? "Generating..." : "Generate caption"}
          </button>
        </form>

        <div className="preview-section">
          <h3>Preview</h3>
          {imagePreview ? (
            <img src={imagePreview} alt="Preview" />
          ) : (
            <p className="muted">No image selected yet.</p>
          )}
        </div>

        <div className="caption-section" aria-live="polite">
          <h3>Caption</h3>
          {loading && <p>⏳ Generating caption...</p>}
          {!loading && caption && <p>{caption}</p>}
          {!loading && !caption && !captionError && (
            <p className="muted">Caption will show up here after you submit.</p>
          )}
          {captionError && <p className="error-text">{captionError}</p>}
        </div>
      </div>
    </section>
  );
}

export default CaptionGenerator;