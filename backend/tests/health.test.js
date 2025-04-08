const request = require("supertest");
const express = require("express");
const app = require("../index"); // Falls du exportierst

// Wenn du `app` nicht exportierst, kannst du den Test so schreiben:
describe("Health Check", () => {
  it("GET /api/health → should return 200 OK", async () => {
    const res = await request("http://localhost:1717").get("/api/health");
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("OK");
  });
});