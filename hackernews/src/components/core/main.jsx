import React, { useState, useEffect } from "react";

// Component imports
import Stories from "../presentational/Stories";

function Main() {
  // Component state
  const [stories, setStories] = useState([]);

  // Function to map over unix date and convert
  function convertUnix(obj) {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const date = new Date(obj.time * 1000);
    const convertedDate = `${
      months[date.getMonth()]
    } ${date.getDate()}, ${date.getFullYear()}`;
    return convertedDate;
  }
  // API call on mount
  useEffect(() => {
    async function getTopStories() {
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
          const cleanDate = convertUnix(story);
          const storyImage = "https://source.unsplash.com/random/?computer";
          story["image"] = storyImage;
          story["time"] = cleanDate;
        });
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
