const navMenu = document.querySelector(".links");
const closeBtn = document.querySelector(".close-btn");
const openBtn = document.querySelector(".nav-toggle");

openBtn.addEventListener("click", () => {
  navMenu.classList.add("active");
});

closeBtn.addEventListener("click", () => {
  navMenu.classList.remove("active");
});

function setLanguageClass(lang) {
  document.documentElement.classList.remove("lang-en", "lang-jp");
  document.documentElement.classList.add(`lang-${lang}`);
}

//!=========================== default lang ========================================
let currentLang = "en";
//!=================================================================================

let sendMail = document.getElementById("Submit-btn");

function loadContent(lang) {
  fetch(`./langs/${lang}.json`)
    .then((res) => res.json())
    .then((data) => {
      //! Check the currentPage
      const HomePage = document.querySelector(".home");
      const AboutPage = document.querySelector(".about-page");

      //! Home Page Data

      if (HomePage) {
        //! Navigation
        const navLinks = document.querySelector(".nav-links");

        navLinks.innerHTML = `
      <li><a href='About.html'>${data.homePage.navigation.about}</a></li>
      <li><a href='#Work-Page'>${data.homePage.navigation.work}</a></li>
      <li><a href='#Contact-Page'>${data.homePage.navigation.contact}</a></li>
    `;
        // * Closes the nav when section is reached
        const links = navLinks.querySelectorAll("a");
        links.forEach((link) => {
          link.addEventListener("click", () => {
            navMenu.classList.remove("active"); // assumes navMenu is defined
          });
        });

        //! Home
        document.querySelector(".intro-top").innerHTML =
          data.homePage.home.introTop;
        document.querySelector(".intro-bottom").innerHTML =
          data.homePage.home.introBottom;
        document.querySelector(".contact-me-text").innerHTML =
          data.homePage.home.contactMe;

        //! About
        document.getElementById("about-heading").innerText =
          data.homePage.about.heading;
        document.getElementById("about-desc").innerText =
          data.homePage.about.description;
        document.getElementById("about-more").innerText =
          data.homePage.about.moreLink;
        document.getElementById("about-title").innerText =
          data.homePage.about.title;

        //! Projects
        document.getElementById("projects-intro").innerText =
          data.homePage.projectsIntro.intro;
        document.getElementById("projects-desc").innerText =
          data.homePage.projectsIntro.desc;

        const projectContainer = document.querySelector(".project-cards");
        projectContainer.innerHTML = ""; // clear previous
        data.homePage.projects.forEach((project) => {
          const card = document.createElement("div");
          card.classList.add("project-card");
          card.innerHTML = `
          <div class="project-img-container">
            <div class="project-img">
              <img src="${project.image}" alt="${project.title}" />
            </div>
          </div>
          <div class="project-about">
            <div class="project-title">
              <h1>${project.title}</h1>
              <p>${project.description}</p>
            </div>
            <div class="project-details">
              <h1>Project Info</h1>
              <div class="project-info">
                <hr />
                <div class="year">
                  <h3>Year</h3>
                  <p>${project.year}</p>
                </div>
                <hr />
                <div class="tech">
                  <h3>Tech</h3>
                  <div class="tech tags">
                    ${project.tech
                      .map((t) => `<p class="tech-tags">${t}</p>`)
                      .join(",")}
                  </div>
                </div>
                <hr />
              </div>
            </div>
            <div class="project-links">
              <div class="live-link">
                <a href="${
                  project.liveLink
                }" target="_blank">Live Demo <i class="fa-solid fa-arrow-right"></i></a>
              </div>
              <div class="github-link">
                <a href="${
                  project.githubLink
                }">See on Github <i class="fa-brands fa-github"></i></a>
              </div>
            </div>
          </div>
        `;
          projectContainer.appendChild(card);
        });
        //! Contact
        document.getElementById("contact-heading").innerText =
          data.homePage.contact.heading;
        document.getElementById("contact-email").innerHTML =
          data.homePage.contact.emailText;
        document.getElementById("contact-resume").innerHTML =
          data.homePage.contact.resumeText;

        document.getElementById("Name-label").innerHTML =
          data.homePage.contact.name;
        document.getElementById("Email-label").innerText =
          data.homePage.contact.email;
        document.getElementById("Subject-label").innerText =
          data.homePage.contact.subject;
        document.getElementById("Message-label").innerText =
          data.homePage.contact.message;

        // Fixed: Just set the button text, don't create nested anchor
        sendMail.innerText = data.homePage.contact.submit;
      }

      //!-----------------------AboutPage--------------------------------------------------------//
      if (AboutPage) {
        //?=====================Navigation=============
        const aboutNavLinks = document.querySelector(".about-nav-links");
        aboutNavLinks.innerHTML = `
      <li><a href='#Skills-Page'>${data.aboutPage.aboutNavigation.skills}</a></li>
      <li><a href='#Education-Page'>${data.aboutPage.aboutNavigation.education}</a></li>
      <li><a href='#Contact-Page'>${data.aboutPage.aboutNavigation.contact}</a></li>
    `;

        // * Closes the nav when section is reached
        const links = aboutNavLinks.querySelectorAll("a");
        links.forEach((link) => {
          link.addEventListener("click", () => {
            navMenu.classList.remove("active"); // assumes navMenu is defined
          });
        });
      }

      //?========================About Main==============
      document.getElementById("title").innerText = data.aboutPage.main.title;
      document.getElementById("about-heading").innerText =
        data.aboutPage.main.heading;
      document.getElementById("about-description").innerText =
        data.aboutPage.main.desc;
      document.getElementById("download-resume").innerHTML =
        data.aboutPage.main.downloadBtn;

      //?========================Skills==================
      document.getElementById("skills-title").innerText =
        data.aboutPage.skill.title;
      document.getElementById("skills-desc").innerText =
        data.aboutPage.skill.desc;
      document.getElementById("skills-tags").innerHTML =
        data.aboutPage.skill.skills
          .map((tag) => `<span class="skillTag">${tag}</span>`)
          .join("");

      //?=====================Education====================
      document.getElementById("education-title").innerText =
        data.aboutPage.education.title;
      const educationContainer = document.querySelector(".education-cards");
      educationContainer.innerHTML = "";
      data.aboutPage.education.record.forEach((info) => {
        const card = document.createElement("div");
        card.classList.add("education-card");
        card.innerHTML = `
          <div class="education-headings">
            <h3 id="education-heading">${info.title}</h3>
            <p id="timePeriod">${info.time}</p>
          </div>
          <div class="education-from">
            <p id="institute">${info.institute}</p>
          </div>
          <div class="education-details">
            <p id="education-details">
             ${info.desc}
            </p>
          </div>`;
        educationContainer.append(card);
      });
      //?==============================Contact=============================
      document.getElementById("contact-heading").innerText =
        data.homePage.contact.heading;
      document.getElementById("contact-email").innerHTML =
        data.homePage.contact.emailText;
      document.getElementById("contact-resume").innerHTML =
        data.homePage.contact.resumeText;

      document.getElementById("Name-label").innerHTML =
        data.homePage.contact.name;
      document.getElementById("Email-label").innerText =
        data.homePage.contact.email;
      document.getElementById("Subject-label").innerText =
        data.homePage.contact.subject;
      document.getElementById("Message-label").innerText =
        data.homePage.contact.message;

      // Fixed: Just set the button text, don't create nested anchor
      sendMail.innerText = data.homePage.contact.submit;
    })
    .catch((err) => console.error(err));
}

//Update the button text on current Lang
function updateLangButton() {
  langToggleBtn.innerText = currentLang.toUpperCase();
  setLanguageClass(currentLang);
  document.documentElement.lang = currentLang;
}

//Reset the form after button is pressed
function resetForm() {
  document.getElementById("Name").value = "";
  document.getElementById("Email").value = "";
  document.getElementById("Subject").value = "";
  document.getElementById("Message").value = "";
}

// Contact Form Submit - Fixed Implementation

sendMail.addEventListener("click", () => {
  const name = document.getElementById("Name").value;
  const email = document.getElementById("Email").value;
  const subject = document.getElementById("Subject").value;
  const message = document.getElementById("Message").value;

  // Validate form fields
  if (!name || !email || !subject || !message) {
    alert("Please fill in all fields");
    return;
  }

  // Construct mailto Link
  const mailtoLink = `mailto:shashankinjapan@gmail.com?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
  )}`;

  // Open mailto link
  sendMail.href = mailtoLink;
  resetForm();
});

// Language Toggle
const langToggleBtn = document.querySelector(".lang-toggle");
langToggleBtn.addEventListener("click", () => {
  // Toggle the Current Language
  currentLang = currentLang === "en" ? "jp" : "en";

  //  Update Button Text
  updateLangButton();
  loadContent(currentLang);
});

// Initial Load
updateLangButton();
loadContent(currentLang);
