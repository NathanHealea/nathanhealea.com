import { Header } from "../components";
import { Metadata } from "next";
import { ThemeProvider } from "next-themes";

interface RootLayoutProps
  extends Readonly<{
    children: React.ReactNode;
  }> {}

export const RootLayoutMeta: Metadata = {
  title: "Nathan Healea | Software Engineer & Full Stack Developer",
};

const RootLayout = (props: RootLayoutProps) => {
  const { children } = props;
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider defaultTheme="dark">
          <Header />
          <div className="h-20" />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
