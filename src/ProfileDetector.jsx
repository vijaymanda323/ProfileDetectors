import { useState } from "react";
import axios from "axios";
import "./FakeProfileDetector.css"; 

const ProfileDetector = () => {
  const [username, setUsername] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDetect = async () => {
    if (!username) {
      setError("Please enter a username.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await axios.post("https://backend-7lg3.onrender.com/detect", { username });

      setResult(response.data);
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-container">
      <h1>Fake Social Media Detector</h1>
      <h2>Instagram Profile Detector</h2>
      <input
        type="text"
        placeholder="Enter Instagram Username"
        className="input-box"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleDetect} className="detect-button">
        {loading ? "Checking..." : "Detect Profile"}
      </button>

      {error && <p className="error-message">{error}</p>}

      {result && (
        <div className="profile-result">
          <h3>Prediction: 
            <span className={result.status === "real" ? "real-status" : "fake-status"}>
              {" "}{result.status.toUpperCase()}
            </span>
          </h3>
          <p>Followers: <span>{result?.profile_data?.followers ?? "N/A"}</span></p>
          <p>Posts: <span>{result?.profile_data?.posts ?? "N/A"}</span></p>
          <p>Has Profile Pic: <span>{result?.profile_data?.profile_pic ? "Yes" : "No"}</span></p>
          <p>Bio Length: <span>{result?.profile_data?.description_length ?? 0} characters</span></p>

        </div>
      )}
    </div>
  );
};

export default ProfileDetector;