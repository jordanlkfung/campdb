import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
    return (
        <div>
            <Navbar /> {/*what will always be showing*/}
            <Outlet /> {/*what comes from react router dome how we tell it where to show component for specific paths
            components that are rendering will be under navigation*/}
        </div>
    )
}