import {LayoutGrid, House, User } from "lucide-react"
import { useNavigate } from "react-router-dom";

function Footer(){
    const navigate = useNavigate();


    return(
        <footer className="bg-primary py-3 px-8 rounded-t-3xl fixed bottom-0 w-full max-w-[680px]">
        <div className="flex justify-between items-center *:text-primary *:cursor-pointer">
            <button onClick={()=>navigate("/services")} className="p-2 rounded-full bg-white bg-opacity-20 ">
                <LayoutGrid /> 
            </button>

            <button onClick={()=>navigate("/")} className="p-2 rounded-full bg-white bg-opacity-20 ">
                <House/>
            </button>

            <button onClick={()=>navigate("/profile")} className="p-2 rounded-full bg-white bg-opacity-20 ">
                <User/>
            </button>
        </div>
    </footer>
    )
}

export default Footer;