const navToggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    document.body.classList.toggle("nav-open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      nav.classList.remove("is-open");
      document.body.classList.remove("nav-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("[data-lightbox-image]");
const lightboxClose = document.querySelector("[data-lightbox-close]");

document.querySelectorAll("[data-lightbox-src]").forEach((button) => {
  button.addEventListener("click", () => {
    if (!(lightbox instanceof HTMLDialogElement) || !(lightboxImage instanceof HTMLImageElement)) {
      return;
    }

    lightboxImage.src = button.dataset.lightboxSrc || "";
    lightboxImage.alt = button.dataset.lightboxAlt || "Chair rental photo";
    lightbox.showModal();
  });
});

if (lightboxClose && lightbox instanceof HTMLDialogElement) {
  lightboxClose.addEventListener("click", () => lightbox.close());
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      lightbox.close();
    }
  });
}

const quoteForm = document.querySelector("#quoteForm");
const quoteOutput = document.querySelector("#quoteOutput");

if (quoteForm instanceof HTMLFormElement && quoteOutput instanceof HTMLOutputElement) {
  quoteForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(quoteForm);
    const getValue = (key, fallback) => String(formData.get(key) || fallback).trim();

    const message = [
      "Hi, I would like to check event rental availability in Winnipeg.",
      "",
      `Name: ${getValue("name", "Not provided")}`,
      `Event date: ${getValue("date", "Not provided")}`,
      `Number of chairs: ${getValue("chairs", "Not provided")}`,
      `Number of tables: ${getValue("tables", "Not provided")}`,
      `Event type: ${getValue("eventType", "Not sure yet")}`,
      `Event area: ${getValue("location", "Not provided")}`,
      `Pickup or delivery: ${getValue("delivery", "Not sure yet")}`,
      `Notes: ${getValue("notes", "None")}`
    ].join("\n");

    quoteOutput.hidden = false;
    quoteOutput.value = message;
    quoteOutput.textContent = message;
    window.location.href = `mailto:hassannauman_1@hotmail.com?subject=${encodeURIComponent("Winnipeg event rental booking request")}&body=${encodeURIComponent(message)}`;
    quoteOutput.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
}

// Cloud Resume Challenge #7: display the DynamoDB-backed visit count.
// Replace the placeholder with your Lambda Function URL (ending in on.aws/).
const VISITOR_COUNTER_API_URL = "https://erecbaoamlf72frtggqkjmdjva0uvaiv.lambda-url.us-east-1.on.aws/";

async function loadVisitorCounter() {
  const counter = document.querySelector("[data-visitor-counter]");
  const countElement = document.querySelector("[data-visitor-count]");
  if (!counter || !countElement || !VISITOR_COUNTER_API_URL.startsWith("https://")) return;

  try {
    const response = await fetch(VISITOR_COUNTER_API_URL, { method: "GET" });
    if (!response.ok) throw new Error(`Visitor counter returned HTTP ${response.status}`);

    // Accept a Lambda JSON number, or an object containing { views: number }.
    const payload = await response.json();
    const views = typeof payload === "number" ? payload : payload?.views;
    if (!Number.isSafeInteger(views) || views < 0) throw new Error("Invalid visitor count response");

    countElement.textContent = new Intl.NumberFormat("en-CA").format(views);
    counter.hidden = false;
  } catch (error) {
    // The rest of the website must work even if the API is unavailable.
    console.warn("Visitor counter unavailable:", error);
  }
}

loadVisitorCounter();
