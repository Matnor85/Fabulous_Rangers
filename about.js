/* Sustainability, Technology, and Facilities Tab Panel */
const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);

const featureTabs = document.querySelectorAll(".feature-tab");

const pill = document.querySelector(".tab-panel-pill");

let selectedTabIndex = Array.from(featureTabs).findIndex(tab => tab.classList.contains("selected"));
if(selectedTabIndex === -1)
    selectedTabIndex = 0;

placePillOnTab(selectedTabIndex);

const breakpoint = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--feature-category-tab-panel-breakpoint"));
const mq = window.matchMedia(`(max-width: ${breakpoint}px)`);

// Place the pill on a tab without a transition
function placePillOnTab(index, animate = false) {
    const tab = featureTabs[index];
    const dx = tab.offsetLeft / rootFontSize;
    const dy = tab.offsetTop / rootFontSize;

    const previousTransition = pill.style.transition;
    pill.style.transition = animate ? previousTransition : "none";

    pill.style.transform = `translate(${dx}rem, ${dy}rem)`;

    // Force reflow if no animation, to place pill without transform
    if (!animate) pill.offsetHeight;

    pill.style.transition = previousTransition;
}

window.addEventListener("resize", () => {
    // Move the pill in case the resize has triggered a layout change
    placePillOnTab(selectedTabIndex);
});

featureTabs.forEach((tab, i) => {
    tab.addEventListener("click", () => {
        if (i === selectedTabIndex) return;
        placePillOnTab(i, true);
        selectedTabIndex = i;
    });
});

/* Contact Us Form */
const contactUsForm = document.getElementById("contact-us-form");

const displayFormButton = document.getElementById("display-form-button");

const submissionConfirmationOverlay = document.getElementById("submission-confirmation-overlay");

contactUsForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Toggle on the displaying of the submission confirmation overlay
    submissionConfirmationOverlay.classList.toggle("active");

    // Empty all the fields that may have user input
    contactUsForm.querySelectorAll("input, textarea").forEach(el => {
        el.value = "";
    });
});

displayFormButton.addEventListener("click", (e) => {
    e.preventDefault();

    // Toggle off the displaying of the submission confirmation overlay
    submissionConfirmationOverlay.classList.toggle("active");
});