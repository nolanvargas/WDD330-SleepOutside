import ExternalServices from "../js/ExternalServices"
import { alertMessage } from "../js/utils";

export default class Admin {
    constructor(outputSelector) {
        this.mainElement = document.querySelector(outputSelector);
        // come back to this one
        this.token = null
        this.services = new ExternalServices();
    }

    async login(creds, next) {
        // next is a callback function that sends the user 
        // where they want to go after logging in
        try {
            this.token = await this.services.loginRequest(creds);
            next()
        }
        catch(err) {
            console.log(err.message)
        }
    }
    showLogin() {
        const element = 
    }
}