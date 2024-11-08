import HeaderLayout from "@/components/layout/HeaderLayout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <HeaderLayout />
      {children}
    </>
  );
}
