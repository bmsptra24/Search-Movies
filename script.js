// Declare & Initial
let ul = document.querySelector("ul");
let movies, dataMovies;

function find() {
  //Refresh
  const input = document.querySelector("input").value;
  ul.innerHTML = "";

  // Get API
  $.ajax({
    url: `http://www.omdbapi.com/?apikey=326a7ee6&s=${input}`,
    success: (results) => {
      movies = results.Search;
      console.log(movies);

      // Post to web - li
      for (idx in movies) {
        ul.innerHTML += `
        <div class="containerShow-${movies[idx].imdbID}"></div>
        <li class="z-0"> 
        <div class="card">
        <img src="${movies[idx].Poster}" class="card-img-top" alt="${movies[idx].Title}">
        <div class="card-body">
          <h5 class="card-title">${movies[idx].Title}</h5>
          <p class="card-text">Type: ${movies[idx].Type}</p>
          <p class="card-text">Year: ${movies[idx].Year}</p>
          <div>
            <button onclick="btnShow('${movies[idx].imdbID}')" type="button" class="btn btn-primary ${movies[idx].imdbID}" data-bs-toggle="ctn-popUp" data-bs-target="#staticBackdrop">
              Show
            </button>
          </div>
          
        </div>
        </div>
      </div>
      </li>`;
      }
    },
    error: (err) => {
      ul.innerHTML += `<h1>Error.</h1>
      ${err.responseText}
      `;
    },
  });
}

// event close Pop Up
function popUpClose(imdbID) {
  let cShow = document.querySelector(`.containerShow-${imdbID}`);
  cShow.innerHTML = "";
}

function display(cShow, imdbID, dataMovies) {
  // send data
  cShow.innerHTML += `<div class="ctn-popUp z-2">
  <div class="bg-popUp" onclick="popUpClose('${imdbID}')"></div>
  <div class="popUp">
    <div class="row">
      <h4 class="col">${dataMovies.Title}</h4>
      <button
        type="button"
        class="btn-close"
        onclick="popUpClose('${imdbID}')"
        data-bs-dismiss="ctn-popUp"
        aria-label="Close"
        style="margin-right: 8px;"
      ></button>
      <hr />
    </div>
    <div class="popUp-isi">
      <div class="">
        <img src="${dataMovies.Poster}" alt="${dataMovies.Title}" class="popUp-img"/>
      </div>
      <div class="">
        <table class="table table-bordered">
          <tr>
            <td>Genre: ${dataMovies.Genre}</td>
          </tr>
          <tr>
            <td>Actors: ${dataMovies.Actors}</td>
          </tr>
          <tr>
            <td>Duration: ${dataMovies.Runtime}</td>
          </tr>
          <tr>
            <td>Plot: ${dataMovies.Plot}</td>
          </tr>
          <tr>
            <td>Writer: ${dataMovies.Writer}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</div>`;
}

function btnShow(imdbID) {
  let cShow = document.querySelector(`.containerShow-${imdbID}`);

  $.ajax({
    url: `http://www.omdbapi.com/?apikey=326a7ee6&i=${imdbID}`,
    success: (results) => {
      dataMovies = results;
      console.log("work", dataMovies);
    },
    error: (err) => {
      ul.innerHTML += `<h1>Error.</h1>
      ${err.responseText}
      `;
    },
    complete: () => {
      display(cShow, imdbID, dataMovies);
    },
  });
  // cShow.innerHTML = "";
}
