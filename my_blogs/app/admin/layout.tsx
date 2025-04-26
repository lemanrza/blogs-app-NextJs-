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
            <main className="flex-1 ml-64 overflow-y-auto h-screen"> {children}</main>
            </div>
        </>

    );
}
