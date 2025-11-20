// შემოწმებაა
//--------------hero-block-ის -------სექციის სლაიდერი
document.addEventListener("DOMContentLoaded", function () {
  // შევამოწმო, არსებობს თუ არა 'wrapper' ამ გვერდზე
  let wrapper = document.getElementById("wrapper");
  if (!wrapper) {
    return; // თუ არ არსებობს, ვწყვეტთ ამ ბლოკის შესრულებას
  }

  // თუ wrapper არსებობს, მაშინ მის შიდა ელემენტებსაც ვეძებ
  let topLayer = wrapper.querySelector(".top");
  let handle = wrapper.querySelector(".handle");
  let skewed = 0;
  let delta = 0;

  // შემოწმება დავამატოთ topLayer-ზე და handle-ზეც, უსაფრთხოებისთვის.
  if (!topLayer || !handle) {
    console.error("Missing .top or .handle inside #wrapper");
    return;
  }

  if (wrapper.className.indexOf("skewed") != -1) {
    skew = 1000;
  }

  // თუ ყველაფერი კარგადაა, ვამაგრებთ event listener-ს
  wrapper.addEventListener("mousemove", function (e) {
    delta = (e.clientX - window.innerWidth / 2) * 0.5;

    handle.style.left = e.clientX + delta + "px";

    topLayer.style.width = e.clientX + skew + delta + "px";
  });
});

//----------რესპონსივში (header) -----ჰამბურგერზე დაკლიკებისას გამოჩენა მენიუსი და კლასის დამატება
function toggleMobileNav() {
  const nav = document.querySelector(".main-nav");
  nav.classList.toggle("nav-open");
}

//---------- SEARCH and კატეგორიების ფილტრაცია ერთად------------

document.addEventListener("DOMContentLoaded", () => {
  // ვეძებთ ყველა ძირითად ელემენტს, რომელიც ფილტრაციისთვისაა საჭირო:
  const wineCards = document.querySelectorAll(".grid-3-cols");
  const filterLinks = document.querySelectorAll(".f-list a");
  const input = document.getElementById("search");

  // უსაფრთხოების შემოწმება: თუ ბარათები არ არსებობს, ვჩერდებით.
  if (wineCards.length === 0) {
    return; // ამ გვერდზე ფილტრაცია შეუძლებელია
  }

  // გლობალური ფუნქცია: ბარათების ჩვენება/დამალვა

  function applyFilters() {
    // 1. მიიღე მიმდინარე აქტიური კატეგორიის ფილტრი
    const activeFilterLink = document.querySelector(".f-list a.active");
    const categoryFilter = activeFilterLink
      ? activeFilterLink.getAttribute("data-filter")
      : "all"; // თუ არცერთი არაა აქტიური, ნაგულისხმევად 'all'

    // 2. მიიღეთ ძებნის ტერმინი (თუ input არსებობს)
    const searchTerm = input ? input.value.toLowerCase() : "";

    // 3. გაიარე ყველა ბარათი და გადაწყვიტე, გამოჩნდეს თუ არა
    wineCards.forEach((card) => {
      const cardCategory = card.getAttribute("data-category");
      const cardName = card.getAttribute("data-name").toLowerCase();

      // კრიტერიუმი A: კატეგორია ემთხვევა?
      const categoryMatches =
        categoryFilter === "all" || cardCategory === categoryFilter;

      // კრიტერიუმი B: სახელი ემთხვევა ძებნის ტერმინს?
      const searchMatches = cardName.includes(searchTerm);

      // თუ ორივე კრიტერიუმი შესრულდა, ვაჩენთ ბარათს.
      if (categoryMatches && searchMatches) {
        card.classList.remove("hidden");
      } else {
        card.classList.add("hidden");
      }
    });
  }

  // 4. EVENT LISTENERS

  // Search input-ზე ცვლილება
  if (input) {
    input.addEventListener("input", applyFilters);
  }

  // კატეგორიის ლინკებზე კლიკი
  if (filterLinks.length > 0) {
    // ნაგულისხმევად პირველი ლინკი 'all' უნდა იყოს აქტიური
    // თუ არაფერი არ არის აქტიური, დაამატე 'active' კლასი 'all'-ზე
    if (!document.querySelector(".f-list a.active")) {
      filterLinks[0].classList.add("active");
    }

    filterLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();

        // აქტიური კლასის განახლება
        filterLinks.forEach((l) => l.classList.remove("active"));
        this.classList.add("active");

        // ფილტრაციის ფუნქციის გამოძახება
        applyFilters();
      });
    });
  }

  // გვერდის ჩატვირთვისას, პირველი ფილტრაციის გაშვება
  applyFilters();
});

//------------მთავარი სექციის დეტალების ფანჯრის გახსნა--------------
// // -----------CARDS და MODAL ელემენტები
// ნაწილი 1: მოდალის ლოგიკა (გვერდებზე, სადაც პროდუქციაა)
// null-ის შემოწმება, რო არ გამოიწვიოს შეცდომა გვერდებზე,
// სადაც ეს ელემენტები არ არსებობს (მაგ. contact.html)

const cards = document.querySelectorAll(".grid-3-cols");
const modal = document.getElementById("wineModal");

// მოდალი მხოლოდ იმ შემთხვევაში გაეშვება, თუ modal და cards არსებობს
if (modal && cards.length > 0) {
  const modalImage = document.getElementById("modal-image");
  const modalName = document.getElementById("modal-name");
  const modalDesc = document.getElementById("modal-description");
  const modalPrice = document.getElementById("modal-price");
  const closeBtn = document.querySelector(".close-btn");

  // აქტიური ენის ამოცნობა (LocalStorage-დან იღებს)
  function getActiveLang() {
    // წაიკითხეთ ენა LocalStorage-დან, ნაგულისხმევად გამოიყენე 'geo'
    return localStorage.getItem("currentLang") || "geo";
  }

  // თითოეულ ბარათზე listener
  cards.forEach((card) => {
    const overlay = card.querySelector(".overlay");
    if (!overlay) return;

    overlay.addEventListener("click", (e) => {
      e.stopPropagation();

      const lang = getActiveLang(); // LocalStorage-დან ენის აღება

      if (modalImage && card.dataset.image) modalImage.src = card.dataset.image;

      // 1. სათაურის თარგმნა 
      const nameToDisplay =
        lang === "geo"
          ? card.dataset.name // data-name (ქართული)
          : card.dataset.nameEng; // data-name-eng (ინგლისური)

      if (modalName) modalName.textContent = nameToDisplay || card.dataset.name;

      // 2. აღწერილობის თარგმნა 
      const descToDisplay =
        lang === "geo"
          ? card.dataset.descriptionGeo // data-description-geo (ქართული)
          : card.dataset.descriptionEng; // data-description-eng (ინგლისური)

      if (modalDesc)
        modalDesc.textContent = descToDisplay || card.dataset.descriptionGeo; // ნაგულისხმევად ქართული

      if (modalPrice) modalPrice.textContent = card.dataset.price;

      modal.style.display = "flex";
      document.body.style.overflow = "hidden";
    });
  });

  // დახურვის ლოგიკა
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    });

    window.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.style.display === "flex") {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
      }
    });
  }
}

// ---------------CART PRICE ADDED--------------------

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

//-------------ენის გადამრთველი--------------

// -----------------------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
  // ეს შემოწმება აფიქსირებს მეორე ერორს: Cannot read properties of null (reading 'querySelector')
  const langContainer = document.querySelector(".language");
  if (!langContainer) return; // თუ ამ გვერდზე .language არ არსებობს, ვაჩერებთ სკრიპტს

  const langLinks = langContainer.querySelectorAll("a");
  const elementsToTranslate = document.querySelectorAll("[data-translate]");
  const defaultLang = "geo";

  // ამოიღეთ ენა LocalStorage-დან ან გამოიყენეთ ნაგულისხმევი
  const currentLang = localStorage.getItem("currentLang") || defaultLang;

  // კოდი loadLangFile იგივე დარჩა...
  async function loadLangFile(lang) {
    try {
      // შეამოწმეთ სწორია თუ არა ფაილის გზა სხვადასხვა გვერდებიდან
      const res = await fetch(`languages/${lang}.json`);
      if (!res.ok) throw new Error(`Failed to load languages/${lang}.json`);
      return await res.json();
    } catch (err) {
      console.error("Language load error:", err);
      return null;
    }
  }

  async function setLanguage(lang) {
    const data = await loadLangFile(lang);
    if (!data) return;

    // 1. შეინახეთ არჩეული ენა LocalStorage-ში
    localStorage.setItem("currentLang", lang);

    // 2. ტექსტების თარგმნა
    elementsToTranslate.forEach((el) => {
      const key = el.getAttribute("data-translate");
      if (key && data[key]) el.textContent = data[key];
    });
    //  Placeholder-ების თარგმნა
    document.querySelectorAll("[data-translate-placeholder]").forEach((el) => {
      const key = el.getAttribute("data-translate-placeholder");
      if (key && data[key]) {
        el.setAttribute("placeholder", data[key]);
      }
    });

    // 3. ბარათების data-ატრიბუტების განახლება (საჭიროა მოდალისთვის)
    const cards = document.querySelectorAll(".grid-3-cols");
    cards.forEach((card) => {
      const isGeo = lang === "geo";

      // Data Name
      const nameKey = isGeo ? "data-name" : "data-name-eng";
      const nameAttr = isGeo ? "data-name" : "data-name"; // ორივე შემთხვევაში data-name განვაახლოთ
      if (card.hasAttribute(nameKey)) {
        // წაიკითხე საჭირო ატრიბუტი და განაახლე display ატრიბუტი
        card.setAttribute(nameAttr, card.getAttribute(nameKey));
      }

      // Data Description
      const descKey = isGeo ? "data-description-geo" : "data-description-eng";
      const descAttr = isGeo ? "data-description" : "data-description";
      if (card.hasAttribute(descKey)) {
        card.setAttribute(descAttr, card.getAttribute(descKey));
      }
    });

    // 4. active კლასის განახლება (ვიზუალური ინდიკატორი-ხაზი)
    langLinks.forEach((link) => {
      link.classList.toggle("active", link.id === lang);
    });
  }

  // გვერდის ჩატვირთვისას: ავტომატურად დააყენე ენა LocalStorage-ის მიხედვით
  setLanguage(currentLang);

  // ღილაკებზე კლიკი: შეინახეთ ენა და განაახლეთ გვერდი
  langLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      // აქ ვინახავთ LocalStorage-ში და ვთარგმნით
      setLanguage(link.id);
    });
  });
});
