import { Edit } from "lucide-react";
import Home from "../../features/Dashboard/ui/pages/Home";
import CreateProduct from "../../features/products/ui/pages/CreateProduct";
export const sellerRoutes = [
  {
    path: "home",
    element: <Home />,
  },
  {
    path: "products/create",
    element: <CreateProduct />,
  },
  {
    path: "products/:id/edit",
    element: <Edit />,
  },
];
