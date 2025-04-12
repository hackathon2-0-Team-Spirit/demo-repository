import { 
    initializeApp 
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";

import { 
    getAuth, 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    signInWithPopup, 
    getRedirectResult, 
    GoogleAuthProvider, 
    signOut, 
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyB669BYwF6ZpmW9ns88vFkPnY7HkLwX1Ls",
    authDomain: "ipl-auction-wallet.firebaseapp.com",
    projectId: "ipl-auction-wallet",
    storageBucket: "ipl-auction-wallet.appspot.com",
    messagingSenderId: "70471167629",
    appId: "1:70471167629:web:9e76bc659f83570a37bcc4",
    measurementId: "G-T6TNNFFKD6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();

// Function to show Dynamic Island notifications
function showDynamicIsland(message) {
    const island = document.getElementById("dynamic-island");
    const messageBox = document.getElementById("dynamic-message");

    if (!island) return;

    messageBox.textContent = message;
    island.classList.remove("hide");
    island.classList.add("show");

    // Hide after 3 seconds
    setTimeout(() => {
        island.classList.add("hide");
        setTimeout(() => {
            island.classList.remove("show", "hide");
        }, 500);
    }, 3000);
}

// Function to update user profile UI
function updateUserProfile(user) {
    const profileContainer = document.getElementById("user-profile");
    const profilePic = document.getElementById("profile-pic");
    const profileName = document.getElementById("profile-name");

    if (user) {
        profileContainer.style.display = "flex";
        profileName.textContent = user.displayName || "User";
        profilePic.src = user.photoURL || "default-profile.png";
    } else {
        profileContainer.style.display = "none";
    }
}

// Check login state and update UI dynamically
onAuthStateChanged(auth, (user) => {
    updateUserProfile(user);
});

// Handle Signup
document.getElementById("signup-form")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("signup-email").value.trim();
    const password = document.getElementById("signup-password").value.trim();

    if (!email || !password) {
        showDynamicIsland("⚠️ Please fill in all fields.");
        return;
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        showDynamicIsland("✅ Account created successfully! Redirecting...");
        console.log("Signup success:", userCredential.user);
        setTimeout(() => {
            window.location.href = "main.html";
        }, 3000);
    } catch (error) {
        showDynamicIsland(`❌ Signup failed: ${error.message}`);
        console.error("Signup error:", error);
    }
});

// Handle Login
document.getElementById("login-form")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value.trim();

    if (!email || !password) {
        showDynamicIsland("⚠️ Please enter your email and password.");
        return;
    }

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        showDynamicIsland(`✅ Welcome, ${userCredential.user.email}! Redirecting...`);
        console.log("Login success:", userCredential.user);
        setTimeout(() => {
            window.location.href = "main.html";
        }, 3000);
    } catch (error) {
        showDynamicIsland(`❌ Login failed: ${error.message}`);
        console.error("Login error:", error);
    }
});

// Handle Google Login
document.getElementById("google-login-btn")?.addEventListener("click", async () => {
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        showDynamicIsland(`✅ Google Sign-In successful! Welcome, ${user.email}`);
        console.log("Google login success:", user);
        setTimeout(() => {
            window.location.href = "main.html";
        }, 3000);
    } catch (error) {
        showDynamicIsland(`❌ Google Sign-In failed: ${error.message}`);
        console.error("Google login error:", error);
    }
});

// Handle Google Login Redirect
getRedirectResult(auth)
    .then((result) => {
        if (result?.user) {
            showDynamicIsland(`✅ Google Sign-In successful! Welcome, ${result.user.email}`);
            console.log("Google login success:", result.user);
            setTimeout(() => {
                window.location.href = "main.html";
            }, 3000);
        }
    })
    .catch((error) => {
        console.error("Redirect login error:", error);
    });

// Handle Logout
document.getElementById("logout-btn")?.addEventListener("click", async () => {
    try {
        await signOut(auth);
        showDynamicIsland("👋 Logged out successfully!");
        updateUserProfile(null);
        setTimeout(() => {
            window.location.href = "index.html";
        }, 2000);
    } catch (error) {
        showDynamicIsland(`❌ Logout failed: ${error.message}`);
        console.error("Logout error:", error);
    }
});
