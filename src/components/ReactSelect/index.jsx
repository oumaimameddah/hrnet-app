import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

import {useClickOutside, useKeypress, useTrapFocus} from "../../hooks/use.utilitises";

import "./styles.scss";

function ReactSelect({
	id,
	label,
	value,
	options,
	onChange,
	listLabel = "Choose your option",
	showListLabel = false,
	labelClassName = "",
	dropdownWrapperClassName = "dropdown-wrapper",
	dropdownButtonClassName = "dropdown-button",
	dropdownIconClassName = "dropdown-icon",
	dropdownListWrapperClassName = "dropdown-list-wrapper",
	dropdownOptionClassName = "dropdown-option",
	dropdownOptionSelectedClassName = "current-selection",
	dropdownListClassName = "dropdown-list",
	dropdownListLabelClassName = "label",
	required = false,
	requiredFeedbackEnabled = false,
	requiredFeedback = "*",
	dropdownInputClassName = "dropdown-text",
	requiredFeedbackClassName = "required",
}) {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedOptionLabel, setSelectedOptionLabel] = useState("");
	const [selectedOptionValue, setSelectedOptionValue] = useState("");
	const ref = useRef();

	useClickOutside(ref, isOpen, () => setIsOpen(false));
	useKeypress("Escape", isOpen, () => setIsOpen(false));
	useTrapFocus(ref, isOpen);

	useEffect(() => {
		if (isOpen) {
			// Scrolling the selected option into view.
			const dropdown = document.querySelector(`#${id}-dropdown-wrapper`);
			const selectedOption = dropdown.querySelector(`.current-selection`);
			if (selectedOption) {
				selectedOption.scrollIntoView();
				selectedOption.focus();
			}
		}
	}, [isOpen, id]);

	useEffect(() => {
		// Setting the label and value of the dropdown.
		// If the value prop is passed in, it sets the label and value to the value prop.
		// Else, it sets the label and value to the first option in the options array. */
		let label = "";
		let newValue = "";

		if (!value) {
			label = options[0].label ? options[0].label : options[0];
			newValue = options[0].value ? options[0].value : options[0];
		} else {
			label = value;
			newValue = value;
			// If the option is an object (different label and value), get the option label.
			const selectedOption = options.find((option) => option.value === value);
			if (selectedOption) {
				label = selectedOption.label;
			}
		}
		setSelectedOptionValue(newValue);
		setSelectedOptionLabel(label);
	}, [value, options]);

	/**
	 * Sets the selected option label and value, closes the dropdown, and calls the onChange function if it exists.
	 */
	const handleOptionClick = (label, value) => {
		setSelectedOptionLabel(label);
		setSelectedOptionValue(value);
		setIsOpen(false);
		if (onChange) {
			onChange(value);
		}
		const button = document.getElementById(id + "-dropdown-button");
		if (button) {
			button.focus();
		}
	};

	/**
	 * If the user presses the enter key or the space bar, call the handleOptionClick function. If the
	 * user presses the arrow down key, focus on the next option. If the user presses the arrow up key,
	 * focus on the previous option
	 */
	const handleKeyDown = (e, label, value) => {
		if (e.key === "Enter" || e.key === " ") {
			handleOptionClick(label, value);
		}
		if (e.key === "ArrowDown") {
			e.preventDefault();
			const selectedOption = e.target;
			if (selectedOption) {
				const nextOption = selectedOption.nextElementSibling;
				if (nextOption) {
					nextOption.focus();
				}
			}
		}
		if (e.key === "ArrowUp") {
			e.preventDefault();
			const selectedOption = e.target;
			if (selectedOption) {
				const previousOption = selectedOption.previousElementSibling;
				if (previousOption) {
					previousOption.focus();
				}
			}
		}
	};

	/**
	 * If the key pressed is the Enter key or the space bar, then set the state of isOpen to true
	 */
	const handleKeyDownLabel = (e) => {
		if (e.key === "Enter" || e.key === " ") {
			setIsOpen(true);
		}
	};

	return (
		<div ref={ref}>
			{label && (
				<label
					id={id + "-dropdown-label"}
					htmlFor={id + "-input"}
					// Adding the class name "active" to the label if the dropdown is open.
					className={labelClassName + (isOpen ? " active" : "")}
				>
					{label} {requiredFeedbackEnabled && <span className={requiredFeedbackClassName}>{requiredFeedback}</span>}
				</label>
			)}
			<div id={id + "-dropdown-wrapper"} className={dropdownWrapperClassName}>
				<div
					id={id + "-dropdown-button"}
					className={dropdownButtonClassName}
					onClick={(e) => {
						e.preventDefault();
						setIsOpen(true);
					}}
					onKeyDown={handleKeyDownLabel}
					tabIndex={0}
					aria-label={label}
					aria-expanded={isOpen}
					role={"combobox"}
					aria-controls={id + "-dropdown-list"}
				>
					<input value={selectedOptionLabel} className={dropdownInputClassName} onChange={(e) => {e.preventDefault()}} name="" id={id} required={required}></input>
					<span className={dropdownIconClassName}></span>
				</div>
				{isOpen && (
					<div className={dropdownListWrapperClassName} aria-modal="true">
						{showListLabel && <div className={dropdownOptionClassName + " " + dropdownListLabelClassName}>{listLabel}</div>}
						<ul id={id + "-dropdown-list"} className={dropdownListClassName} role="listbox" tabIndex={-1}>
							{options.map((option) => {
								let label = option;
								let value = option;
								// Checking if the option is an object.
								//If it is, it sets the label and value to the label and value of the object.
								if (option.label && option.value) {
									label = option.label;
									value = option.value;
								}
								return (
									<li
										id={`${id}-dropdown-item-${value}`}
										// Adding the class name "current-selection" to the selected option.
										className={dropdownOptionClassName + (selectedOptionValue === value ? " " + dropdownOptionSelectedClassName : "")}
										key={`${id}-dropdown-item-${value}`}
										onClick={() => handleOptionClick(label, value)}
										onKeyDown={(e) => handleKeyDown(e, label, value)}
										tabIndex="0"
										role="option"
										aria-selected={selectedOptionValue === value}
										aria-label={label}
									>
										{label}
									</li>
								);
							})}
						</ul>
					</div>
				)}
			</div>
		</div>
	);
}

ReactSelect.propTypes = {
	/** The id of the dropdown */
	id: PropTypes.string.isRequired,

	/** The label of the dropdown */
	label: PropTypes.string,

	/** The value of the dropdown */
	value: PropTypes.node,

	/** The options of the dropdown */
	options: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.number])).isRequired,

	/** The function called when the dropdown is changed */
	onChange: PropTypes.func,

	/** The label of the dropdown list */
	listLabel: PropTypes.string,

	/** Whether or not to show the list label */
	showListLabel: PropTypes.bool,

	/** The class name of the label */
	labelClassName: PropTypes.string,

	/** The class name of the dropdown wrapper */
	dropdownWrapperClassName: PropTypes.string,

	/** The class name of the dropdown button */
	dropdownButtonClassName: PropTypes.string,

	/** The class name of the dropdown icon */
	dropdownIconClassName: PropTypes.string,

	/** The class name of the dropdown input */
	dropdownInputClassName: PropTypes.string,

	/** The class name of the dropdown list wrapper */
	dropdownListWrapperClassName: PropTypes.string,

	/** The class name of the dropdown list */
	dropdownListClassName: PropTypes.string,

	/** The class name of the dropdown option */
	dropdownOptionClassName: PropTypes.string,

	/** The class name of the selected dropdown option */
	dropdownOptionSelectedClassName: PropTypes.string,

	/** The class name of the dropdown list label */
	dropdownListLabelClassName: PropTypes.string,

	/** Whether or not the dropdown is required */
	required: PropTypes.bool,

	/** Whether or not to show the required feedback */
	requiredFeedbackEnabled: PropTypes.bool,

	/** The required feedback */
	requiredFeedback: PropTypes.string,

	/** The class name of the required feedback */
	requiredFeedbackClassName: PropTypes.string,
};

export default ReactSelect;
