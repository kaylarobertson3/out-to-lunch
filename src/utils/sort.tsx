export const sortData = (data, i) => {
  return data.sort((a, b) => {
    if (i === "a-z") {
      return a.name.localeCompare(b.name);
    } else if (i === "distance") {
      return a.distance - b.distance;
    } else if (i === "rating") {
      return b.rating - a.rating;
    }
  });
};
