import React from "react";
import { FaMinus } from "react-icons/fa";

function SchemaSelector({ schema, availableOptions, onRemove, onChange }) {
        return (
                <>
                        <select
                                value={schema.value}
                                onChange={(e) => {
                                        const updatedSchema = availableOptions.find(
                                                (option) => option.value === e.target.value
                                        );
                                        onChange(updatedSchema);
                                }}
                                className="w-full p-2 border rounded"
                        >
                                {availableOptions.concat(schema).map((option) => (
                                        <option key={option.value} value={option.value}>
                                                {option.label}
                                        </option>
                                ))}
                        </select>

                        <button
                                className="text-slate-500 p-2 bg-teal-100"
                                onClick={onRemove}
                        >
                                <FaMinus />
                        </button>
                </>
        );
}

export default SchemaSelector;
