import { Calculator } from "./components/Calculator";
import { ThemeProvider } from "./components/theme-provider";

import "./styles.css";

export const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen w-full bg-gradient-to-br dark:from-pink-900 dark:to-blue-900 text-foreground p-4">
        <main className="container mx-auto">
          <Calculator />
        </main>
      </div>
    </ThemeProvider>
  );
};
