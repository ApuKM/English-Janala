const createElements = (arr) => {
  if (!Array.isArray(arr) || arr.length === 0) {
    return `<span class="text-gray-400 font-bangla">কোন সমার্থক শব্দ পাওয়া যায়নি</span>`;
  }

  const htmlElements = arr.map(
    el => `<span class="btn">${el}</span>`
  );

  return htmlElements.join(" ");
};

const displaySpinner = (status) => {
  const spinnerEl = document.getElementById("spinner");
  const wordContainer = document.getElementById("word-container");
  if(status){
    spinnerEl.classList.remove("hidden");
    wordContainer.classList.add("hidden");
  }else{
    spinnerEl.classList.add("hidden");
    wordContainer.classList.remove("hidden");
  }
}

const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => diplayLessons(json.data));
};

const diplayLessons = (lessons) => {
  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";

  lessons.forEach((lesson) => {
    // console.log(lesson);
    const levelBtnElement = document.createElement("div");
    levelBtnElement.innerHTML = `
        <button id="btn-active-${lesson.level_no}" onclick="loadWordsByLevel(${lesson.level_no})" class="btn btn-outline btn-primary text-base btn-lesson">Lesson -${lesson.level_no}</button>
        `;
    levelContainer.appendChild(levelBtnElement);
  });
};

const removeActiveClass = () => {
  const allBtn = document.querySelectorAll(".btn-lesson");
  allBtn.forEach((btn) => btn.classList.remove("bg-[#422AD5]", "text-white"));
};

const loadWordsByLevel = (id) => {
  displaySpinner(true);
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  // console.log(url)
  fetch(url)
    .then((res) => res.json())
    .then((json) => {
      const btnActive = document.getElementById(`btn-active-${id}`);
      removeActiveClass();
      btnActive.classList.add("bg-[#422AD5]", "text-white");
      displayWordsByLevel(json.data);
    });
};

const loadWordDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  const res = await fetch(url);
  const wordDetails = await res.json();
  // console.log(wordDetails)
  displayWordDetails(wordDetails.data);
};

const displayWordDetails = (wordDetails) => {
  const wordDetailsContainer = document.getElementById(
    "word-details-container",
  );
  wordDetailsContainer.innerHTML = `
         <h2 class="text-2xl font-bold">${wordDetails.word} (<i class="fa-solid fa-microphone-lines"></i>  <span class="font-bangla">:${wordDetails.pronunciation}</span>)</h2>
          <div>
            <h3 class="text-lg font-semibold">Meaning</h3>
            <p class="text-base font-bangla font-semibold">${wordDetails.meaning}</p>
          </div>
          <div>
            <h3 class="text-lg font-semibold">Example</h3>
            <p class="text-base text-gray-600 font-semibold">${wordDetails.sentence}</p>
          </div>
          <div class="space-y-1">
            <h3 class="text-base font-bangla font-semibold">সমার্থক শব্দ গুলো</h3>
            <div>
                ${createElements(wordDetails.synonyms)}
            </div>
          </div>
  `;
  document.getElementById("my_modal_5").showModal();
};

const displayWordsByLevel = (dataArray) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";

  if (dataArray.length === 0) {
    wordContainer.innerHTML = `
    <div class= "text-center font-bangla col-span-3 py-8 space-y-2">
      <img class="mx-auto" src="./assets/alert-error.png" alt="">
      <p class="text-lg text-gray-600">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
      <h2 class="text-2xl text-gray-800">নেক্সট Lesson এ যান</h2>
    </div>
    `;
    displaySpinner(false);
    return;
  }

  dataArray.forEach((data) => {
    const div = document.createElement("div");
    div.innerHTML = `
        <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
          <h2 class="text-3xl font-bold">${data.word ? data.word : "শব্দ পাওয়া যায়নি"}</h2>
          <p class="text-lg font-medium opacity-90">Meaning /Pronunciation</p>
          <p class="text-2xl font-semibold font-bangla opacity-90">"${data.meaning ? data.meaning : "অর্থ পাওয়া যায়নি"} / ${data.pronunciation ? data.pronunciation : "Pronunciation পাওয়া যায়নি"}"</p>
        <div class="flex justify-between items-center mt-10">
          <button onclick="loadWordDetails(${data.id})" class="btn bg-gray-100"><i class="fa-solid fa-circle-info"></i></button>
          <button class="btn bg-gray-100"><i class="fa-solid fa-volume-xmark"></i></button>
        </div>
      </div>
        `;
    wordContainer.appendChild(div);
  });
  displaySpinner(false);
};

loadLessons();
