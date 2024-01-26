import React, { useState } from "react";
import styles from "./form.module.scss";

const packages = ["Ticket", "Booking", "Package", "Trip"];

export default function Form() {
	const [details, setDetails] = useState({
		name: "",
		email: "",
		mobile: "",
		business: "",
		package: "0",
	});

	const handleChange = (
		e:
			| React.ChangeEvent<HTMLInputElement>
			| React.ChangeEvent<HTMLSelectElement>
	) => {
		let key = e.target.name;
		let value = e.target.value;

		setDetails((prev) => {
			return { ...prev, [key]: value };
		});
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		console.log(details);
		fetch("/api/forms")
			.then((res) => res.json())
			.then((res) => console.log(res))
			.catch((err) => console.error(err));
	};

	return (
		<div className={styles.contact_from}>
			<form onSubmit={handleSubmit}>
				<h3>Enquire Now</h3>

				<input
					type="text"
					placeholder="Name"
					required
					value={details.name}
					name="name"
					onChange={handleChange}
				/>

				<input
					type="email"
					placeholder="Email"
					required
					value={details.email}
					name="email"
					onChange={handleChange}
				/>

				<input
					type="number"
					placeholder="Mobile"
					min={1000000000}
					max={9999999999}
					value={details.mobile}
					required
					name="mobile"
					onChange={handleChange}
				/>

				<input
					type="text"
					placeholder="Business Name"
					value={details.business}
					name="business"
					onChange={handleChange}
				/>

				<select
					required
					value={details.business}
					name="package"
					onChange={handleChange}
				>
					<option value="-1" disabled>
						What Are You Looking For?
					</option>
					<option value="0">Ticket</option>
					<option value="1">Booking</option>
					<option value="2">Package</option>
					<option value="3">Trip</option>
				</select>

				<p className={styles.disclaimer}>
					Disclaimer: By clicking submit, you agree to receive
					communications from the business in accordance with our
					Privacy Policy .
				</p>

				<button type="submit">Submit</button>
			</form>
		</div>
	);
}
