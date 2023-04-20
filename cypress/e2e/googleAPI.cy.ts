const apiKey = "AIzaSyArpMe_hIXYXFFMOoLcAAHSoDkD4WH6GMU";
const zipCode = "85382";

describe("Get random home address for zip code", () => {
  it("Should retrieve a random home address for the given zip code", () => {
    // Send a request to the Google Maps Geocoding API to retrieve the latitude and longitude for the given zip code
    cy.request(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${zipCode}&key=${apiKey}`
    )
      .its("body")
      .then((response) => {
        // Extract the latitude and longitude from the response
        const location = response.results[0].geometry.location;

        // Send a request to the Google Places API to search for nearby places
        cy.request(
          `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.lat},${location.lng}&radius=5000&type=address&key=${apiKey}`
        )
          .its("body")
          .then((response) => {
            // Select a random address from the list
            const randomIndex = Math.floor(
              Math.random() * response.results.length
            );
            const placeId = response.results[randomIndex].place_id;

            // Send a request to the Google Places API to retrieve the details of the selected place
            cy.request(
              `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${apiKey}`
            )
              .its("body")
              .then((response) => {
                // Extract the formatted address from the response
                const formattedAddress = response.result.formatted_address;

                // Log the random address
                cy.log(formattedAddress);
              });
          });
      });
  });
});
