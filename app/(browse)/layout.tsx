import { Suspense } from "react";
import { Container } from "./_components/container";
import { NavBar } from "./_components/navbar";
import { Sidebar, SidebarSkeleton } from "./_components/sidebar";

const BrowseLayout = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return ( 
        <>
            <NavBar />
            <div className="flex h-full pt-20">
                <Suspense fallback={<SidebarSkeleton />}>
                <Sidebar />
                </Suspense>
                
                <Container>
                    {children}
                </Container>
            </div>
        </>
    );
}
 
export default BrowseLayout;