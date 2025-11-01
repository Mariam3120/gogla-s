//hero-block-ის სექციის სლაიდერი
document.addEventListener("DOMContentLoaded", function () {
  let wrapper = document.getElementById("wrapper");
  let topLayer = wrapper.querySelector(".top");
  let handle = wrapper.querySelector(".handle");
  let skewed = 0;
  let delta = 0;

  if (wrapper.className.indexOf("skewed") != -1) {
    skew = 1000;
  }
  wrapper.addEventListener("mousemove", function (e) {
    delta = (e.clientX - window.innerWidth / 2) * 0.5;

    handle.style.left = e.clientX + delta + "px";

    topLayer.style.width = e.clientX + skew + delta + "px";
  });
});

//რესპონსივში (header) ჰამბურგერზე დაკლიკებისას გამოჩენა მენიუსი და კლასის დამატება
function toggleMobileNav() {
  const nav = document.querySelector(".main-nav");
  nav.classList.toggle("nav-open");
}

//კატეგორიების ფილტრაცია::::
// ყველა filter ღილაკი
const filterLinks = document.querySelectorAll(".f-list a");
// ყველა ბარათი
const wineCards = document.querySelectorAll(".grid-3-cols");

filterLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault(); // გვერდის გადატვირთვის თავიდან ასაცილებლად

    const filter = this.getAttribute("data-filter");

    // active კლასის განახლება ვიზუალურადაც რო გამოჩნდეს
    filterLinks.forEach((l) => l.classList.remove("active"));
    this.classList.add("active");

    // ფილტრაცია
    wineCards.forEach((card) => {
      const category = card.getAttribute("data-category");
      if (filter === "all" || category === filter) {
        card.classList.remove("hidden");
      } else {
        card.classList.add("hidden");
      }
    });
  });
});

//მთავარი სექციის დეტალების ფანჯრის გახსნა
// Cards და Modal ელემენტები
const cards = document.querySelectorAll(".grid-3-cols");
const modal = document.getElementById("wineModal");
const modalImage = document.getElementById("modal-image");
const modalName = document.getElementById("modal-name");
const modalDesc = document.getElementById("modal-description");
const modalPrice = document.getElementById("modal-price");
const closeBtn = document.querySelector(".close-btn");

// თითოეულ card-ზე listener
cards.forEach((card) => {
  const overlay = card.querySelector(".overlay");

  // ✅ შევამოწმოთ overlay არსებობს თუ არა (safety check)
  if (overlay) {
    overlay.addEventListener("click", (e) => {
      e.stopPropagation(); // ✅ bubble-up-ის თავიდან აცილება

      // Data წამოღება
      modalImage.src = card.dataset.image;
      modalName.textContent = card.dataset.name;
      modalDesc.textContent = card.dataset.description;
      modalPrice.textContent = card.dataset.price;

      // Modal გახსნა
      modal.style.display = "flex";
      document.body.style.overflow = "hidden"; // ✅ scroll გაყინვა
    });
  }
});

// Close button
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
  document.body.style.overflow = "auto"; // ✅ scroll დაბრუნება
});

// Background click
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }
});

// ✅ ESC key დახურვა (bonus)
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.style.display === "flex") {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }
});
