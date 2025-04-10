import { ChevronRight } from "lucide-react";


const MenuItem = ({ title, subtitle, icon }) => {
    return (
        <div className="flex items-center py-3 border-b border-teal-200 cursor-pointer">
            <div className="text-teal-600 mr-3">
                {icon}
            </div>
            <div className="flex-1">
                <h3 className="text-teal-700 font-medium">{title}</h3>
                <p className="text-teal-500 text-xs">{subtitle}</p>
            </div>
            <div className="text-teal-500">
                <ChevronRight/>
            </div>
        </div>
    );
};

export default MenuItem;