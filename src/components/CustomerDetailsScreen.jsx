import { useState } from "react";

const personalDetails = [
  { label: "First Name", value: "Aarti" },
  { label: "Last Name", value: "Shah" },
  { label: "Contact Number", value: "9876543210" },
];

const topMeasurements = [
  { label: "Point", value: "12" },
  { label: "Waist", value: "30 inch" },
  { label: "Length", value: "25 inch" },
  { label: "Chest", value: "34 inch" },
  { label: "Seat", value: "36 inch" },
  { label: "Shoulder", value: "14 inch" },
  { label: "Neck", value: "15 inch" },
  { label: "Sleeves", value: "22 inch" },
  { label: "Bottom", value: "28 inch" },
  { label: "Mundo", value: "32 inch" },
];

const blouseMeasurements = [
  { label: "Length", value: "15 inch" },
  { label: "Upper chest", value: "32 inch" },
  { label: "Chest", value: "34 inch" },
  { label: "Waist", value: "28 inch" },
  { label: "Shoulder", value: "14 inch" },
  { label: "Back neck", value: "7 inch" },
  { label: "Front neck", value: "8 inch" },
  { label: "Sleeves length", value: "10 inch" },
  { label: "Bottom", value: "12 inch" },
  { label: "Biceps", value: "11 inch" },
  { label: "Mundo", value: "30 inch" },
  { label: "Point", value: "10 inch" },
];

const salwarMeasurements = [
  { label: "Length", value: "40" },
  { label: "Bottom", value: "12" },
];

const pantMeasurements = [
  { label: "Length", value: "40" },
  { label: "Knee length", value: "20" },
  { label: "Thigh", value: "24" },
  { label: "Knee round", value: "16" },
  { label: "Bottom", value: "14" },
  { label: "Waist", value: "32" },
];

const churidarMeasurements = [
  { label: "Length", value: "40" },
  { label: "Knee length", value: "20" },
  { label: "Knee round", value: "16" },
  { label: "Calf", value: "18" },
  { label: "Bottom", value: "14" },
];

export default function CustomerDetailsScreen() {
  const [openCard, setOpenCard] = useState(null);
  const [data, setData] = useState([]);

  const cards = [
    { title: "Add Personal", content: "Yaha personal details form aayega" },
    { title: "Add Top", content: "Yaha top details form aayega" },
    { title: "Add Blouse", content: "Yaha blouse details form aayega" },
    { title: "Add Salwar", content: "Yaha salwar details form aayega" },
    { title: "Add Pant", content: "Yaha pant details form aayega" },
    { title: "Add Churidar", content: "Yaha churidar details form aayega" },
  ];

  const handleData = (type) => {
    if (type === "Add Personal") {
      setData(personalDetails);
    } else if (type === "Add Top") {
      setData(topMeasurements);
    } else if (type === "Add Blouse") {
      setData(blouseMeasurements);
    } else if (type === "Add Salwar") {
      setData(salwarMeasurements);
    } else if (type === "Add Pant") {
      setData(pantMeasurements);
    } else if (type === "Add Churidar") {
      setData(churidarMeasurements);
    }
  };

  return (
    <div>
      <div className="card p-3 mb-3">
        <h1 className="text-lg font-bold text-gray-700 ">Customer Details</h1>
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
              <p className="text-sky-700 font-semibold">{card.title}</p>
              <span className="text-gray-500 text-xl">
                {openCard === card.title ? "−" : "+"}
              </span>
            </div>

            {/* Accordion Content */}
            {openCard === card.title && (
              <div className="mt-3 p-2 border-t text-sm text-gray-600">
                <div className="space-y-3">
                  {data.map((item, index) => (
                    <div key={index} className="flex justify-between">
                      <span className="font-medium text-gray-700">
                        {item.label}
                      </span>
                      <span className="text-gray-600">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
