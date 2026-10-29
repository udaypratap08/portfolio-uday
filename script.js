/*----------------togle icon navbar---------*/
let menuicon= document.querySelector("#menu-icon")
let navbar=document.querySelector(".navbar")
menuicon.addEventListener("click",()=>{
       menuicon.classList.toggle('fa-xmark')
       navbar.classList.toggle('active')
})

/*----------------scrool section active link---------*/

let sections= document.querySelectorAll('section')
let navlinks= document.querySelectorAll('header nav a')
window.onscroll= ()=>{
    
    sections.forEach(sec =>{
        let top= window.scrollY;
        let offset= sec.offsetTop-150;
        let height=sec.offsetHeight;
        let id= sec.getAttribute('id')

        if(top >= offset && top < offset + height){
            navlinks.forEach(links =>{
                links.classList.remove('active')
                document.querySelector('header nav a[href="#' + id + '"]').classList.add('active');
            });
        };
    });

    /*---------------------sticky navbar--------------*/

    let header= document.querySelector('header')
    header.classList.toggle('sticky', window.scrollY > 100)

    /*----------------remove toggle icon and navbar--------*/
    menuicon.classList.remove('fa-xmark')
    navbar.classList.remove('active')
}

   /*----------------scrool reveal (behaivour)--------*/
   ScrollReveal({
     distance:'80px',
     duration: 2000,
     delay: 200,
    });

    ScrollReveal().reveal('.home-content, .heading, .skills,.heading,.education-header', { origin: 'top' });
    ScrollReveal().reveal('.home-img, .services-container, .project-box, .contact form,.contact-form-card,.contact-form,footer,.skill-card', { origin: 'bottom' });
    ScrollReveal().reveal('.home-content h1, .about-img, .contact-content,.education-timeline', { origin:'left' });
    ScrollReveal().reveal('.home-content p, .about-content,.education-item', { origin: 'right' });
 

     /*----------------name typed (typed js)--------*/

     const typed= new Typed('.multiple-text',{
        strings:['Fullstack Developer', 'Web Developer','MERN STACK Developer','App Developer'],
        typeSpeed:70,
        backSpeed:70,
        backDelay:2000,
        loop:true,
     });

     /* --------Skill filter logic-------*/
     
/* Skills category filtering */
document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".skill-filter");
  const skillCards = document.querySelectorAll(".skill-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedFilter = button.dataset.filter;

      filterButtons.forEach((item) => {
        const isActive = item === button;
        item.classList.toggle("active", isActive);
        item.setAttribute("aria-pressed", String(isActive));
      });

      skillCards.forEach((card) => {
        const shouldShow =
          selectedFilter === "all" ||
          card.dataset.category === selectedFilter;

        card.hidden = !shouldShow;
      });
    });
  });
});

/* ==================================
   PROJECT DETAILS MODAL + GALLERY
================================== */

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.querySelector("#project-modal");
  const modalContent = modal?.querySelector(".project-modal-content");
  const closeButton = document.querySelector("#project-modal-close");

  const titleElement = document.querySelector("#modal-project-title");
  const descriptionElement = document.querySelector(
    "#modal-project-description"
  );

  const mainImage = document.querySelector("#modal-project-image");
  const gallery = document.querySelector("#modal-project-gallery");

  const techContainer = document.querySelector("#modal-project-tech");

  const featuresContainer = document.querySelector(
  "#modal-project-features"
);

  const githubLink = document.querySelector("#modal-github-link");
  const demoLink = document.querySelector("#modal-demo-link");

  if (
    !modal ||
    !modalContent ||
    !closeButton ||
    !titleElement ||
    !descriptionElement ||
    !mainImage ||
    !gallery ||
    !techContainer ||
    !githubLink ||
    !demoLink
  ) {
    console.error("Project modal HTML is incomplete.");
    return;
  }

  /*
    HAR PROJECT KE 8 SCREENSHOTS.

    Agar  image files PNG hain, to ".jpg"
    ko ".png" se replace karna.
  */

  const projectScreenshots = {
    edemy: Array.from(
      { length: 9 },
      (_, index) =>
        `image/projects/edemy/screenshot${index + 1}.png`
    ),

    job_portal: Array.from(
      { length: 9 },
      (_, index) =>
        `image/projects/job_portal/screenshot${index + 1}.png`
    ),

    ai_assistant: Array.from(
      { length: 9 },
      (_, index) =>
        `image/projects/ai_assistant/screenshot${index + 1}.png`
    ),
  };

  let lastFocusedElement = null;

  /* Check if a project link is valid */

  function isValidProjectLink(link) {
    if (!link) return false;

    const href = link.getAttribute("href");

    return Boolean(
      href &&
      href !== "#" &&
      !href.toLowerCase().startsWith("javascript:")
    );
  }

  /* Set GitHub and Live Demo links */

  function setModalLink(modalLink, cardLink) {
    if (isValidProjectLink(cardLink)) {
      modalLink.href = cardLink.href;
      modalLink.hidden = false;
      modalLink.removeAttribute("aria-disabled");
      modalLink.removeAttribute("tabindex");
    } else {
      modalLink.removeAttribute("href");
      modalLink.hidden = true;
      modalLink.setAttribute("aria-disabled", "true");
      modalLink.setAttribute("tabindex", "-1");
    }
  }

  /* Change the large screenshot */

  function selectScreenshot(imagePath, thumbnailButton) {
    mainImage.src = imagePath;
    mainImage.alt = `${titleElement.textContent} screenshot`;

    gallery.querySelectorAll(".project-modal-thumbnail").forEach(
      (thumbnail) => {
        const isActive = thumbnail === thumbnailButton;

        thumbnail.classList.toggle("active", isActive);
        thumbnail.setAttribute("aria-pressed", String(isActive));
      }
    );
  }

  /* Build the 8 screenshot thumbnails */

  function renderGallery(projectKey) {
    gallery.replaceChildren();

    const screenshots = projectScreenshots[projectKey] || [];

    screenshots.forEach((imagePath, index) => {
      const thumbnailButton = document.createElement("button");

      thumbnailButton.type = "button";
      thumbnailButton.className = "project-modal-thumbnail";
      thumbnailButton.setAttribute(
        "aria-label",
        `Show screenshot ${index + 1}`
      );
      thumbnailButton.setAttribute("aria-pressed", "false");

      const thumbnailImage = document.createElement("img");

      thumbnailImage.src = imagePath;
      thumbnailImage.alt = `Screenshot ${index + 1}`;
      thumbnailImage.loading = "lazy";

      thumbnailImage.addEventListener("error", () => {
        console.warn("Screenshot not found:", imagePath);
        thumbnailButton.hidden = true;
      });

      thumbnailButton.appendChild(thumbnailImage);

      thumbnailButton.addEventListener("click", () => {
        selectScreenshot(imagePath, thumbnailButton);
      });

      gallery.appendChild(thumbnailButton);
    });

    const firstThumbnail = gallery.querySelector(
      ".project-modal-thumbnail"
    );

    if (firstThumbnail) {
      selectScreenshot(screenshots[0], firstThumbnail);
    }
  }

  /* Open project details */

  function openProjectModal(button) {
    const projectCard = button.closest(".project-box");

    if (!projectCard) {
      console.error("Project card .project-box not found.");
      return;
    }

    const projectKey = button.dataset.project;

    if (!projectScreenshots[projectKey]) {
      console.error("Project screenshots not configured:", projectKey);
      return;
    }

    const title = projectCard.querySelector(
      ".project-card-content h3"
    );

    const description = projectCard.querySelector(
      ".project-card-content p"
    );

    

    const technologies = projectCard.querySelectorAll(
      ".project-tech span"
    );

    const cardGithubLink = projectCard.querySelector(".github-link");
    const cardDemoLink = projectCard.querySelector(".demo-link");

    /* Project title and description */

    titleElement.textContent =
      title?.textContent.trim() || "Project Details";

    descriptionElement.textContent =
      description?.textContent.trim() ||
      "Project description is not available.";

      const projectFeatures = {
  edemy: [
    "Student and educator authentication",
    "Course browsing and details",
    "Course enrollment and learning",
    "Educator course management",
    "Online payment with Stripe in test mode",
    "Video-based learning",
    "Student progress tracking",
    "Cloudinary media management"
  ],

  job_portal: [
    "Job Search: Browse and search available job openings",
    "Online Applications: Apply for jobs directly through the platform.",
    "Resume Upload: Upload resumes to the job seeker's profile.",
    "User Authentication: Secure sign-in and authentication using Clerk.",
    "Recruiter Dashboard: Dedicated dashboard for recruiters.",
    "Application Management: Review, accept, or reject applications.",
    "Resume Review: View applicants' resumes.",
    "Job Management: Publish and manage job postings."
  ],

  ai_assistant: [
    "Users can interact with the assistant using voice commands.",
    "The assistant responds to users through speech.",
    "Provides intelligent responses to user queries.",
    "Secure user login and authentication.",
    "Handles user conversations and assistant responses.",
    "Supports interactive communication between the user and assistant.",
    "User-friendly interface built with React.js.",
    "Uses MongoDB, Express.js, React.js, and Node.js for full-stack development."
  ]
};

    /* Technologies */

    techContainer.replaceChildren();

    technologies.forEach((technology) => {
      const tag = document.createElement("span");

      tag.textContent = technology.textContent.trim();

      techContainer.appendChild(tag);
    });

    // Display project-specific key features
featuresContainer.replaceChildren();

const features = projectFeatures[projectKey] || [];

features.forEach((feature) => {
  const item = document.createElement("li");
  item.textContent = feature;
  featuresContainer.appendChild(item);
});

    /* Project links */

    setModalLink(githubLink, cardGithubLink);
    setModalLink(demoLink, cardDemoLink);

    /* Project screenshots */

    renderGallery(projectKey);

    /* Display modal */

    lastFocusedElement = button;

    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");

    document.body.classList.add("modal-open");

    closeButton.focus();
  }

  /* Close modal */

  function closeProjectModal() {
    if (!modal.classList.contains("active")) return;

    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");

    document.body.classList.remove("modal-open");

    if (lastFocusedElement) {
      lastFocusedElement.focus();
    }
  }

  /* Connect every View Details button */

  document.querySelectorAll(".project-details-link").forEach(
    (button) => {
      button.addEventListener("click", () => {
        openProjectModal(button);
      });
    }
  );

  /* Close button */

  closeButton.addEventListener("click", closeProjectModal);

  /* Close when clicking outside the modal content */

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeProjectModal();
    }
  });

  /* Close with Escape key */

  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      modal.classList.contains("active")
    ) {
      closeProjectModal();
    }
  });
});

/*-------Contact form ka data submit hone par email me jayega-----*/


const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const submitButton = document.getElementById("contactSubmit");
    const status = document.getElementById("contactStatus");
    const buttonText = submitButton.querySelector("span");

    // Prevent multiple submissions
    submitButton.disabled = true;
    buttonText.textContent = "Sending...";
    status.textContent = "";

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: new FormData(contactForm)
      });

      const result = await response.json();

      if (response.ok && result.success) {
        status.textContent = "Message sent successfully!";
        status.style.color = "#00e5ff";
        contactForm.reset();
      } else {
        status.textContent =
          result.message || "Message could not be sent. Please try again.";
        status.style.color = "#ff6b6b";
      }
    } catch (error) {
      status.textContent =
        "Network error. Please check your internet and try again.";
      status.style.color = "#ff6b6b";
    } finally {
      submitButton.disabled = false;
      buttonText.textContent = "Send Message";
    }
  });
}
