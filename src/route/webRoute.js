import { BrowserRouter, Route, Routes } from "react-router-dom";
import LayoutProvider from "../layout/layout";
import Details from "../pages/details/details";
import Login from "../pages/login/login";
import Register from "../pages/register/register";
import Summary from "../pages/summary/summary";

const WebRoute = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>} />
                <Route path="/register" element={<Register />} />
                <Route path="/summary" element={<LayoutProvider content={<Summary />} />} />
                <Route path="/details" element={<LayoutProvider content={<Details />} />} />
            </Routes>
        </BrowserRouter>
    )
}
export default WebRoute;