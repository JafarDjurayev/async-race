import React, { type JSX } from "react";
import { Outlet } from "react-router-dom";
import Navigation from "../components/Navigation";


export default function Layout(): JSX.Element {
    return (<>
        <Navigation />
        <main className="container">
            <Outlet />
        </main>
    </>)
}