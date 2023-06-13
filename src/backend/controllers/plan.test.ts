import { describe, expect, it, beforeAll } from "vitest";
import supertest from "supertest";
import { server } from "..";
import mongoose from "mongoose";
import { assert } from "joi";



describe("planEndpoints", () => {
    const requestWithSupertestAgent = supertest.agent(server)
    beforeAll(async () => {
        try {
            await mongoose.disconnect();
            const connection = await mongoose.connect("mongodb://127.0.0.1:27017/dailyplanner");
            console.log("DB: ", connection.connections[0].name);
        } catch (error) {
            console.error(error);
            console.log("Error happened during making a connection to test db");
        }
    });
    it("should post the plan sucessfully",async () =>{
        const loginResponse = await requestWithSupertestAgent.post("api/login").send({
            username: "json",
            password: "json"
        });
        expect(loginResponse.statusCode).toEqual(200);
        const postResponse = await requestWithSupertestAgent.post("/api/plan").send({
            tasks: [{
                startTime: Date.now(),
                endTime: Date.now() + 1000*3600,
                name: "exampple task name",
                isFinished: false
            }],
            dayGoals: ["programming whole day"],
            day: new Date(Date.now()).toDateString()
        });
        expect(postResponse.statusCode).toEqual(200);
    })

}); 