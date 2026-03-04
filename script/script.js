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
        <button onclick="loadWordsByLevel(${lesson.level_no})" class="btn btn-outline btn-primary text-base">Lesson -${lesson.level_no}</button>
        `;
    levelContainer.appendChild(levelBtnElement);
  });
};

const loadWordsByLevel = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  // console.log(url)
  fetch(url)
    .then((res) => res.json())
    .then((json) => displayWordsByLevel(json.data));
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
    return;
  }

  dataArray.forEach((data) => {
    const div = document.createElement("div");
    div.innerHTML = `
        <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
          <h2 class="text-3xl font-bold">${data.word ? data.word : "শব্দ পাওয়া যায়নি"}</h2>
          <p class="text-lg font-medium opacity-90">Meaning /Pronounciation</p>
          <p class="text-2xl font-semibold font-bangla opacity-90">"${data.meaning ? data.meaning : "অর্থ পাওয়া যায়নি"} / ${data.pronunciation ? data.pronunciation : "Pronunciation পাওয়া যায়নি"}"</p>
        <div class="flex justify-between items-center mt-10">
          <button class="btn bg-gray-100"><i class="fa-solid fa-circle-info"></i></button>
          <button class="btn bg-gray-100"><i class="fa-solid fa-volume-xmark"></i></button>
        </div>
      </div>
        `;
    wordContainer.appendChild(div);
  });
};

loadLessons();
