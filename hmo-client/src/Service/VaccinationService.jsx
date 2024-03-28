import { observable, action, makeObservable } from 'mobx';
import axios from 'axios';


class vaccinationService {
    vaccinations = [];

    constructor() {
        makeObservable(this, {
            vaccinations: observable,
            postVaccination: action,
            getVaccination: action,
            fetchVaccination: action ,

        });
    }


    async getVaccination() {
        try {
            const response = await axios.get("https://localhost:7015/api/Vaccination");
            this.fetchVaccination(response.data); // Call action to update members
        } catch (error) {
            console.error("Error fetching vaccination:", error);
        }
        return this.vaccinations;
    }

    // Action to update members
    fetchVaccination(vaccinations) {
        this.vaccinations = vaccinations;
    }

    async postVaccination(v) {
        try {
            const response = await axios.post("https://localhost:7015/api/Vaccination", v);
            this.fetchVaccination(response.data); // Update local vaccinations with response data
            console.log('Vaccination added successfully:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error adding vaccination:', error);
            throw error; // Rethrow the error to handle it in the calling component
        }
    }
}

export default new vaccinationService();
