import React, { useState, useEffect } from "react";

// Component imports
import Stories from "../presentational/Stories";

function Main() {
  // Component state
  const [stories, setStories] = useState([]);
  // API call on mount
  useEffect(() => {
    async function getTopStories() {
      const storyImage = "https://source.unsplash.com/featured/?hacker";
      const url = "https://hacker-news.firebaseio.com/v0/topstories.json";
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Response Error:" + response.text);
        }
        const json = await response.json();
        const topstories = json
          .slice(0, 10)
          .map((id) =>
            fetch(
              `https://hacker-news.firebaseio.com/v0/item/${id}.json`
            ).then((response) => response.json())
          );
        const results = await Promise.all(topstories);
        results.forEach((story) => {
          story["image"] = storyImage;
        });
        console.log(results);
        // Append random image to img property for each object
        setStories(results);
      } catch (err) {
        console.error(err);
      }
    }
    getTopStories();
  }, []);

  // This component will render out cards for news articles (props will have to be passed down into the cards)
  return (
    <div>
      <Stories data={stories} />
    </div>
  );
}

export default Main;
