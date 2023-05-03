import { useState } from "react";

/**
 * Custom hook to manage form
 * @returns An object with the data, errors and functions: handleChange, handleSubmit.
 */
export const useForm = (options) => {
	const [data, setData] = useState(options?.default || {});
	const [errors, setErrors] = useState({});

	const handleChange = (event, key) => {
		if (event !== undefined && key) {
			const value = event.target ? event.target.value : event;
			setData({
				...data,
				[key]: value,
			});
			const newErrors = { ...errors };
			delete newErrors[key];
			setErrors(newErrors);
		}
	};

	const handleSubmit = (event) => {
		if (event) {
			event.preventDefault();
		}
		console.log(data);
	};

	return {
		handleSubmit,
		handleChange,
		data,
		errors,
	};
};
