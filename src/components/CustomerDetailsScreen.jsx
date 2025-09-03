import { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";

export default function CustomerDetailsScreen({
  viewCustomer,
  setViewCustomer,
}) {
  const [openCard, setOpenCard] = useState(null);
  const [data, setData] = useState([]);

  const cards = [
    { title: "Add Personal", content: "Yaha personal details form aayega", subTitle: "Personal Detail" },
    { title: "Add Top", content: "Yaha top details form aayega", subTitle: "Top Detail" },
    { title: "Add Blouse", content: "Yaha blouse details form aayega", subTitle: "Blouse Detail" },
    { title: "Add Salwar", content: "Yaha salwar details form aayega", subTitle: "Salwar Detail" },
    { title: "Add Pent", content: "Yaha pant details form aayega", subTitle: "Pent Detail" },
    { title: "Add Churidar", content: "Yaha churidar details form aayega", subTitle: "Churidar Detail" },
  ];

  const handleData = (type) => {
    if (type === "Add Personal") {
      setData(viewCustomer?.personalInfo);
    } else if (type === "Add Top") {
      setData(viewCustomer?.topInfo);
    } else if (type === "Add Blouse") {
      setData(viewCustomer?.blouseInfo);
    } else if (type === "Add Salwar") {
      setData(viewCustomer?.salwarInfo);
    } else if (type === "Add Pent") {
      setData(viewCustomer?.pentInfo);
    } else if (type === "Add Churidar") {
      setData(viewCustomer?.churidarInfo);
    }
  };

  return (
    <div>
      <div className="card p-3 mb-3">
        <div className="flex items-center space-x-2">
          <FiArrowLeft
            onClick={() => setViewCustomer(null)}
            className="text-sky-700 text-2xl cursor-pointer"
          />
          <h1 className="text-lg font-bold text-gray-700 ">Customer Details</h1>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-4 cursor-pointer transition"
          >
            {/* Heading */}
            <div
              className="flex justify-between items-center"
              onClick={() => {
                setOpenCard(openCard === card.title ? null : card.title);
                handleData(card.title);
              }}
            >
              <p className="text-sky-700 font-semibold">{card.subTitle}</p>
              <span className="text-gray-500 text-xl">
                {openCard === card.title ? "−" : "+"}
              </span>
            </div>

            {/* Accordion Content */}
            {openCard === card.title &&
              (!data ? (
                <div className="flex items-center justify-center h-full font-semibold text-gray-600 pb-4">
                  No data found
                </div>
              ) : (
                <div className="mt-3 p-2 border-t text-sm text-gray-600">
                  <div className="space-y-3">
                    {Object.entries(data || {}).map(([key, value], index) => (
                      <div key={index} className="flex justify-between">
                        <span className="font-medium text-gray-700">{key}</span>
                        <span className="text-gray-600">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}
