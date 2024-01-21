document.addEventListener("astro:page-load", () => {
	let links = document.querySelector(".nav-links");
	let input = document.querySelector("#nav-toggle");

	input?.addEventListener("change", (e) => {
		let target = e.target as HTMLInputElement;

		if (!target) return;

		let checked = target.checked;

		if (checked) {
			links?.setAttribute("data-state", "open");
		} else {
			links?.setAttribute("data-state", "close");
		}
	});
});
