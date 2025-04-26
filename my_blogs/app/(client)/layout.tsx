import ClientHeader from "@/components/ClientHeader";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <ClientHeader />
            <main> {children}</main>
        </>

    );
}
