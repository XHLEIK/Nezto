


function ServiceCard({icon, cardTitle,cardDescription, cardPrice, cardButtonText="Book Now"}) {
    return (
        <div  className="bg-teal-100 rounded-lg p-4 flex flex-col">
            <div className="flex items-center gap-3 mb-2">
                <div className="bg-primary p-2 rounded-lg">
                    {icon}
                </div>
                <h3 className="text-teal-700 font-bold text-lg">{cardTitle}</h3>
            </div>
            <p className="text-teal-600 text-sm mb-2">{cardDescription}</p>
            <div className="flex justify-between items-center mt-auto">
                <div className="font-bold text-teal-700 text-lg">{cardPrice}</div>
                <button className="bg-primary text-white px-3 py-1 rounded-lg text-sm">{cardButtonText}</button>
            </div>
        </div>
    )


}

export default ServiceCard;