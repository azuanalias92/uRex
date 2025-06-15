describe("Exchange Rates API", () => {
  let createdId: number;

  it("should create an exchange rate", async () => {
    const res = await fetch("http://localhost:3000/api/rates", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ baseCurrencyId: 1, targetCurrencyId: 2, rate: 4.25, effectiveDate: new Date() }),
    });
    const json = await res.json();
    expect(res.status).toBe(200);
    expect(json.rate).toBe("4.25");

    createdId = json.id;
  });

  it("should get all exchange rates", async () => {
    const res = await fetch("http://localhost:3000/api/rates");
    const json = await res.json();
    expect(res.status).toBe(200);
    expect(Array.isArray(json)).toBe(true);
  });

  it("should update an exchange rate", async () => {
    const res = await fetch(`http://localhost:3000/api/rates/${createdId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rate: 4.5 }),
    });
    const json = await res.json();
    expect(res.status).toBe(200);
    expect(json.rate).toBe("4.5");
  });

  it("should delete an exchange rate", async () => {
    const res = await fetch(`http://localhost:3000/api/rates/${createdId}`, {
      method: "DELETE",
    });
    expect(res.status).toBe(204); // No Content
  });

  it("should return 404 or 405 for non-existent rate", async () => {
    const res = await fetch(`http://localhost:3000/api/rates/${createdId}`);
    expect([404, 405]).toContain(res.status);
  });
});
