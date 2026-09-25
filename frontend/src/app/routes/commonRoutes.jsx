import About from "../../features/about/ui/pages/About";
import ProductDetails from "../../features/products/ui/pages/ProductDetails";
import Products from "../../features/products/ui/pages/Products";
export const commonRoutes = [
  {
    path: "about",
    element: <About />,
  },
  {
    path: "products",
    element: <Products />,
  },
  {
    path: "products/:id",
    element: <ProductDetails />,
  },
];
