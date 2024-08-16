interface RootLayoutProps
  extends Readonly<{
    children: React.ReactNode;
  }> {}

const RootLayout = (props: RootLayoutProps) => {
  const { children } = props;
  return (
    <html lang='en'>
      <body>
        {children}
      </body>
    </html>
  );
};

export default RootLayout;

