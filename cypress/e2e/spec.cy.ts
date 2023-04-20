const zipCode = "85382";
const countryCode = "US";
const apiKey = "07ea7a257fe446ebb49a71cc75c2e95f";

describe("Random home address within zip code", () => {
  it("should retrieve a random home address within the specified zip code area", () => {
    // Retrieve the bounding box for the zip code
    cy.request({
      method: "GET",
      url: `https://api.opencagedata.com/geocode/v1/json?q=${zipCode}&countrycode=${countryCode}&key=${apiKey}&pretty=1&limit=1`,
    }).then((response) => {
      const bbox = response.body.results[0].bounds;

      // Generate a random latitude and longitude within the bounding box
      const minLat = bbox.southwest.lat;
      const maxLat = bbox.northeast.lat;
      const minLng = bbox.southwest.lng;
      const maxLng = bbox.northeast.lng;

      const randomLat = Math.random() * (maxLat - minLat) + minLat;
      const randomLng = Math.random() * (maxLng - minLng) + minLng;

      // Reverse geocode the random latitude and longitude to retrieve the home address
      cy.request({
        method: "GET",
        url: `https://api.opencagedata.com/geocode/v1/json?q=${randomLat}+${randomLng}&key=${apiKey}&pretty=1&no_annotations=1`,
      }).then((response) => {
        const address = response.body.results[0].formatted;
        cy.log(address);
      });
    });
  });
});
