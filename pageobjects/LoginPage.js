import DashboardPage from "./DashboardPage.js";

export default class LoginPage {
    constructor(page) {
        this.page = page;
        this.email = page.locator('#userEmail');
        this.password = page.locator('#userPassword');
        this.login = page.getByRole('button', { name: 'Login' });
    }

    async goto() {
        await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    }
    async validLogin(username, password) {

        await this.email.fill(username);
        await this.password.fill(password);
        await this.login.click();
        const dashboardPage = new DashboardPage(this.page);
        await dashboardPage.products.first().waitFor();

        return dashboardPage;
    }
}