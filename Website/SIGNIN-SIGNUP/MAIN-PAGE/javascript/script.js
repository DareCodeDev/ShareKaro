// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // JavaScript to pause the animation on hover
  // const slider = document.querySelector('.slider');
  // slider.addEventListener('mouseover', () => {
  //   slider.style.animationPlayState = 'paused';
  // });
  // slider.addEventListener('mouseout', () => {
  //   slider.style.animationPlayState = 'running';
  // });

  const Row = document.getElementById("row");
  const SearchArea = document.getElementById("search-area");
  const Imageslist = document.getElementById("Images-list");
  const ShowMore = document.getElementById("show-more");

  let keyword = "";
  let page = 1;
  let assessKey = "1vylW6wUMK3VOEaNu7wy_7DjHIABnVj2dnCUcL11URs";

  async function searchImages() {
    keyword = SearchArea.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${assessKey}&per_page=12`;

    const response = await fetch(url);
    const data = await response.json();

    if (page === 1) {
      Imageslist.innerHTML = "";
    }

    const results = data.results;
    results.map((result) => {
      const image = document.createElement("img");
      image.src = result.urls.small;

      const imageLink = document.createElement("a");
      imageLink.href = result.links.download;
      imageLink.target = "_blank";

      imageLink.appendChild(image);
      Imageslist.appendChild(imageLink);
    });
    ShowMore.style.display = "block";
  }

  Row.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    searchImages();
  });

  ShowMore.addEventListener("click", function () {
    page++;
    searchImages();
  });

  function scrollFunction() {
    const element = document.getElementById("Images-list");
    element.scrollIntoView();
  }
});
