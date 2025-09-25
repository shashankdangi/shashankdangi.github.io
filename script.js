const navMenu = document.querySelector(".links");
const closeBtn = document.querySelector(".close-btn");
const openBtn = document.querySelector(".nav-toggle");

openBtn.addEventListener("click", () => {
  navMenu.classList.add("active");
});

closeBtn.addEventListener("click", () => {
  navMenu.classList.remove("active");
});

fetch("./langs/en.json")
  .then((res) => res.json())
  .then((projects) => {
    const container = document.querySelector(".project-cards");

    projects.forEach((project) => {
      const card = document.createElement("div");
      card.classList.add("project-card");

      card.innerHTML = `
        <div class="project-img-container">
          <div class="project-img">
            <img src="./assets/WebDevelopmentProjects2.jpg" alt="" />
          </div>
        </div>
        <div class="project-about">
          <div class="project-title">
            <h1>Blog Website for News</h1>
            <p>
              Mastered CSS Grid complexities in building an innovative news
              homepage, navigating intricate design decisions for a seamless
              user experience. Leveraged the challenge to enhance skills in
              front-end development.
            </p>
          </div>
          <div class="project-details">
            <h1>Project Info</h1>

            <div class="project-info">
              <hr />
              <div class="year">
                <h3>Year</h3>
                <p>2023</p>
              </div>
              <hr />
              <div class="tech">
                <h3>Tech</h3>
                <div class="tech tags">
                  <p>React</p>
                  <p>HTML</p>
                  <p>CSS</p>
                  <p>API</p>
                </div>
              </div>
              <hr />
            </div>
          </div>
          <div class="project-links">
            <div class="live-link">
              <a href="#">Live Demo <i class="fa-solid fa-arrow-right"></i> </a>
            </div>
            <div class="github-link">
              <a href="#">See on Github <i class="fa-brands fa-github"></i></a>
            </div>
          </div>
        </div>
      `;

      container.appendChild(card);
    });
  })
  .catch((err) => console.error("Error Loading Projects: ", err));
