const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then(res => res.json())
        .then(json => diplayLessons(json.data))
} 

const diplayLessons = (lessons) => {
    const levelContainer = document.getElementById("level-container");
    levelContainer.innerHTML = "";

    lessons.forEach(lesson => {
        console.log(lesson);
        const levelBtnElement = document.createElement("div");
        levelBtnElement.innerHTML = `
        <button class="btn btn-outline btn-primary text-base">Lesson -${lesson.level_no}</button>
        `
        levelContainer.appendChild(levelBtnElement);
    });
}
loadLessons();