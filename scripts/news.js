"use strict";

const btnPrevious = document.querySelector("#btn-prev");
const btnNext = document.querySelector("#btn-next");
const pageNum = document.querySelector("#page-num");
const newsContent = document.querySelector("#news-container");
const apiKey = "d942e4f5fc7740048601b95dfb60fe5d";

let totalResults = 0;

// Hàm kiểm tra nút Previous
const checkBtnPrevious = function () {
  if (pageNum.textContent === "1") {
    btnPrevious.style.display = "none";
  } else {
    btnPrevious.style.display = "block";
  }
};
checkBtnPrevious();

// Hàm kiểm tra nút Next
const checkBtnNext = function () {
  if (pageNum.textContent == Math.ceil(totalResults / 5)) {
    btnNext.style.display = "none";
  } else {
    btnNext.style.display = "block";
  }
};
// Lấy dữ liệu từ api
async function getDataFromAPI(country, category, pageSize, page) {
  try {
    const res = await fetch(
      `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&pageSize=${pageSize}&page=${page}&apiKey=${apiKey}`
    );
    const data = await res.json();

    totalResults = data.totalResults;
    console.log(data);

    displayNews(data);
  } catch (err) {
    console.log(err);
  }
}

getDataFromAPI("us", "sport", 5, 1);

// Hàm hiển thị danh sách news
const displayNews = function (data) {
  let html = "";
  data.articles.forEach((element) => {
    html += `<div class="card flex-row flex-wrap">
  <div class="card mb-3" style="">
    <div class="row no-gutters">
      <div class="col-md-4">
        <img
          src=${element.urlToImage}
          class="card-img"
          alt=${element.title}
        />
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">${element.title}
          </h5>
          <p class="card-text">${element.content}</p>
          <a
            href=${element.url}
            class="btn btn-primary"
            >View</a
          >
        </div>
      </div>
    </div>
  </div>
  `;
    newsContent.innerHTML = html;
  });
};

// Thêm sự kiện cho nút Next và Previous
btnNext.addEventListener("click", function () {
  getDataFromAPI("us", "sport", 5, ++pageNum.textContent);

  checkBtnPrevious();

  checkBtnNext();
});

btnPrevious.addEventListener("click", function () {
  getDataFromAPI("us", "sport", 5, --pageNum.textContent);

  checkBtnPrevious();

  checkBtnNext();
});
