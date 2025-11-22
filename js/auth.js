// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";

// web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBebXrLOTQ3MYtaNY9gg5OuOs0jPyDKXIc", 
    authDomain: "goglas-wine-acc47.firebaseapp.com",
    projectId: "goglas-wine-acc47",
    storageBucket: "goglas-wine-acc47.firebasestorage.app",
    messagingSenderId: "873836961968",
    appId: "1:873836961968:web:39c6f1b052ca23a5fcdb75"
};

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);

// // შეტყობინების ელემენტი
// const messageElement = document.getElementById('auth-message');

// function displayMessage(message, type) {
//     if (!messageElement) return;
    
//     messageElement.textContent = message;
//     messageElement.className = 'hidden-message ' + type;
    
//     setTimeout(() => {
//         messageElement.className = 'hidden-message';
//         messageElement.textContent = '';
//     }, 5000); 
// }

// // ===== ტაბების გადართვა =====
// const loginTab = document.getElementById('login-tab');
// const registerTab = document.getElementById('register-tab');
// const loginForm = document.getElementById('login-form');
// const registerForm = document.getElementById('register-form');

// if (loginTab && registerTab) {
//     loginTab.addEventListener('click', () => {
//         loginTab.classList.add('active');
//         registerTab.classList.remove('active');
//         loginForm.style.display = 'block';
//         registerForm.style.display = 'none';
//     });

//     registerTab.addEventListener('click', () => {
//         registerTab.classList.add('active');
//         loginTab.classList.remove('active');
//         registerForm.style.display = 'block';
//         loginForm.style.display = 'none';
//     });
// }

// // ===== რეგისტრაცია =====
// const registerBtn = document.getElementById('register-btn');
// if (registerBtn) {
//     registerBtn.addEventListener("click", register);
// }

// async function register(){
//     if (messageElement) {
//         messageElement.className = 'hidden-message';
//         messageElement.textContent = '';
//     }
    
//     const email = document.getElementById('register-email').value;
//     const password = document.getElementById('register-password').value;
    
//     if (!email || !password) {
//         displayMessage("შეავსეთ ორივე ველი.", 'error');
//         return;
//     }

//     try{
//         const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//         const userEmail = userCredential.user.email;
//         console.log(`User registered successfully: ${userEmail}`);
//         displayMessage(`წარმატებით დარეგისტრირდით! ${userEmail}-ით.`, 'success');
        
//     } catch(error){
//         console.error("Registration Failed:", error.code, error.message);
        
//         let userErrorMessage = "რეგისტრაცია ვერ მოხერხდა. სცადეთ თავიდან.";

//         switch(error.code) {
//             case 'auth/email-already-in-use':
//                 userErrorMessage = "ეს ელფოსტა უკვე გამოყენებულია.";
//                 break;
//             case 'auth/invalid-email':
//                 userErrorMessage = "ელფოსტის ფორმატი არასწორია.";
//                 break;
//             case 'auth/weak-password':
//                 userErrorMessage = "პაროლი უნდა იყოს მინიმუმ 6 სიმბოლო.";
//                 break;
//             case 'auth/operation-not-allowed':
//                 userErrorMessage = "რეგისტრაცია ამ მომენტში გათიშულია.";
//                 break;
//             default:
//                 userErrorMessage = "დაფიქსირდა შეცდომა. შეამოწმეთ თქვენი მონაცემები.";
//         }
        
//         displayMessage(userErrorMessage, 'error');
//     }
// }

// // ===== შესვლა =====
// const loginBtn = document.getElementById('login-btn');
// if (loginBtn) {
//     loginBtn.addEventListener("click", login);
// }

// async function login(){
//     if (messageElement) {
//         messageElement.className = 'hidden-message';
//         messageElement.textContent = '';
//     }
    
//     const email = document.getElementById('login-email').value;
//     const password = document.getElementById('login-password').value;
    
//     if (!email || !password) {
//         displayMessage("შეავსეთ ორივე ველი.", 'error');
//         return;
//     }

//     try{
//         const userCredential = await signInWithEmailAndPassword(auth, email, password);
//         const userEmail = userCredential.user.email;
//         console.log(`User logged in successfully: ${userEmail}`);
//         displayMessage(`წარმატებით შეხვედით! ${userEmail}`, 'success');
        
//     } catch(error){
//         console.error("Login Failed:", error.code, error.message);
        
//         let userErrorMessage = "შესვლა ვერ მოხერხდა.";

//         switch(error.code) {
//             case 'auth/user-not-found':
//                 userErrorMessage = "მომხმარებელი ვერ მოიძებნა.";
//                 break;
//             case 'auth/wrong-password':
//                 userErrorMessage = "პაროლი არასწორია.";
//                 break;
//             case 'auth/invalid-email':
//                 userErrorMessage = "ელფოსტის ფორმატი არასწორია.";
//                 break;
//             case 'auth/user-disabled':
//                 userErrorMessage = "ეს ანგარიში დაბლოკილია.";
//                 break;
//             case 'auth/invalid-credential':
//                 userErrorMessage = "ელფოსტა ან პაროლი არასწორია.";
//                 break;
//             default:
//                 userErrorMessage = "დაფიქსირდა შეცდომა. სცადეთ თავიდან.";
//         }
        
//         displayMessage(userErrorMessage, 'error');
//     }
// }

// // ===== გასვლა =====
// const logoutBtn = document.getElementById('logout-btn');
// if (logoutBtn) {
//     logoutBtn.addEventListener("click", logout);
// }

// async function logout(){
//     try{
//         await signOut(auth);
//         console.log("User logged out successfully");
//         displayMessage("წარმატებით გახვედით!", 'success');
//     } catch(error){
//         console.error("Logout Failed:", error);
//         displayMessage("გასვლა ვერ მოხერხდა.", 'error');
//     }
// }

// // ===== მომხმარებლის მდგომარეობის თვალთვალი =====
// onAuthStateChanged(auth, (user) => {
//     const authSection = document.getElementById('auth-section');
//     const profileSection = document.getElementById('profile-section');
//     const userEmailDisplay = document.getElementById('user-email-display');
//     const headerLoginLink = document.querySelector('.login-link span');

//     if (user) {
//         // მომხმარებელი შესულია
//         console.log("User is logged in:", user.email);
        
//         // login.html-ზე რომ ვართ
//         if (authSection && profileSection) {
//             authSection.style.display = 'none';
//             profileSection.style.display = 'block';
//             if (userEmailDisplay) {
//                 userEmailDisplay.textContent = user.email;
//             }
//         }

//         // ჰედერში "შესვლა" → "პროფილი"
//         if (headerLoginLink) {
//             headerLoginLink.textContent = 'პროფილი';
//         }

//     } else {
//         // მომხმარებელი არ არის შესული
//         console.log("No user logged in");
        
//         // login.html-ზე რომ ვართ
//         if (authSection && profileSection) {
//             authSection.style.display = 'block';
//             profileSection.style.display = 'none';
//         }

//         // ჰედერში "პროფილი" → "შესვლა"
//         if (headerLoginLink) {
//             headerLoginLink.textContent = 'შესვლა';
//         }
//     }
// });


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// შეტყობინების ელემენტი
const messageElement = document.getElementById('auth-message');

// ==================ენის ჩატვირთვის ფუნქციები========================
async function loadLangFile(lang) {
    try {
      const res = await fetch(`languages/${lang}.json`);
      if (!res.ok) throw new Error(`Failed to load languages/${lang}.json`);
      return await res.json();
    } catch (err) {
      console.error("Language load error:", err);
      return null;
    }
}

async function getCurrentLangData() {
    const currentLang = localStorage.getItem("currentLang") || "geo";
    return await loadLangFile(currentLang);
}

//  შეტყობინების ფუნქცია თარგმანით
async function displayMessage(messageKey, type) {
    if (!messageElement) return;
    
    const langData = await getCurrentLangData();
    const message = langData[messageKey] || messageKey;
    
    messageElement.textContent = message;
    messageElement.className = 'hidden-message ' + type;
    
    setTimeout(() => {
        messageElement.className = 'hidden-message';
        messageElement.textContent = '';
    }, 5000); 
}

//  ენის გადამრთველის ლოგიკა
document.addEventListener("DOMContentLoaded", () => {
    const langContainer = document.querySelector(".language");
    if (!langContainer) return;

    const langLinks = langContainer.querySelectorAll("a");
    const elementsToTranslate = document.querySelectorAll("[data-translate]");
    const currentLang = localStorage.getItem("currentLang") || "geo";

    async function setLanguage(lang) {
      const data = await loadLangFile(lang);
      if (!data) return;

      localStorage.setItem("currentLang", lang);

      // ტექსტების თარგმნა
      elementsToTranslate.forEach((el) => {
        const key = el.getAttribute("data-translate");
        if (key && data[key]) el.textContent = data[key];
      });

      // Placeholder-ების თარგმნა
      document.querySelectorAll("[data-translate-placeholder]").forEach((el) => {
        const key = el.getAttribute("data-translate-placeholder");
        if (key && data[key]) {
          el.setAttribute("placeholder", data[key]);
        }
      });

      // Active კლასის განახლება
      langLinks.forEach((link) => {
        link.classList.toggle("active", link.id === lang);
      });
    }

    setLanguage(currentLang);

    // ენის ღილაკებზე კლიკი
    langLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        setLanguage(link.id);
      });
    });
});

// ===== ტაბების გადართვა =====
const loginTab = document.getElementById('login-tab');
const registerTab = document.getElementById('register-tab');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');

if (loginTab && registerTab) {
    loginTab.addEventListener('click', () => {
        loginTab.classList.add('active');
        registerTab.classList.remove('active');
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
    });

    registerTab.addEventListener('click', () => {
        registerTab.classList.add('active');
        loginTab.classList.remove('active');
        registerForm.style.display = 'block';
        loginForm.style.display = 'none';
    });
}

// ===== რეგისტრაცია =====
const registerBtn = document.getElementById('register-btn');
if (registerBtn) {
    registerBtn.addEventListener("click", register);
}

async function register(){
    if (messageElement) {
        messageElement.className = 'hidden-message';
        messageElement.textContent = '';
    }
    
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    
    if (!email || !password) {
        displayMessage("msg_fill_fields", 'error');
        return;
    }

    try{
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const userEmail = userCredential.user.email;
        console.log(`User registered successfully: ${userEmail}`);
        displayMessage("msg_register_success", 'success');
        
    } catch(error){
        console.error("Registration Failed:", error.code, error.message);
        
        let errorKey = "msg_register_failed";

        switch(error.code) {
            case 'auth/email-already-in-use':
                errorKey = "msg_email_in_use";
                break;
            case 'auth/invalid-email':
                errorKey = "msg_invalid_email";
                break;
            case 'auth/weak-password':
                errorKey = "msg_weak_password";
                break;
            case 'auth/operation-not-allowed':
                errorKey = "msg_operation_not_allowed";
                break;
            default:
                errorKey = "msg_register_failed";
        }
        
        displayMessage(errorKey, 'error');
    }
}

// ===== შესვლა =====
const loginBtn = document.getElementById('login-btn');
if (loginBtn) {
    loginBtn.addEventListener("click", login);
}

async function login(){
    if (messageElement) {
        messageElement.className = 'hidden-message';
        messageElement.textContent = '';
    }
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    if (!email || !password) {
        displayMessage("msg_fill_fields", 'error');
        return;
    }

    try{
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const userEmail = userCredential.user.email;
        console.log(`User logged in successfully: ${userEmail}`);
        displayMessage("msg_login_success", 'success');
        
    } catch(error){
        console.error("Login Failed:", error.code, error.message);
        
        let errorKey = "msg_login_failed";

        switch(error.code) {
            case 'auth/user-not-found':
                errorKey = "msg_user_not_found";
                break;
            case 'auth/wrong-password':
                errorKey = "msg_wrong_password";
                break;
            case 'auth/invalid-email':
                errorKey = "msg_invalid_email";
                break;
            case 'auth/user-disabled':
                errorKey = "msg_user_disabled";
                break;
            case 'auth/invalid-credential':
                errorKey = "msg_invalid_credential";
                break;
            default:
                errorKey = "msg_login_failed";
        }
        
        displayMessage(errorKey, 'error');
    }
}

// ===== გასვლა =====
const logoutBtn = document.getElementById('logout-btn');
if (logoutBtn) {
    logoutBtn.addEventListener("click", logout);
}

async function logout(){
    try{
        await signOut(auth);
        console.log("User logged out successfully");
        displayMessage("msg_logout_success", 'success');
    } catch(error){
        console.error("Logout Failed:", error);
        displayMessage("msg_logout_failed", 'error');
    }
}

// ===== მომხმარებლის მდგომარეობის თვალთვალი =====
onAuthStateChanged(auth, async (user) => {
    const authSection = document.getElementById('auth-section');
    const profileSection = document.getElementById('profile-section');
    const userEmailDisplay = document.getElementById('user-email-display');
    const headerLoginLink = document.querySelector('.login-link span');
    
    const langData = await getCurrentLangData();

    if (user) {
        // მომხმარებელი შესულია
        console.log("User is logged in:", user.email);
        
        // login.html-ზე რომ ვართ
        if (authSection && profileSection) {
            authSection.style.display = 'none';
            profileSection.style.display = 'block';
            if (userEmailDisplay) {
                userEmailDisplay.textContent = user.email;
            }
        }

        // ჰედერში "შესვლა" → "პროფილი"
        if (headerLoginLink) {
            headerLoginLink.textContent = langData.profile || 'პროფილი';
        }

    } else {
        // მომხმარებელი არ არის შესული
        console.log("No user logged in");
        
        // login.html-ზე რომ ვართ
        if (authSection && profileSection) {
            authSection.style.display = 'block';
            profileSection.style.display = 'none';
        }

        // ჰედერში "პროფილი" → "შესვლა"
        if (headerLoginLink) {
            headerLoginLink.textContent = langData.login || 'შესვლა';
        }
    }
});