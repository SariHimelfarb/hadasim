import { observable, action, makeObservable, computed } from 'mobx';
import axios from 'axios';


class memberService {
    members = [];

    constructor() {
        makeObservable(this, {
            members: observable,
            postMember: action,
            getMember: action,
            fetchMembers: action ,
            deleteMember: action,
            putMember:action,
        });
    }


    async getMember() {
        try {
            const response = await axios.get("https://localhost:7015/api/Member");
            this.fetchMembers(response.data); // Call action to update members
        } catch (error) {
            console.error("Error fetching members:", error);
        }
        return this.members;
    }

    // Action to update members
    fetchMembers(members) {
        this.members = members;
    }

    async postMember(m) {
        try {
            const response = await axios.post("https://localhost:7015/api/Member", m);
            this.fetchMembers(response.data); 
            console.log('Member added successfully:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error adding member:', error);
            throw error;
        }
    }
    async putMember(id, updatedMember) {
        try {
            const response = await axios.put(`https://localhost:7015/api/Member/${id}`, updatedMember);
            this.fetchMembers(response.data); 
            console.log('Member updated successfully:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error updating member:', error);
            throw error;
        }
    }
    async deleteMember(id) {
        try {
            await axios.delete(`https://localhost:7015/api/Member/${id}`);
            this.members = this.members.filter(member => member.id !== id);
        } catch (error) {
            console.error("Error deleting member:", error);
        }
    }
}

export default new memberService();
