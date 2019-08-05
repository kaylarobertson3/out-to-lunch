// const data = dataUnsorted.sort((a, b) => {
//   return b.rating - a.rating;
// });

export const sortData = (data, i) => {
  data.sort((a, b) => {
    return b.i - a.i;
  });
};
