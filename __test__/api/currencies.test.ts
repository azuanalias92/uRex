describe("Currency API", () => {
  let createdId: number;

  it("should create a currency", async () => {
    const res = await fetch("http://localhost:3000/api/currencies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code: "MYR", name: "Malaysia Ringgit" }),
    });
    const json = await res.json();
    expect(res.status).toBe(200);
    expect(json.code).toBe("MYR");
    createdId = json.id;
  });

  it("should get all currencies", async () => {
    const res = await fetch("http://localhost:3000/api/currencies");
    const json = await res.json();
    expect(res.status).toBe(200);
    expect(Array.isArray(json.currencies)).toBe(true);
  });

  it("should update the currency", async () => {
    const res = await fetch(`http://localhost:3000/api/currencies/${createdId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: "MYR", name: "Malaysian Ringgit" }),
    });
    const json = await res.json();
    expect(res.status).toBe(200);
    expect(json.name).toBe("Malaysian Ringgit");
  });

  it("should delete the currency", async () => {
    const res = await fetch(`http://localhost:3000/api/currencies/${createdId}`, {
      method: "DELETE",
    });
    expect(res.status).toBe(204); // No Content
  });

  it("should return 404 or 405 when fetching deleted currency", async () => {
    const res = await fetch(`http://localhost:3000/api/currencies/${createdId}`);
    expect([404, 405]).toContain(res.status); // Depending on whether GET by ID is implemented
  });
});
