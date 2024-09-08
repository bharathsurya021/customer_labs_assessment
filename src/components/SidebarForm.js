import React, { useState } from "react";
import { FaMinus } from "react-icons/fa";
import SchemaSelector from "./SchemaSelector";
import { saveSegment } from "../api/segementApi";
import { showToast } from "./ToastNotification";

const schemaOptions = [
        { label: "First Name", value: "first_name", type: "user" },
        { label: "Last Name", value: "last_name", type: "user" },
        { label: "Gender", value: "gender", type: "user" },
        { label: "Age", value: "age", type: "user" },
        { label: "Account Name", value: "account_name", type: "group" },
        { label: "City", value: "city", type: "group" },
        { label: "State", value: "state", type: "group" },
];

function SidebarForm({ isSidebarOpen, toggleSidebar, sidebarRef }) {
        const [segmentName, setSegmentName] = useState("");
        const [selectedSchemas, setSelectedSchemas] = useState([]);
        const [availableOptions, setAvailableOptions] = useState(schemaOptions);
        const [newSchema, setNewSchema] = useState("");

        const handleAddSchema = () => {
                if (newSchema) {
                        const selectedOption = availableOptions.find(
                                (option) => option.value === newSchema
                        );
                        setSelectedSchemas([...selectedSchemas, selectedOption]);
                        setAvailableOptions(
                                availableOptions.filter((option) => option.value !== newSchema)
                        );
                        setNewSchema("");
                }
        };

        const handleRemoveSchema = (index) => {
                const removedSchema = selectedSchemas[index];
                setSelectedSchemas(
                        selectedSchemas.filter((_, schemaIndex) => schemaIndex !== index)
                );
                setAvailableOptions([...availableOptions, removedSchema]);
        };

        const handleSaveSegment = async () => {
                if (!segmentName) {
                        showToast("error", "Segment name is required.");
                        return;
                }

                const data = {
                        segment_name: segmentName,
                        schema: selectedSchemas.map((option) => ({
                                [option.value]: option.label,
                        })),
                };

                try {
                        await saveSegment(data);
                        // Clear the form fields
                        setSegmentName("");
                        setSelectedSchemas([]);
                        setAvailableOptions(schemaOptions);
                        setNewSchema("");

                } catch (error) {
                        showToast("error", `Error: ${error.message}`);
                }
        };

        return (
                <div
                        ref={sidebarRef}
                        className={`fixed top-0 right-0 w-1/3 h-full bg-white shadow-lg transform ${isSidebarOpen ? "translate-x-0" : "translate-x-full"
                                } transition-transform duration-300 ease-in-out p-6 z-50`}
                >
                        <h2 className="text-2xl font-bold mb-4">Enter the name of the segment</h2>

                        <div className="mb-4">
                                <input
                                        type="text"
                                        className="w-full p-2 border rounded"
                                        placeholder="Name of the segment"
                                        value={segmentName}
                                        onChange={(e) => setSegmentName(e.target.value)}
                                />
                        </div>

                        <div className="flex items-center space-x-4 mb-4 justify-end">
                                <div className="flex items-center space-x-2">
                                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                        <span>-</span>
                                        <span>User Traits</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                        <span>-</span>
                                        <span>Group Traits</span>
                                </div>
                        </div>

                        <div className="mb-4 rounded">
                                <label className="block mb-2 font-semibold">To save your segment, you need to add schemas to build the query</label>
                                {selectedSchemas.length > 0 ? (
                                        selectedSchemas.map((schema, index) => (
                                                <div key={index} className="mb-2 flex items-center space-x-4">
                                                        <div
                                                                className={`w-3 h-3 rounded-full flex-shrink-0 ${schema.type === "user" ? "bg-green-500" : "bg-red-500"
                                                                        }`}
                                                        ></div>

                                                        <SchemaSelector
                                                                schema={schema}
                                                                availableOptions={availableOptions}
                                                                onRemove={() => handleRemoveSchema(index)}
                                                                onChange={(updatedSchema) => {
                                                                        const updatedSchemas = [...selectedSchemas];
                                                                        updatedSchemas[index] = updatedSchema;
                                                                        setSelectedSchemas(updatedSchemas);
                                                                }}
                                                        />
                                                </div>
                                        ))
                                ) : (
                                        <p className="text-gray-500">No schema added yet.</p>
                                )}

                                <div className="mt-4 flex items-center space-x-4">
                                        <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
                                        <select
                                                value={newSchema}
                                                onChange={(e) => setNewSchema(e.target.value)}
                                                className="w-full p-2 border rounded"
                                        >
                                                <option value="">Add schema to segment</option>
                                                {availableOptions.map((option) => (
                                                        <option key={option.value} value={option.value}>
                                                                {option.label}
                                                        </option>
                                                ))}
                                        </select>

                                        <button
                                                className="text-slate-500 p-2 bg-teal-100"
                                                onClick={() => setNewSchema("")}
                                        >
                                                <FaMinus />
                                        </button>
                                </div>

                                <button
                                        className="text-teal-500 underline mt-2"
                                        onClick={handleAddSchema}
                                >
                                        + Add new schema
                                </button>
                        </div>

                        <div className="fixed bottom-0 left-0 w-full bg-gray-100 p-6 flex justify-between border-t">
                                <button
                                        className="bg-teal-500 text-white px-4 py-2 rounded w-1/2 mr-2"
                                        onClick={handleSaveSegment}
                                >
                                        Save Segment
                                </button>
                                <button
                                        className="bg-white text-red-500 px-4 py-2 rounded w-1/2 ml-2"
                                        onClick={toggleSidebar}
                                >
                                        Cancel
                                </button>
                        </div>
                </div>
        );
}

export default SidebarForm;
