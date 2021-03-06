import path from "path";

// Typescript support in static.config.js is not yet supported, but is coming in a future update!

export default {
  entry: "index.tsx",
  plugins: [
    "react-static-plugin-typescript",
    [
      require.resolve("react-static-plugin-source-filesystem"),
      {
        location: path.resolve("./src/pages"),
      },
    ],
    require.resolve("react-static-plugin-reach-router"),
    require.resolve("react-static-plugin-sitemap"),
  ],
  resolve: {
    extensions: ["", ".webpack.js", ".web.js", ".js"],
  },
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: "json-loader",
      },
    ],
  },
};

// import axios from "axios";
// import path from "path";
// // import { Post } from './types'

// // Typescript support in static.config.js is not yet supported, but is coming in a future update!

// export default {
//   entry: "index.tsx",
//   getRoutes: async () => {
//     const { data: posts } /* :{ data: Post[] } */ = await axios.get(
//       "https://jsonplaceholder.typicode.com/posts"
//     );
//     return [
//       {
//         path: "/blog",
//         getData: () => ({
//           posts
//         }),
//         children: posts.map((post /* : Post */) => ({
//           path: `/post/${post.id}`,
//           template: "src/components/Post",
//           getData: () => ({
//             post
//           })
//         }))
//       }
//     ];
//   },
//   plugins: [
//     "react-static-plugin-typescript",
//     [
//       require.resolve("react-static-plugin-source-filesystem"),
//       {
//         location: path.resolve("./src/pages")
//       }
//     ],
//     require.resolve("react-static-plugin-reach-router"),
//     require.resolve("react-static-plugin-sitemap")
//   ],
//   resolve: {
//     extensions: ["", ".webpack.js", ".web.js", ".js"]
//   }
// };
