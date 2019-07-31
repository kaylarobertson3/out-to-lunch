declare module "console" {
  export = typeof import("console");
}

declare module "*.svg" {
  const content: any;
  export default content;
}
