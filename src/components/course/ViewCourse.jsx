import React, { useState, useEffect, useRef } from "react";
import "./Chapters.css";

const ChaptersList = ({ videoRef, chapters }) => {
  const handleChapterClick = (timestamp) => {
    videoRef.current.currentTime = timestamp;
    videoRef.current.play();
  };

  return (
    <div className="chapters-container">
      {chapters.map((chapter, index) => (
        <div
          key={index}
          className="chapter-item"
          onClick={() => handleChapterClick(chapter.timeInSeconds)}
        >
          <img
            src={chapter.thumbnail}
            alt={chapter.title}
            className="chapter-thumbnail"
          />
          <div className="chapter-details">
            <h3 className="chapter-title">{chapter.title}</h3>
            <span className="chapter-timestamp">{chapter.timestamp}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

const VideoPlayerWithChapters = () => {
  const videoRef = useRef(null);
  const [chapters, setChapters] = useState([]);
  const [videoSrc, setVideoSrc] = useState(""); // State for the uploaded video file

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const videoURL = URL.createObjectURL(file);
      setVideoSrc(videoURL); // Update the video source with the uploaded file
      setChapters([]); // Clear previous chapters when a new video is loaded
    }
  };

  useEffect(() => {
    const generateChapters = () => {
      const video = videoRef.current;
      const duration = Math.floor(video.duration); // Total duration in seconds
      const interval = 30; // Chapter interval in seconds
      const generatedChapters = [];

      for (let time = 0; time < duration; time += interval) {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        generatedChapters.push({
          title: `Chapter ${Math.floor(time / interval) + 1}`, // Auto-generate title
          timestamp: `${minutes}:${seconds.toString().padStart(2, "0")}`, // Format as mm:ss
          timeInSeconds: time, // For seeking
          thumbnail: `https://via.placeholder.com/150?text=Thumbnail+${
            Math.floor(time / interval) + 1
          }`, // Auto-generate thumbnail URL (replace with dynamic logic if needed)
        });
      }

      setChapters(generatedChapters);
    };

    const video = videoRef.current;
    if (video) {
      video.addEventListener("loadedmetadata", generateChapters);
      return () =>
        video.removeEventListener("loadedmetadata", generateChapters);
    }
  }, [videoSrc]); // Re-run when a new video is uploaded

  return (
    <div className="video-player-container">
      <input
        type="file"
        accept="video/*"
        onChange={handleFileChange}
        className="video-upload-input"
      />
      {videoSrc ? (
        <video
          id="video-element"
          ref={videoRef}
          controls
          className="video-player"
          src={videoSrc} // Load the selected video file
        ></video>
      ) : (
        <p className="placeholder-text">Please upload a video to begin.</p>
      )}
      {chapters.length > 0 && (
        <ChaptersList videoRef={videoRef} chapters={chapters} />
      )}
    </div>
  );
};

export default VideoPlayerWithChapters;
