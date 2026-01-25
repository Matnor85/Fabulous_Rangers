/*
   Hantering av bokningsformulär
   Funktioner: Dynamiska datumfält, datumvalidering och visuell felhantering.
   */

document.addEventListener("DOMContentLoaded", () => {
  // --- 1. Initiering ---
  const form = document.querySelector(".grid-form");
  const checkinInput = document.getElementById("check-in");
  const checkoutInput = document.getElementById("check-out");

  // Samlar datumfälten i en array för att kunna applicera samma logik på båda smidigt
  const dateInputs = [checkinInput, checkoutInput];

  // Sätter dagens datum som "minimum" för incheckning och hindrar bokning bakåt i tiden
  // ISO-formatet (YYYY-MM-DD) krävs för HTML datumfält
  const today = new Date().toISOString().split("T")[0];
  checkinInput.setAttribute("min", today);

  // --- 2. Hantering av datumfält text till datum-växling ---
  dateInputs.forEach((input) => {
    // När man klickar så ska det växla till 'date' för att visa kalendern
    input.addEventListener("click", function () {
      this.type = "date";

      // Döljer kalenderikonen i webbläsare som annars visar den över datumväljaren
      this.style.setProperty("-webkit-appearance", "none", "important");

      // showPicker() öppnar kalenderfönstret automatiskt i moderna webbläsare
      if ("showPicker" in HTMLInputElement.prototype) {
        this.showPicker();
      }
    });

    // När fältet tappar fokus: Om inget datum valts, växla tillbaks till "text"
    // Detta gör att placeholdern "Pick a date" visas igen
    input.addEventListener("blur", function () {
      if (!this.value) {
        this.type = "text";
      }
    });

    // Tar bort röd felmarkering så fort användaren ändrar något
    input.addEventListener("change", () => {
      input.classList.remove("error");
      const msg = input.parentElement.querySelector(".error-message");
      if (msg) msg.remove();
    });
  });

  // --- 3. Datum-logik incheckning och utcheckning ---
  checkinInput.addEventListener("change", () => {
    if (checkinInput.value) {
      // Gör det omöjligt att välja en utcheckning som ligger före incheckningen
      checkoutInput.setAttribute("min", checkinInput.value);

      // Om användaren redan valt en utcheckning som nu blir ogiltig så rensar vi den
      if (checkoutInput.value && checkoutInput.value < checkinInput.value) {
        checkoutInput.value = "";
        checkoutInput.type = "text"; // Återställ placeholder
      }
    }
  });

  // --- 4. Formulärvalidering. Vid "Book now" ---
  form.addEventListener("submit", (event) => {
    // Stoppar formuläret från att skickas till servern innan vi kontrollerat allt
    event.preventDefault();

    // Rensa alla tidigare felmeddelanden och röda ramar som kan finnas
    document
      .querySelectorAll(".error")
      .forEach((el) => el.classList.remove("error"));
    document.querySelectorAll(".error-message").forEach((el) => el.remove());

    let hasErrors = false;

    // Definition av fält som krävs och deras specifika felmeddelanden
    const fields = [
      { id: "check-in", msg: "Select check-in" },
      { id: "check-out", msg: "Select check-out" },
    ];

    // Loopar igenom varje fält för att se om det är ifyllt
    fields.forEach((field) => {
      const input = document.getElementById(field.id);
      if (!input.value || input.value === "") {
        hasErrors = true;

        // Lägg till röd ram på fältet
        input.classList.add("error");

        // Skapa och placera felmeddelandet under fältet
        const errorDiv = document.createElement("span");
        errorDiv.className = "error-message";
        errorDiv.innerText = field.msg;

        // Lägger till meddelandet i .filter-group containern
        input.parentElement.appendChild(errorDiv);
      }
    });

    // Om inga fel hittades så godkänn bokningen
    if (!hasErrors) {
      // Hitta main-containern där rummen ska visas
      const mainContent = document.querySelector(".display-items");

      // Ta bort hidden-klassen så att rummen visas
      mainContent.classList.remove("hidden");

      // Scrolla mjukt ner till resultaten så användaren ser att något hände
      mainContent.scrollIntoView({ behavior: "smooth" });

      // För att logga i konsolen
      console.log("Validation passed, showing rooms.");
    } else {
      // Om datum inte är ifyllda så blir det fel, ser till att main är dold.
      document.querySelector(".display-items").classList.add("hidden");
    }
  });
});
