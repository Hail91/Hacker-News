import React from "react";
// Component imports
import StoryCard from "./StoryCard";

const styles = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-around",
  margin: "0 auto",
  width: "75%",
};

function Stories({ data }) {
  return (
    <div style={styles}>
      {data.map((story, id) => {
        return <StoryCard key={id} />;
      })}
    </div>
  );
}

export default Stories;
