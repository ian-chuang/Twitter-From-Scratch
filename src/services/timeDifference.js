export default function timeDifference(timestamp) {
  let msPerMinute = 60 * 1000;
  let msPerHour = msPerMinute * 60;
  let msPerDay = msPerHour * 24;
  var msPerMonth = msPerDay * 30;
  var msPerYear = msPerDay * 365;

  let current = new Date();
  let elapsed = current - timestamp;

  if (elapsed < 0) {
    return "0s";
  } else if (elapsed < msPerMinute) {
    return Math.round(elapsed / 1000) + "s";
  } else if (elapsed < msPerHour) {
    return Math.round(elapsed / msPerMinute) + "m";
  } else if (elapsed < msPerDay) {
    return Math.round(elapsed / msPerHour) + "h";
  } else if (elapsed < msPerMonth) {
    return `${timestamp.toLocaleString("en-us", {
      month: "short",
    })} ${timestamp.getDate()}`;
  } else if (elapsed < msPerYear) {
    return `${timestamp.toLocaleString("en-us", {
      month: "short",
    })} ${timestamp.getDate()}, ${timestamp.getFullYear()}`;
  }
}
