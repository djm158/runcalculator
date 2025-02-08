import { MileageBuilder } from "@/components/mileage-builder";
import { Calculator } from "@/components/pace-calculator";
import { RaceSplitsGenerator } from "@/components/splits-generator/splits-generator";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import "./styles.css";

export const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen w-full bg-gradient-to-br dark:from-pink-900 dark:to-blue-900 text-foreground p-4">
        <main className="container mx-auto">
          <div className="flex justify-end mb-4">
            <ThemeToggle />
          </div>

          <Tabs
            defaultValue="pace"
            className="w-full container max-w-4xl mx-auto"
          >
            <TabsList className="grid w-full grid-cols-3 bg-white/20 dark:bg-black/20 backdrop-blur-lg rounded-lg p-1">
              <TabsTrigger
                value="pace"
                className="data-[state=active]:bg-pink-500 data-[state=active]:text-white"
              >
                Pace Calculator
              </TabsTrigger>
              <TabsTrigger
                value="splits"
                className="data-[state=active]:bg-purple-500 data-[state=active]:text-white"
              >
                Race Splits
              </TabsTrigger>
              <TabsTrigger
                value="mileage"
                className="data-[state=active]:bg-blue-500 data-[state=active]:text-white"
              >
                Mileage Planner
              </TabsTrigger>
            </TabsList>
            <TabsContent value="pace">
              <Calculator />
            </TabsContent>
            <TabsContent value="splits">
              <RaceSplitsGenerator />
            </TabsContent>
            <TabsContent value="mileage">
              <MileageBuilder />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </ThemeProvider>
  );
};
