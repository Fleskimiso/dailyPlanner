import { describe, expect, it, beforeAll } from "vitest";
import supertest from "supertest";
import { server } from "..";
import mongoose from "mongoose";

describe("userEndpoints", () => {
    const requestWithSupertest = supertest(server);
    const requestWithSupertestAgent = supertest.agent(server);
    beforeAll(async () => {
        try {
            await mongoose.disconnect();
            const connection = await mongoose.connect("mongodb://127.0.0.1:27017/dailyplannerTest");
            console.log("DB: ", connection.connections[0].name);

        } catch (error) {
            console.error(error);
            console.log("Error happened during making a connection to test db");
        }
    });
    it("should test the / route", async () => {
        const res = await requestWithSupertest.get("/");
        expect(res.status).toEqual(200);
    })
    it("should register user with valid input",async () => {
        const res = await requestWithSupertest.post("/api/register").send({
            username: "jsontest1" + String(Math.random() * 1000000),
            password: "json"
        });
        expect(res.status).toEqual(200);
    },);
    it("should return 400 when registering with no username", async () =>{
        const res = await requestWithSupertest.post("/api/register").send({
            password: "nousername"
        })
        expect(res.status).toEqual(400);
    });
    it("should return 400 when registering with no password", async () =>{
        const res = await requestWithSupertest.post("/api/register").send({
            username: "nopassword"
        })
        expect(res.status).toEqual(400);
    });
    it("should return 400 when registering with no password and username", async () =>{
        const res = await requestWithSupertest.post("/api/register").send();
        expect(res.status).toEqual(400);
    });
    it("should register user then log him in", async () =>{
        const dummyUsername = "jsontest1" + String(Math.random() * 1000000);
        const res = await requestWithSupertestAgent.post("/api/register").send({
            username: dummyUsername,
            password: "json"
        });
        expect(res.status).toEqual(200);
        const res2 = await requestWithSupertestAgent.post("/api/login").send({
            username: dummyUsername,
            password: "json"
        });
        expect(res2.status).toEqual(200);
    });
    it("should fail to register if the username is too long", async ()=>{
        const res = await requestWithSupertest.post("/api/register").send({
            username: String(new Array(101).fill('a').join()),
            password: "somepasword"
        });
        expect(res.status).toEqual(400);
    })

    it("should return 400 when logging in with no username", async () =>{
        const res = await requestWithSupertest.post("/api/register").send({
            password: "nousername"
        })
        expect(res.status).toEqual(400);
    });
    it("should return 400 when logging in with no password", async () =>{
        const res = await requestWithSupertest.post("/api/register").send({
            username: "nopassword"
        })
        expect(res.status).toEqual(400);
    });
    it("should return 400 when logging in with no password and username", async () =>{
        const res = await requestWithSupertest.post("/api/register").send();
        expect(res.status).toEqual(400);
    });
    it("should logout the user",async () =>{
        const res  = await requestWithSupertestAgent.post("/api/logout").send();
        expect(res.status).toEqual(200);
    })

}); 