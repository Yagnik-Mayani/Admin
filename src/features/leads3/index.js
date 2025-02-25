import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import TitleCard from "../../components/Cards/TitleCard";
import { showNotification } from "../common/headerSlice";

const Leads3 = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        offerName: "",
        discount: "",
        description: "",
        startDate: "",
        endDate: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8080/product/addOffer", formData);
            setFormData({ offerName: "", discount: "", description: "", startDate: "", endDate: "" });
            dispatch(showNotification({ message: "Offer added successfully!", status: 1 }));
        } catch (error) {
            console.error("Error adding offer:", error);
            dispatch(showNotification({ message: "Failed to add offer.", status: 2 }));
        }
    };

    return (
        <TitleCard title="Current Offers" topMargin="mt-2">
            <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
                <div className="w-full max-w-4xl bg-white text-black dark:bg-gray-800 dark:text-white p-8 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold text-center mb-6">Offer Wizard</h2>
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
                        <div className="flex flex-col space-y-3">
                            <label className="font-medium uppercase">Offer Name:</label>
                            <input type="text" name="offerName" value={formData.offerName} onChange={handleChange} className="input input-bordered w-full p-3" required />
                        </div>
                        <div className="flex flex-col space-y-3">
                            <label className="font-medium uppercase">Discount:</label>
                            <input type="text" name="discount" value={formData.discount} onChange={handleChange} className="input input-bordered w-full p-3" required />
                        </div>
                        <div className="flex flex-col space-y-3 col-span-2">
                            <label className="font-medium uppercase">Description:</label>
                            <textarea name="description" value={formData.description} onChange={handleChange} className="textarea textarea-bordered w-full p-3" required></textarea>
                        </div>
                        <div className="flex flex-col space-y-3">
                            <label className="font-medium uppercase">Start Date:</label>
                            <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} className="input input-bordered w-full p-3" required />
                        </div>
                        <div className="flex flex-col space-y-3">
                            <label className="font-medium uppercase">End Date:</label>
                            <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} className="input input-bordered w-full p-3" required />
                        </div>
                        <div className="col-span-2 flex justify-center">
                            <button type="submit" className="btn btn-primary px-6 py-3 uppercase">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </TitleCard>
    );
};

export default Leads3;
