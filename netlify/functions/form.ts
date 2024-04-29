import type { Handler, HandlerEvent } from "@netlify/functions";
const nodemailer = require("nodemailer");

interface Details {
	name: string;
	email: string;
	mobile: string;
	business: string;
	package: string;
}

const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: "traveleyes.web@gmail.com",
		pass: process.env.pass,
	},
});

const sendMail = async (text: string) => {
	const mailOptions = {
		from: "traveleyes.web@gmail.com",
		// to: "info@traveleyes.in",
		to: "rohanverma031@gmail.com",
		subject: "Form Submission",
		text,
	};

	return await transporter.sendMail(mailOptions);
};

const handler: Handler = async function (event: HandlerEvent) {
	// function code here
	let details = event.body;

	if (!details)
		return {
			statusCode: 422,
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				msg: "Invalid input",
			}),
		};

	let obj: Details = JSON.parse(details);
	console.log(obj);

	if (!obj)
		return {
			statusCode: 422,
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				msg: "Invalid input",
			}),
		};

	const { name, email, mobile, business } = obj;
	const pack = obj.package;

	let text = `Form Submission Data. 
    Name: ${name}
    Email: ${email}
    Mobile: ${mobile}
    ${business.length > 0 ? `Business: ${business}` : ""}
    Package: ${pack}
`;

	try {
		await sendMail(text);

		return {
			statusCode: 200,
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				msg: "Message sent successfully",
			}),
		};
	} catch (err) {
		console.error(err);
		return {
			statusCode: 500,
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				msg: "Internal Server Error",
			}),
		};
	}
};

export { handler };
