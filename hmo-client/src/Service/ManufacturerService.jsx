import { observable, action, makeObservable, computed } from 'mobx';
import axios from 'axios';


class manufacturerService {
    manufacturers = [];

    constructor() {
        makeObservable(this, {
            manufacturers: observable,
            postManufacturer: action,
            getManufacturer: action,
            fetchManufacturer: action ,

        });
    }


    async getManufacturer() {
        try {
            const response = await axios.get("https://localhost:7015/api/Manufacturer");
            this.fetchManufacturer(response.data); // Call action to update members
        } catch (error) {
            console.error("Error fetching manufacturer:", error);
        }
        return this.manufacturers;
    }

    // Action to update members
    fetchManufacturer(manufacturers) {
        this.manufacturers = manufacturers;
    }

    postManufacturer(m) {
        fetch("https://localhost:7015/api/Manufacturer", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(m)
        })
    }
}

export default new manufacturerService();
