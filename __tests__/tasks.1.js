const puppeteer = require("puppeteer");
const path = require('path');

const browserOptions = {
    headless: true,
    ignoreHTTPSErrors: true,
    defaultViewport: null,
    devtools: false,
}
let browser;
let page;

const regex = /^[1-9]\d*$/;

beforeAll(async () => {
    browser = await puppeteer.launch(browserOptions);
    page = await browser.newPage();
    await page.goto('file://' + path.resolve('./index.html'));
}, 30000);

afterAll((done) => {
    try { this.puppeteer.close(); } catch (e) { }
    done();
});

describe("1. minimum length", () => {

    it("First Name input field checks for minimum length of at least 1 character", async () => {
        try {
            await page.type('#firstname', 'john');
            const minLength = await page.$eval('#firstname', el => el.getAttribute('minlength'));
            expect(minLength).toMatch(regex);
        } catch (err) {
            throw err
        }
    })
    

    it("Last Name input field checks for minimum length of at least 1 character", async () => {
        try {
            await page.type('#lastname', 'Doe');
            const minLength = await page.$eval('#lastname', el => el.getAttribute('minlength'));
            expect(minLength).toMatch(regex);

        } catch (err) {
            throw err
        }
    })
    

    it("Email input field checks for minimum length of at least 1 character", async () => {
        try {
            await page.type('#email', 'john@gmail.com');
            const minLength = await page.$eval('#email', el => el.getAttribute('minlength'));
            expect(minLength).toMatch(regex);
        } catch (err) {
            throw err
        }
    })
    
    
});

describe("2. maximum length", () => {
    it("message field should be limited to a maximum text length", async () => {
        try {
            await page.type('textarea', 'hello');
            const minLength = await page.$eval('textarea', el => el.getAttribute('maxlength'));
            expect(minLength).toMatch(regex);
        } catch (err) {
            throw err
        }
    })
})

describe("3. required fields", () => {
    it("First Name field Should be 'required' ", async () => {
        try {
            const required = await page.$eval('#firstname', el => el.getAttribute('required'));
            expect(required).toBe("");
        } catch (error) {
            throw error
        }
    })
    it("Last Name field Should be 'required' ", async () => {
        try {
            const required = await page.$eval('#lastname', el => el.getAttribute('required'));
            expect(required).toBe("");
        } catch (error) {
            throw error
        }
    })
    it("Email field Should be 'required' ", async () => {
        try {
            const required = await page.$eval('#email', el => el.getAttribute('required'));
            expect(required).toBe("");
        } catch (error) {
            throw error
        }
    })
    it("message field Should be 'required' ", async () => {
        const required = await page.$eval('textarea', el => el.getAttribute('required'));
        expect(required).toBe("");
    })
})

describe("4. `disabled` attribute", () => {
    it("submit input should not have a `disabled` attribute", async () => {
        const disabled = await page.$eval('input[type="submit"]', el => el.getAttribute('disabled'));
        expect(disabled).not.toBe("");
    })
})

describe("5. Formspree.io", () => {
    it("Should allow user to submit form via 'Formspree.io' ", async () => {
        try {
            await page.$eval('input[type="submit"]', form => form.click());
            await page.waitForTimeout(2.400);
            const url = await page.url();
            expect(url).toMatch(/formspree/);
        } catch (err) {
            throw err
        }
    })
})