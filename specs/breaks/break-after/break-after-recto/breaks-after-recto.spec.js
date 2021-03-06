const TIMEOUT = 10000; // Some book might take longer than this to renderer

describe("break-after-recto", () => {
	let page;
	beforeAll(async () => {
		page = await loadPage("breaks/break-after/break-after-recto/break-after-recto.html");
		return page.rendered;
	}, TIMEOUT);

	afterAll(async () => {
		if (!DEBUG) {
			await page.close();
		}
	});

	it("should render 39 pages", async () => {
		let pages = await page.$$eval(".pagedjs_page", (r) => {
			return r.length;
		});

		expect(pages).toEqual(39);
	});

	it("should render page 2 as blank", async () => {
		let isBlank = await page.$eval("[data-page-number='2']", (r) => {
			return r.classList.contains("pagedjs_blank_page");
		});

		expect(isBlank).toEqual(true);
	});

	it("should render page 3 as recto", async () => {
		let isRight = await page.$eval("[data-page-number='3']", (r) => {
			return r.classList.contains("pagedjs_right_page");
		});

		expect(isRight).toEqual(true);
	});

	it("page 3 should be Section 1", async () => {
		let text = await page.$eval("[data-page-number='3']", (r) => r.textContent);

		expect(text).toContain("Section 1");
	});

	it("should render page 5 as recto", async () => {
		let isRight = await page.$eval("[data-page-number='5']", (r) => {
			return r.classList.contains("pagedjs_right_page");
		});

		expect(isRight).toEqual(true);
	});

	it("page 5 should be Section 2", async () => {
		let text = await page.$eval("[data-page-number='5']", (r) => r.textContent);

		expect(text).toContain("Section 2");
	});

	it("should render page 8 as blank", async () => {
		let isBlank = await page.$eval("[data-page-number='8']", (r) => {
			return r.classList.contains("pagedjs_blank_page");
		});

		expect(isBlank).toEqual(true);
	});

	it("should render page 9 as recto", async () => {
		let isRight = await page.$eval("[data-page-number='9']", (r) => {
			return r.classList.contains("pagedjs_right_page");
		});

		expect(isRight).toEqual(true);
	});

	it("page 9 should be Section 3", async () => {
		let text = await page.$eval("[data-page-number='9']", (r) => r.textContent);

		expect(text).toContain("Section 3");
	});

	it("page 10 should break after h2", async () => {
		let text = await page.$eval("[data-page-number='10']", (r) => r.textContent);

		expect(text.trim()).toEqual("A - h2 (inline element)");
	});

	it("should render page 11 as recto", async () => {
		let isRight = await page.$eval("[data-page-number='11']", (r) => {
			return r.classList.contains("pagedjs_right_page");
		});

		expect(isRight).toEqual(true);
	});

	if (!DEBUG) {
		it("should create a pdf", async () => {
			let pdf = await page.pdf(PDF_SETTINGS);

			expect(pdf).toMatchPDFSnapshot(2);
			expect(pdf).toMatchPDFSnapshot(3);
			expect(pdf).toMatchPDFSnapshot(5);
			expect(pdf).toMatchPDFSnapshot(7);
			expect(pdf).toMatchPDFSnapshot(9);
			expect(pdf).toMatchPDFSnapshot(10);
			expect(pdf).toMatchPDFSnapshot(11);
		});
	}
}
);
