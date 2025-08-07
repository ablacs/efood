import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Torteria } from "./pages/Torteria/index.tsx";
import { GlobalStyle } from "./styles.ts";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";
import { InProgress } from "./components/error/index.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/torteria",
    element: <Torteria />,
  },
  {
    path: "*",
    element: <InProgress />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <GlobalStyle />
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
