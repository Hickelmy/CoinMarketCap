import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "./components/ToastContainer";
import { ModalProvider } from "./shared/hooks/useModal";
import { ToastProvider } from "./shared/hooks/useToast";
import { ThemeProvider } from "@emotion/react";
import { LightTheme } from "./shared/themes";
import { AppRoutes } from "./routes";

export function App() {
  return (
    <ThemeProvider theme={LightTheme}>
      <BrowserRouter basename="/">
        <ModalProvider>
          <ToastProvider>
            <ToastContainer />
            <AppRoutes />
          </ToastProvider>
        </ModalProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}
