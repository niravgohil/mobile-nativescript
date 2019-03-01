export class UserModel {
    firstName: string;
    lastName: string;
    email: String;
    password: String;
    confirmPassword: String;

    constructor(data) {
        this.firstName = data.firstName || "";
        this.lastName = data.lastName || "";
        this.email = data.email || "";
        this.password = data.password || "";
        this.confirmPassword = data.confirmPassword || "";
    }
}