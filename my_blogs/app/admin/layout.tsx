import Sidebar from "@/components/admin/Sidebar";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <div className="flex">
            <Sidebar />
            <main> {children}</main>
            </div>
        </>

    );
}
