import React, { useState, useRef } from "react";
import styles from "./form.module.scss";

const packages = ["Ticket", "Booking", "Package", "Trip"];

function Loader() {
	return (
		<>
			<div className="lds-ellipsis">
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</>
	);
}

export default function Form() {
	const [details, setDetails] = useState({
		name: "",
		email: "",
		mobile: "",
		business: "",
		package: "0",
	});
	const modalRef = useRef<HTMLDialogElement | null>(null);
	const [modalMsg, setModalMsg] = useState<string>(
		"Thank you for submitting the form! Your information has been successfully received. We appreciate your time and will get back to you as soon as possible. Have a great day! 😊"
	);

	const [loading, setLoading] = useState(false);

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
		setLoading(true);

		const inputDetails = {
			...details,
			package: packages[+details.package],
		};

		let body = JSON.stringify(inputDetails);

		fetch("/.netlify/functions/form", {
			method: "POST",
			body,
			headers: {
				"Content-type": "application/json; charset=UTF-8",
			},
		})
			.then((res) => {
				console.log(res.status);

				if (res.status !== 200)
					throw new Error("Error getting details");

				setModalMsg(
					"Thank you for submitting the form! Your information has been successfully received. We appreciate your time and will get back to you as soon as possible. Have a great day! 😊"
				);
			})
			.catch((err) => {
				console.error(err);
				setModalMsg(
					"We're sorry, but there was an issue with your form submission. Please try again after some time. 😓"
				);
			})
			.finally(() => {
				setDetails({
					name: "",
					email: "",
					mobile: "",
					business: "",
					package: "0",
				});

				modalRef.current?.showModal();
				setLoading(false);
			});
	};

	const handleClose = () => {
		modalRef.current?.close();
	};

	return (
		<>
			<>
				<dialog className={styles.modal} ref={modalRef}>
					<div className={styles.container}>
						<div className={styles.menu}>
							<img src="/logo-sm.svg" alt="" />

							<button onClick={handleClose}>
								<img src="/close.svg" alt="" title="close" />
							</button>
						</div>

						<div className={styles.text}>
							<p>{modalMsg}</p>
						</div>

						<div className={styles.button}>
							<button onClick={handleClose}>Okay</button>
						</div>
					</div>
				</dialog>
			</>

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
						disabled={loading}
					/>

					<input
						type="email"
						placeholder="Email"
						required
						value={details.email}
						name="email"
						onChange={handleChange}
						disabled={loading}
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
						disabled={loading}
					/>

					<input
						type="text"
						placeholder="Business Name"
						value={details.business}
						name="business"
						onChange={handleChange}
						disabled={loading}
					/>

					<select
						required
						value={details.package}
						name="package"
						onChange={handleChange}
						disabled={loading}
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

					<button type="submit" disabled={loading}>
						{loading ? <Loader /> : "Submit"}
					</button>
				</form>
			</div>
		</>
	);
}
