import { Outlet } from "react-router";
import { SignIn } from "./components/SignIn";

function Root() {
    return <>
        <Outlet />
        <SignIn />
    </>
}

export default Root;
