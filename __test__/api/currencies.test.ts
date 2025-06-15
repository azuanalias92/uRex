describe("Currency API", () => {
  it("should create a currency", async () => {
    const res = await fetch("http://localhost:3000/api/currencies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code: "MYR", name: "Malaysian Ringgit" }),
    });

    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.code).toBe("MYR");
  });

  it("should get all currencies", async () => {
    const res = await fetch("http://localhost:3000/api/currencies");
    const json = await res.json();
    console.log("Response JSON:", json); // 👈 Add this


    expect(res.status).toBe(200);
    expect(Array.isArray(json.currencies)).toBe(true);
  });
});
