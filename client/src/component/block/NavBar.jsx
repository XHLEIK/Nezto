import {User} from "lucide-react"
import { useNavigate } from "react-router-dom";
function NavBar() {
    const navigate = useNavigate();
    return (

        <header>
            <div className="flex w-full max-w-[680px] justify-between items-center p-4 fixed top-0 bg-primary rounded-b-3xl">
                <div onClick={()=>navigate("/")} className="text-2xl font-bold text-white cursor-pointer">
                    <img src="/img/logo/logo-header.png" className="w-[100px]  max-h-7" alt="NEZTO" />
                </div>
                <div className="w-10 h-10 bg-white bg-opacity-20 cursor-pointer rounded-full flex items-center justify-center">
                    <User onClick={()=>navigate("/profile")} className="text-primary"/>
                </div>
            </div>
        </header>
    )
}
export default NavBar;