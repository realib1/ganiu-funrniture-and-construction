import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: "index.html",
        about: "src/about.html",
        contact: "src/contact.html",
        products: "src/products.html",
        productview: "src/product-view.html",
        categoryview: "src/category-view.html",
        portfolio: "src/portfolio.html",
        blog: "src/blog.html",
        blogpost: "src/blog-post.html",
      },
    },
  },
  plugins: [tailwindcss()],
});
