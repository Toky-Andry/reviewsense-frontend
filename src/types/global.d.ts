// Allows TypeScript to understand CSS module imports
declare module "*.css" {
  const content: Record<string, string>;
  export default content;
}