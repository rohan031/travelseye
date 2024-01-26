import type { Context, Config } from "@netlify/functions";

export default async (req: Request, context: Context) => {
	console.log(req);
	console.log(context);
	return new Response("Hello, world!");
};

export const config: Config = {
	path: "/api/form",
};
