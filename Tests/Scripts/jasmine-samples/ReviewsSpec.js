describe("Reviews", function() {
  var scope = {};
  var http = {};
  var resource = {};
  var genres = {};

  beforeEach(function() {
	new BRM.ReviewsController(scope, http, resource, genres);
  });

  it("should have default values", function() {
    //player.play(song);
    //expect(player.currentlyPlayingSong).toEqual(song);

    //demonstrates use of custom matcher
    expect(scope.CurrentGenre).toBe(-1);
  });


});