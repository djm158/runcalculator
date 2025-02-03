import { Calculator } from "./components/Calculator";
import { ThemeProvider } from "./components/theme/theme-provider";
import { ThemeToggle } from "./components/theme/theme-toggle";
import "./styles.css";

export const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen w-full bg-gradient-to-br dark:from-pink-900 dark:to-blue-900 text-foreground p-4">
        <main className="container mx-auto">
          <div className="flex justify-end">
            <ThemeToggle />
          </div>
          <Calculator containerClassName="mx-auto" />
        </main>
      </div>
    </ThemeProvider>
  );
};
