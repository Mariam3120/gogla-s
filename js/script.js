//--------------hero-block-ის -------სექციის სლაიდერი
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

//რესპონსივში (header) -----ჰამბურგერზე დაკლიკებისას გამოჩენა მენიუსი და კლასის დამატება
function toggleMobileNav() {
  const nav = document.querySelector(".main-nav");
  nav.classList.toggle("nav-open");
}

// -----------SEARCH------------
const wineCards = document.querySelectorAll(".grid-3-cols"); //ეს ცვლადი მაქვს ქვემოთ filter-ებთანაც
const input = document.getElementById("search");

input.addEventListener("input", function () {
  wineCards.forEach((card) => {
    const name = card.getAttribute("data-name");
    if (name.includes(input.value)) {
      card.classList.remove("hidden");
    } else {
      card.classList.add("hidden");
    }
  });
});

//-----------კატეგორიების ფილტრაცია------------::::
// ყველა filter ღილაკი
const filterLinks = document.querySelectorAll(".f-list a");
console.log("1", filterLinks);
// ყველა ბარათი

filterLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault(); // გვერდის გადატვირთვის თავიდან ასაცილებლად
    console.log("2", link);
    const filter = this.getAttribute("data-filter");
    console.log("3", filter);
    // active კლასის განახლება ვიზუალურადაც რო გამოჩნდეს
    filterLinks.forEach((l) => l.classList.remove("active"));
    this.classList.add("active");
    console.log("4", this);

    // ფილტრაცია
    wineCards.forEach((card) => {
      const category = card.getAttribute("data-category");
      console.log("5", category);
      if (filter === "all" || category === filter) {
        card.classList.remove("hidden");
      } else {
        card.classList.add("hidden");
      }
    });
  });
});

//------------მთავარი სექციის დეტალების ფანჯრის გახსნა--------------
// // Cards და Modal ელემენტები
// const cards = document.querySelectorAll(".grid-3-cols");
// const modal = document.getElementById("wineModal");
// const modalImage = document.getElementById("modal-image");
// const modalName = document.getElementById("modal-name");
// const modalDesc = document.getElementById("modal-description");
// const modalPrice = document.getElementById("modal-price");
// const closeBtn = document.querySelector(".close-btn");

// // თითოეულ card-ზე listener
// cards.forEach((card) => {
//   const overlay = card.querySelector(".overlay");
//   // შევამოწმოთ overlay არსებობს თუ არა (safety check)
//   if (overlay) {
//     overlay.addEventListener("click", (e) => {
//       e.stopPropagation(); // bubble-up-ის თავიდან აცილება

//       // Data წამოღება
//       if (card.dataset.image) {
//         modalImage.src = card.dataset.image;
//       }
//       // modalImage.src = card.dataset.image;
//       modalName.textContent = card.dataset.name;
//       modalDesc.textContent = card.dataset.description;
//       modalPrice.textContent = card.dataset.price;

//       // Modal გახსნა
//       modal.style.display = "flex";
//       document.body.style.overflow = "hidden"; // scroll გაყინვა
//     });
//   }
// });

// Cards და Modal ელემენტები
const cards = document.querySelectorAll(".grid-3-cols");
const modal = document.getElementById("wineModal");
const modalImage = document.getElementById("modal-image");
const modalName = document.getElementById("modal-name");
const modalDesc = document.getElementById("modal-description");
const modalPrice = document.getElementById("modal-price");
const closeBtn = document.querySelector(".close-btn");

// ენის ამოცნობა (რომელი აქტიურია)
function getActiveLang() {
  const active = document.querySelector(".language a.active");
  return active ? active.id : "geo"; // ნაგულისხმევად ქართული
}

// თითოეულ card-ზე listener
cards.forEach((card) => {
  const overlay = card.querySelector(".overlay");
  if (overlay) {
    overlay.addEventListener("click", (e) => {
      e.stopPropagation();

      const lang = getActiveLang();

      // Data წამოღება
      if (card.dataset.image) {
        modalImage.src = card.dataset.image;
      }
      modalName.textContent = card.dataset.name;

      // ენის მიხედვით აღწერის ამოღება
      const descKey = `description${lang === "geo" ? "" : "-" + lang}`;
      modalDesc.textContent = card.dataset[descKey] || card.dataset.description;

      modalPrice.textContent = card.dataset.price;

      // Modal გახსნა
      modal.style.display = "flex";
      document.body.style.overflow = "hidden";
    });
  }
});



// Close button
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
  document.body.style.overflow = "auto"; // scroll დაბრუნება
});

// Background click
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }
});

//  ESC key დახურვა (bonus)
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.style.display === "flex") {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }
});

// ---------------CART PRICE ADDED-----------

// const buttons = document.querySelectorAll(".add-to-cart-btn");
// const cartCount = document.querySelector(".cart-count");

// let total = 0;

// buttons.forEach((button) => {
//   button.addEventListener("click", function () {
//     const card = this.closest(".grid-3-cols");
//     const priceText = card.querySelector(".price").textContent;
//     const price = parseFloat(priceText);

//     if (!isNaN(price)) {
//       total += price;
//       cartCount.textContent = total.toFixed(2) + " ლ";
//     }
//   });
// });

const buttons = document.querySelectorAll(".add-to-cart-btn");
const cartCount = document.querySelector(".cart-count");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

updateCartCount();
//localStorage.getItem("cart")მომიტანე cart სახელით შენახული ინფორმაცია localStorage-დან|localStorage მხოლოდ ტექსტს (string) ინახავს, კალათა კი ობიექტების სიაა |JSON.parse() ტექსტს გარდაქმნის ისევ რეალურ მასივად (array), რომ შევძლო მუშაობა JS-ში.
//ან თუ არაფერი არსებობს შენახული (null არის), მაშინ გამოიყენე ცარიელი მასივი []
//შექმენი ცვლადი cart, რომლის შიგნით იქნება ან localStorage-დან ამოღებული კალათა, ან ცარიელი მასივი, თუ ჯერ არაფერი გაქვს შენახული
// buttons -რა მოხდეს თითო ღილაკზე, საჭიროა თითოეულზე მოუსმინო ცალ-ცალკე.
//this — არის იმ ღილაკის ელემენტი. .closest(selector) — ავა DOM–ში ზემოთ (parent-ები), სანამ იპოვის bestmatching ელემენტს (.grid-3-cols).
// const name = ...data-name ->ამით ვამოწმებთ, უკვე არის თუ არა კალათაში ეს პროდუქტი.
//card.querySelector(".price") — ეძებს იმ ბარათის შიგნით .price/ .textContent — წაკითხვს ამ ელემენტის ტექსტს
//const price = parseFloat(priceText); parseFloat ვიღებთ სტრინგიდან ნუმერულ მნიშვნელობას
//const image = card.querySelector("img").getAttribute("src") - გვინდა კალათის გვერდზე სურათი ვაჩვენოთ — ამიტომ vინახავთ ობიექტში image-ს.
//isNaN(price) — შეამოწმებს არის თუ არა price Not-a-Number. თუ არის NaN, return-ით ვთიშავთ ამ callback-ის შესრულებას (არ ვაგრძელებთ), რადგან ფასი არასწორია და დამატება არ უნდა მოხდეს.
//const existingItem = cart.find((item) => item.name === name); cart არის შესანახი მასივი (დარეგისტრირებული  let cart = JSON.parse(localStorage.getItem("cart")) || [];). .find(...) ეძებს პირველ ელემენტს, რომლის item.name ემთხვევა ამ ბარათის name-ს. შედეგი: existingItem იქნება ან ობიექტი (თუ უკვე არის), ან undefined (თუ ახალია).
//localStorage მხოლოდ strings-ს ინახავს. ჩვენ გვინდა შეინახოს მთელი cart array. ამიტომ ვაქცევთ მას ტექსტად JSON.stringify(cart) და ვქაჩავთ localStorage-ში სახელით "cart".
buttons.forEach((button) => {
  button.addEventListener("click", function () {
    const card = this.closest(".grid-3-cols");
    const name = card.getAttribute("data-name");
    const priceText = card.querySelector(".price").textContent;
    const price = parseFloat(priceText);
    const image = card.querySelector("img").getAttribute("src");

    if (isNaN(price)) return;

    // შევამოწმოთ — ეს პროდუქტი უკვე კალათაშია თუ არა
    const existingItem = cart.find((item) => item.name === name);

    if (existingItem) {
      existingItem.quantity += 1; // თუ არის — რაოდენობას ვუმატებთ
    } else {
      cart.push({
        name: name,
        price: price,
        image: image,
        quantity: 1,
      });
    }

    // localStorage-ში შენახვა (ჩაწერე კარტა)
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
  });
});

function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = count; //cartCount არის HTML ელემენტი, რომელიც მოიძებნა კლასით .cart-count,როცა პროდუქტი ემატება ან იშლება, ჩვენ ამ ელემენტში ცვლით ტექსტს,ვაწერთ ახალი რაოდენობის რიცხვს (count)
}
//reduce() — ეს მეთოდი მასივზე გადის ელემენტ-ელემენტ და აგროვებს ერთ საბოლოო მნიშვნელობას (ჩვენს შემთხვევაში ჯამს).
//array.reduce((accumulator, currentValue) => ..., initialValue); accumulator (ჩვენთან sum) — შიგნით აგროვებს შედეგს. currentValue (ჩვენთან item) — ყოველი პროდუქტი მასივიდან. initialValue — საწყისი მნიშვნელობაა (0), რომ თავიდანვე დავიწყოთ ნულიდან დათვლა.
//ფუნქცია აკეთებს: sum + item.quantity (ეს sum არის 0 რომელიც ბოლოში მიწერია)

// -----------ენის გადამრთველი-------------
document.addEventListener("DOMContentLoaded", () => {
  const langLinks = document.querySelectorAll(".language a");
  const elementsToTranslate = document.querySelectorAll("[data-translate]");
  const defaultLang = "geo"; // ნაგულისხმევი ენა

  // უსაფრთხო fetch და JSON parsing
  async function loadLangFile(lang) {
    try {
      const res = await fetch(`./languages/${lang}.json`);
      if (!res.ok)
        throw new Error(
          `Failed to load languages/${lang}.json (status ${res.status})`
        );
      const data = await res.json();
      return data;
    } catch (err) {
      console.error("Language load error:", err);
      return null;
    }
  }

  async function setLanguage(lang) {
    const data = await loadLangFile(lang);
    if (!data) return; // თუ ვერ ჩაიტვირთა, აღარ ვცდილობთ შეცვლას

    elementsToTranslate.forEach((el) => {
      const key = el.getAttribute("data-translate");
      if (!key) return;
      // თუ key არ არსებობს JSON-ში
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        el.textContent = data[key];
      } else {
        console.warn(`Missing translation for key "${key}" in ${lang}.json`);
      }
    });

    

    // --- ბარათების აღწერის(description) თარგმნა ---
    const cards = document.querySelectorAll(".grid-3-cols");

    cards.forEach((card) => {
      const descGeo = card.getAttribute("data-description-geo");
      const descEng = card.getAttribute("data-description-eng");

      if (lang === "geo" && descGeo) {
        card.setAttribute("data-description", descGeo);
      } else if (lang === "eng" && descEng) {
        card.setAttribute("data-description", descEng);
      }
    });

    // active კლასი ღილაკზე (ვიზუალური გამოყოფა)
    langLinks.forEach((link) => {
      link.classList.toggle("active", link.id === lang);
    });
  }

  // ღილაკებს კლიკს ვუსმენთ
  langLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const id = link.id; // geo ან eng
      if (!id) {
        console.warn("Language link has no id:", link);
        return;
      }
      setLanguage(id);
    });
  });

  // initialize with default language
  setLanguage(defaultLang);
});
