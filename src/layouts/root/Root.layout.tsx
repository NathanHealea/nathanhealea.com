import { Header } from "../components";

interface RootLayoutProps
  extends Readonly<{
    children: React.ReactNode;
  }> {}

const RootLayout = (props: RootLayoutProps) => {
  const { children } = props;
  return (
    <html lang="en">
      <body>
        <Header />
        <div className="h-20" />
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
