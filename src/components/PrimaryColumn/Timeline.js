import React from "react";
import Tweet from "./Tweet";
import { useSelector } from "react-redux";

export default function Timeline({ tweets }) {
  return (
    <div>
      {tweets && (
        <>
          {tweets.map((tweet, i) => (
            <Tweet tweet={tweet} key={i} />
          ))}

          <div style={{ height: "30vh" }}></div>
        </>
      )}
    </div>
  );
}
