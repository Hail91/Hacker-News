import React, { useState, useEffect } from "react";
import axios from "axios";

// Component imports
import Stories from "../presentational/Stories";

function Main() {
  // Component state
  const [stories, setStories] = useState([]);
  // API call on mount
  useEffect(() => {
    axios
      .get("https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty")
      .then((res) => {
        setStories(res.data);
      });
  }, []);

  // This component will render out cards for news articles (props will have to be passed down into the cards)
  return (
    <div>
      <h1>News articles and access to additional information will live here</h1>
      <Stories data={stories} />
    </div>
  );
}

export default Main;
