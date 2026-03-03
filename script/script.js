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

  dataArray.forEach((data) => {
    const div = document.createElement("div");
    div.innerHTML = `
         <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-3">
        <h2 class="text-3xl font-bold">${data.word}</h2>
        <p class="text-lg font-medium opacity-90">Meaning /Pronounciation</p>
        <p class="text-2xl font-semibold font-bangla opacity-80">"${data.meaning} / ${data.pronunciation}"</p>
      </div>
        `;
        wordContainer.appendChild(div);
  });
};

loadLessons();
