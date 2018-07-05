$('#campground-search').on('input',() => {
  let search = $(this).serialize();
  if(search === "") {
    search = "all"
  }
  $.get('/campgrounds?' + search, function(data) {
    $('.campground-display').html('');
    data.forEach(function(campground) {
      $('.campground-display').append(`
        <div class="col-md-4">
        <div class="card mb-4">
          <div>
            <img class="card-img-top" src="${ campground.images[0] }" alt="Card image cap">
            <div class="overlay">
              <a class="btn btn-outline-secondary" href="/campgrounds/${ campground._id }" role="button">More Info</a>
            </div>
          </div>

          <div class="card-body">
            <h3 class="card-title">${ campground.name }</h3>
            <p class="card-text"></p>
            <p class="card-text">${ campground.description.substring(0, 50) }...</p>
          </div>
        </div>
      </div>
      `);
    });
  });
});

$('#campground-search').submit(function(event) {
  event.preventDefault();
});