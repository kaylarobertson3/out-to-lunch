export const sortData = (data, i) => {
  return data.sort((a, b) => {
    if (i === "a-z") {
      console.log("sorting az");
      return a.name.localeCompare(b.name);
    } else if (i === "distance") {
      console.log("sorting distance");
      return a.distance - b.distance;
    } else if (i === "rating") {
      return b.rating - a.rating;
    }
  });
};
