import { createContext, useState } from "react";



export const sidebarContext = createContext();



export default function SidebarProvider({ children }) {
    const [is_sidebar_open, setIsSidebarOpen] = useState(false);

    function sidebarOpen() {
        setIsSidebarOpen(true);
    }
    function sidebarClose() {
        setIsSidebarOpen(false);
    }

    return <sidebarContext.Provider value={{
        is_sidebar: is_sidebar_open,
        sidebarOpen,
        sidebarClose
    }}>
        {children}
    </sidebarContext.Provider>
}