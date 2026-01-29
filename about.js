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