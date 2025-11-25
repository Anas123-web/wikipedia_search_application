let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");

function createAndAppend(result) {
    let { link, title, description } = result;

    // container div
    let resultItemEl = document.createElement("div");
    resultItemEl.classList.add("result-item");

    // title
    let resultTitleEl = document.createElement("a");
    resultTitleEl.href = link;
    resultTitleEl.textContent = title;
    resultTitleEl.target = "_blank";
    resultTitleEl.classList.add("result-title");
    resultItemEl.appendChild(resultTitleEl);

    // line break after title
    let titleBreakEl = document.createElement("br");
    resultItemEl.appendChild(titleBreakEl);

    // url
    let urlEl = document.createElement("a");
    urlEl.classList.add("result-url");
    urlEl.href = link;
    urlEl.target = "_blank";
    urlEl.textContent = link;
    resultItemEl.appendChild(urlEl);

    // line break after url
    let lineBreakEl = document.createElement("br");
    resultItemEl.appendChild(lineBreakEl);

    // description
    let descriptionEl = document.createElement("p");
    descriptionEl.classList.add("link-description"); // match CSS
    descriptionEl.textContent = description;
    resultItemEl.appendChild(descriptionEl);

    // VERY IMPORTANT: append to results container
    searchResultsEl.appendChild(resultItemEl);
}

function displayResults(searchResults) {
    // hide spinner when results are ready
    spinnerEl.classList.add("d-none");

    for (let result of searchResults) {
        createAndAppend(result);
    }
}

function searchWikipedia(event) {
    if (event.key === "Enter") {
        searchResultsEl.textContent = "";

        // show spinner
        spinnerEl.classList.remove("d-none");

        let searchInput = searchInputEl.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInput;

        let options = {
            method: "GET"
        };

        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let { search_results } = jsonData;
                displayResults(search_results);
            });
    }
}

searchInputEl.addEventListener("keydown", searchWikipedia);
