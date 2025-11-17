// // Import the functions you need from the SDKs you need
// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
// import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";

// // Your web app's Firebase configuration
// const firebaseConfig = {
//     // 💡 ახალი, დაცული API გასაღები ჩასმულია აქ!
//     apiKey: "AIzaSyBebXrLOTQ3MYtaNY9gg5OuOs0jPyDKXIc", 
//     authDomain: "goglas-wine-acc47.firebaseapp.com",
//     projectId: "goglas-wine-acc47",
//     storageBucket: "goglas-wine-acc47.firebasestorage.app",
//     messagingSenderId: "873836961968",
//     appId: "1:873836961968:web:39c6f1b052ca23a5fcdb75"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);


// // document.getElementById('register-btn').addEventListener("click", register)
// // //register function 
// // async function register(){
// //   const email = document.getElementById('register-email').value;
// //   const password = document.getElementById('register-password').value;
  
// //   // ძირითადი ვალიდაცია
// //   if (!email || !password) {
// //       console.error("Error: Email and password cannot be empty.");
// //       return;
// //   }

// //   try{
// //       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
// //       //  წარმატება: გამოიყენე console.log() ან UI-ის ელემენტი
// //       const userEmail = userCredential.user.email;
      
// //       // სწორი სინტაქსი
// //       console.log(`User registered successfully: ${userEmail}`);
      
// //   } catch(error){
// //       // შეცდომის დამუშავება
// //       console.error("Registration Failed:", error.code, error.message);
// //   }
// // }



// // შეტყობინების ელემენტი
// const messageElement = document.getElementById('auth-message');

// function displayMessage(message, type) {
//     if (!messageElement) return; // Exit if element is not found
    
//     messageElement.textContent = message;
//     messageElement.className = 'hidden-message ' + type; // Set class
    
//     // Auto-hide the message after 5 seconds
//     setTimeout(() => {
//         messageElement.className = 'hidden-message';
//         messageElement.textContent = '';
//     }, 5000); 
// }


// // ის აკავშირებს ღილაკის დაჭერას (click) register ფუნქციასთან.
// document.getElementById('register-btn').addEventListener("click", register);


// // register function - რეგისტრაციის ლოგიკა
// async function register(){
//     // Clear message on new attempt
//     if (messageElement) {
//         messageElement.className = 'hidden-message';
//         messageElement.textContent = '';
//     }
    
//     const email = document.getElementById('register-email').value;
//     const password = document.getElementById('register-password').value;
    
//     // Basic validation
//     if (!email || !password) {
//         displayMessage("შეავსეთ ორივე ველი.", 'error');
//         return;
//     }

//     try{
//         const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        
//         // Success: Display success message
//         const userEmail = userCredential.user.email;
//         console.log(`User registered successfully: ${userEmail}`);

//         //  ვიზუალური შეტყობინება მომხმარებლისთვის
//         displayMessage(`წარმატებით დარეგისტრირდით! ${userEmail}-ით.`, 'success');
        
//     } catch(error){
//         // Error handling
//         console.error("Registration Failed:", error.code, error.message);
        
//         let userErrorMessage = "რეგისტრაცია ვერ მოხერხდა. სცადეთ თავიდან.";

//         // Translate user-friendly messages for common Firebase errors
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
//                 userErrorMessage = "რეგისტრაცია ამ მომენტში გათიშულია. გთხოვთ, შეამოწმეთ Firebase პარამეტრები.";
//                 break;
//             default:
//                 userErrorMessage = "დაფიქსირდა შეცდომა. შეამოწმეთ თქვენი მონაცემები.";
//         }
        
//         // ვიზუალური შეტყობინება მომხმარებლისთვის
//         displayMessage(userErrorMessage, 'error');
//     }
// }

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBebXrLOTQ3MYtaNY9gg5OuOs0jPyDKXIc", 
    authDomain: "goglas-wine-acc47.firebaseapp.com",
    projectId: "goglas-wine-acc47",
    storageBucket: "goglas-wine-acc47.firebasestorage.app",
    messagingSenderId: "873836961968",
    appId: "1:873836961968:web:39c6f1b052ca23a5fcdb75"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// შეტყობინების ელემენტი
const messageElement = document.getElementById('auth-message');

function displayMessage(message, type) {
    if (!messageElement) return;
    
    messageElement.textContent = message;
    messageElement.className = 'hidden-message ' + type;
    
    setTimeout(() => {
        messageElement.className = 'hidden-message';
        messageElement.textContent = '';
    }, 5000); 
}

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
        displayMessage("შეავსეთ ორივე ველი.", 'error');
        return;
    }

    try{
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const userEmail = userCredential.user.email;
        console.log(`User registered successfully: ${userEmail}`);
        displayMessage(`წარმატებით დარეგისტრირდით! ${userEmail}-ით.`, 'success');
        
    } catch(error){
        console.error("Registration Failed:", error.code, error.message);
        
        let userErrorMessage = "რეგისტრაცია ვერ მოხერხდა. სცადეთ თავიდან.";

        switch(error.code) {
            case 'auth/email-already-in-use':
                userErrorMessage = "ეს ელფოსტა უკვე გამოყენებულია.";
                break;
            case 'auth/invalid-email':
                userErrorMessage = "ელფოსტის ფორმატი არასწორია.";
                break;
            case 'auth/weak-password':
                userErrorMessage = "პაროლი უნდა იყოს მინიმუმ 6 სიმბოლო.";
                break;
            case 'auth/operation-not-allowed':
                userErrorMessage = "რეგისტრაცია ამ მომენტში გათიშულია.";
                break;
            default:
                userErrorMessage = "დაფიქსირდა შეცდომა. შეამოწმეთ თქვენი მონაცემები.";
        }
        
        displayMessage(userErrorMessage, 'error');
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
        displayMessage("შეავსეთ ორივე ველი.", 'error');
        return;
    }

    try{
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const userEmail = userCredential.user.email;
        console.log(`User logged in successfully: ${userEmail}`);
        displayMessage(`წარმატებით შეხვედით! ${userEmail}`, 'success');
        
    } catch(error){
        console.error("Login Failed:", error.code, error.message);
        
        let userErrorMessage = "შესვლა ვერ მოხერხდა.";

        switch(error.code) {
            case 'auth/user-not-found':
                userErrorMessage = "მომხმარებელი ვერ მოიძებნა.";
                break;
            case 'auth/wrong-password':
                userErrorMessage = "პაროლი არასწორია.";
                break;
            case 'auth/invalid-email':
                userErrorMessage = "ელფოსტის ფორმატი არასწორია.";
                break;
            case 'auth/user-disabled':
                userErrorMessage = "ეს ანგარიში დაბლოკილია.";
                break;
            case 'auth/invalid-credential':
                userErrorMessage = "ელფოსტა ან პაროლი არასწორია.";
                break;
            default:
                userErrorMessage = "დაფიქსირდა შეცდომა. სცადეთ თავიდან.";
        }
        
        displayMessage(userErrorMessage, 'error');
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
        displayMessage("წარმატებით გახვედით!", 'success');
    } catch(error){
        console.error("Logout Failed:", error);
        displayMessage("გასვლა ვერ მოხერხდა.", 'error');
    }
}

// ===== მომხმარებლის მდგომარეობის თვალთვალი =====
onAuthStateChanged(auth, (user) => {
    const authSection = document.getElementById('auth-section');
    const profileSection = document.getElementById('profile-section');
    const userEmailDisplay = document.getElementById('user-email-display');
    const headerLoginLink = document.querySelector('.login-link span');

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
            headerLoginLink.textContent = 'პროფილი';
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
            headerLoginLink.textContent = 'შესვლა';
        }
    }
});