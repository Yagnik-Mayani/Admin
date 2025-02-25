import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import TitleCard from "../../components/Cards/TitleCard";
import { openModal } from "../common/modalSlice";
import { getLeadsContent } from "./leadSlice";
import { showNotification } from "../common/headerSlice";
import { MODAL_BODY_TYPES } from '../../utils/globalConstantUtil';

const TopSideButtons = () => {
    const dispatch = useDispatch();

    const openAddNewLeadModal = () => {
        dispatch(openModal({ title: "Add New Lead", bodyType: MODAL_BODY_TYPES.LEAD_ADD_NEW }));
    };

    return (
        <div className="inline-block float-right">
            <button className="btn px-6 btn-sm normal-case btn-primary" onClick={openAddNewLeadModal}>Add New</button>
        </div>
    );
};

function Leads1() {
    const dispatch = useDispatch();
    const [category, setCategory] = useState("");

    useEffect(() => {
        dispatch(getLeadsContent());
    }, [dispatch]);

    const handleChange = (e) => {
        setCategory(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8080/product/addCategory", { category });
            setCategory("");
            dispatch(showNotification({ message: "Category added successfully!", status: 1 }));
        } catch (error) {
            console.error("Error adding category:", error);
            dispatch(showNotification({ message: "Failed to add category.", status: 2 }));
        }
    };

    return (
        <TitleCard title="Current Leads" topMargin="mt-2" TopSideButtons={<TopSideButtons />}>
            <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
                <div className="w-full max-w-3xl bg-white text-black dark:bg-gray-800 dark:text-white p-8 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold text-center mb-6">Category Wizard</h2>
                    <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
                        <div className="flex flex-col space-y-3">
                            <label className="font-medium">Category Name:</label>
                            <input
                                type="text"
                                name="category"
                                value={category}
                                onChange={handleChange}
                                className="input input-bordered w-full p-3"
                                required
                            />
                        </div>
                        <div className="flex justify-center">
                            <button type="submit" className="btn btn-primary px-6 py-3">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </TitleCard>
    );
}

export default Leads1;