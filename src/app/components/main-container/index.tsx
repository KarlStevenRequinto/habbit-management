import React from "react";

const MainContainer = ({ children }: { children: React.ReactNode }) => {
    return <div className="h-full w-full flex flex-col">{children}</div>;
};

export default MainContainer;
