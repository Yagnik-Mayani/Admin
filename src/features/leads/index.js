import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import TitleCard from "../../components/Cards/TitleCard";
import {showNotification} from "../common/headerSlice";

const Leads = () => {
    const dispatch = useDispatch();

    // State for form fields
    const [formData, setFormData] = useState({
        productName: "",
        productPrice: "",
        productQty: "",
        category: "",
        subCategory: "",
        subCategoryId: "", // Store the selected subCategoryId
        productBrand: "",
        productOffer: "",
        description: "",
        productImage: null,
    });

    // State for categories and subcategories
    const [categories, setCategories] = useState({});
    const [filteredSubCategories, setFilteredSubCategories] = useState([]);

    // Fetch categories and subcategories
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch("http://localhost:8080/product/getSubCategory");
                const data = await response.json();

                // Convert response into a dictionary format
                const categoryMap = {};
                data.forEach(({category, subCategoryId, subCategoryName}) => {
                    if (!categoryMap[category.categoryName]) {
                        categoryMap[category.categoryName] = [];
                    }
                    categoryMap[category.categoryName].push({
                        subCategoryId,
                        subCategoryName,
                    });
                });

                setCategories(categoryMap);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, []);

    // Handle input changes
    const handleChange = (e) => {
        const {name, value} = e.target;

        if (name === "category") {
            setFormData({...formData, category: value, subCategory: "", subCategoryId: ""});
            setFilteredSubCategories(categories[value] || []);
        } else if (name === "subCategory") {
            const selectedSub = filteredSubCategories.find(sub => sub.subCategoryName === value);
            setFormData({...formData, subCategory: value, subCategoryId: selectedSub ? selectedSub.subCategoryId : ""});
        } else {
            setFormData({...formData, [name]: value});
        }
    };

    // Handle file input
    const handleFileChange = (e) => {
        setFormData({...formData, productImage: e.target.files[0]});
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare JSON data
        const productDetails = {
            productName: formData.productName,
            productPrice: formData.productPrice,
            productQty: formData.productQty,
            category: formData.category,
            subCategory: formData.subCategory,
            subCategoryId: formData.subCategoryId,
            brandName: formData.productBrand,
            productOffer: formData.productOffer,
            description: formData.description,
        };

        // Create FormData to send JSON + Image
        const formPayload = new FormData();
        formPayload.append("productBody", new Blob([JSON.stringify(productDetails)], {type: "application/json"}));
        if (formData.productImage) {
            formPayload.append("image", formData.productImage);
        }

        try {
            const response = await fetch("http://localhost:8080/product/addProduct", {
                method: "POST",

                body: formPayload,
            });

            if (response.status === 200) {
                dispatch(showNotification({message: "Product added successfully!", status: 1}));
                setFormData({
                    productName: "",
                    productPrice: "",
                    productQty: "",
                    category: "",
                    subCategory: "",
                    subCategoryId: "",
                    productBrand: "",
                    productOffer: "",
                    description: "",
                    productImage: null,
                });
            } else {
                dispatch(showNotification({message: "Failed to add product", status: 0}));
            }
        } catch (error) {
            console.error("Error adding product:", error);
            dispatch(showNotification({message: "Failed to add product. Please try again.", status: 0}));
        }
    };


    return (
        <TitleCard title="Current Leads" topMargin="mt-2">
            <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
                <div
                    className="w-full max-w-4xl bg-white text-black dark:bg-gray-800 dark:text-white p-8 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold text-center mb-6">Product Wizard</h2>
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
                        <div className="flex flex-col space-y-3">
                            <label className="font-medium">Product Name:</label>
                            <input
                                type="text"
                                name="productName"
                                value={formData.productName}
                                onChange={handleChange}
                                className="input input-bordered w-full p-3"
                                required
                            />
                        </div>

                        <div className="flex flex-col space-y-3">
                            <label className="font-medium">Product Price:</label>
                            <input
                                type="number"
                                name="productPrice"
                                value={formData.productPrice}
                                onChange={handleChange}
                                className="input input-bordered w-full p-3"
                                required
                            />
                        </div>

                        <div className="flex flex-col space-y-3">
                            <label className="font-medium">Product Qty:</label>
                            <input
                                type="number"
                                name="productQty"
                                value={formData.productQty}
                                onChange={handleChange}
                                className="input input-bordered w-full p-3"
                                required
                            />
                        </div>

                        <div className="flex flex-col space-y-3 col-span-2">
                            <label className="font-medium">Category & Subcategory:</label>
                            <div className="flex gap-4">
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="select select-bordered w-full p-3"
                                    required
                                >
                                    <option value="">Select Category</option>
                                    {Object.keys(categories).map(category => (
                                        <option key={category} value={category}>{category}</option>
                                    ))}
                                </select>

                                <select
                                    name="subCategory"
                                    value={formData.subCategory}
                                    onChange={handleChange}
                                    className="select select-bordered w-full p-3"
                                    required
                                >
                                    <option value="">Select Subcategory</option>
                                    {filteredSubCategories.map(({subCategoryId, subCategoryName}) => (
                                        <option key={subCategoryId} value={subCategoryName}>{subCategoryName}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="flex flex-col space-y-3">
                            <label className="font-medium">Product Brand:</label>
                            <input
                                type="text"
                                name="productBrand"
                                value={formData.productBrand}
                                onChange={handleChange}
                                className="input input-bordered w-full p-3"
                                required
                            />
                        </div>

                        <div className="flex flex-col space-y-3">
                            <label className="font-medium">Product Offer:</label>
                            <input
                                type="text"
                                name="productOffer"
                                value={formData.productOffer}
                                onChange={handleChange}
                                className="input input-bordered w-full p-3"
                            />
                        </div>

                        <div className="flex flex-col space-y-3 col-span-2">
                            <label className="font-medium">Description:</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="textarea textarea-bordered w-full p-3"
                                required
                            />
                        </div>

                        <div className="flex flex-col space-y-3">
                            <label className="font-medium">Product Image:</label>
                            <input type="file" name="productImage" onChange={handleFileChange} required/>
                        </div>

                        <div className="col-span-2 flex justify-center">
                            <button type="submit" className="btn btn-primary px-6 py-3">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </TitleCard>
    );
};

export default Leads;


