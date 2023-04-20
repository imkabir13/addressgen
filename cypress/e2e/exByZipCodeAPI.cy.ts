describe("Random address test", () => {
  it("should retrieve a random address within a zip code area", () => {
    const apiKey = "your_api_key";
    const zipCode = "90210";

    cy.request(
      `https://api.zip-codes.com/ZipCodesAPI.svc/1.0/FindZipCodesInRadius?zipcode=${zipCode}&minimumradius=0&maximumradius=5&key=${apiKey}`
    ).then((response) => {
      const zipCodes = response.body;
      const randomZipCode =
        zipCodes[Math.floor(Math.random() * zipCodes.length)];

      cy.request(
        `https://api.zip-codes.com/ZipCodesAPI.svc/1.0/GetZipCodeDetails/${randomZipCode}?key=${apiKey}`
      ).then((response) => {
        const address = response.body;
        cy.log(JSON.stringify(address));
      });
    });
  });
});
