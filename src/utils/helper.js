import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const capitalizeFirstLetter = (str) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const fetchUsers = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "customers"));
    const users = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        value: doc.id,
        label: `${capitalizeFirstLetter(data?.personalInfo["First Name"])} ${capitalizeFirstLetter(data?.personalInfo["Last Name"])}` ,
      };
    });
    return users
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};




