// Mock User Data
const mockUsers = [
    { username: "prof_smith", password: "pass123", role: "faculty" },
    { username: "student1", password: "pass123", role: "student" },
    { username: "alumni1", password: "pass123", role: "alumni" }
];

// Mock Data
const mockData = {
    discussions: [
        { id: 1, title: "Final Project Discussion", content: "Let's discuss the final project requirements", category: "Academic", createdAt: "2024-02-26" },
        { id: 2, title: "Study Group for ML", content: "Looking for study partners for Machine Learning", category: "Study Groups", createdAt: "2024-02-26" }
    ],
    announcements: [
        { id: 1, title: "End of Semester Exam Schedule", content: "Exam schedules are now available", category: "Academic", createdAt: "2024-02-26" },
        { id: 2, title: "Campus Career Fair", content: "Join us for the annual career fair", category: "Events", createdAt: "2024-02-26" }
    ],
    clubs: [
        { id: 1, name: "Programming Club", description: "For coding enthusiasts", category: "Technical" },
        { id: 2, name: "Debate Society", description: "Sharpen your debating skills", category: "Cultural" }
    ],
    alumni: [
        { 
            id: 1, 
            name: "John Doe", 
            graduationYear: 2018, 
            department: "Computer Science",
            currentPosition: "Software Engineer at Google",
            image: "https://ui-avatars.com/api/?name=John+Doe&background=random"
        },
        { 
            id: 2, 
            name: "Jane Smith", 
            graduationYear: 2019, 
            department: "Computer Science",
            currentPosition: "Data Scientist at Microsoft",
            image: "https://ui-avatars.com/api/?name=Jane+Smith&background=random"
        },
        { 
            id: 3, 
            name: "Thameem Ansari", 
            graduationYear: 2021, 
            department: "Electrical communication",
            currentPosition: "Electrical Engineer at KIA",
            image: "https://ui-avatars.com/api/?name=Jan+Smith&background=random"
        }
    ],
    schedule: {
        "Monday": {
            "9:00": "Computer Science 101",
            "11:00": "Database Systems",
            "14:00": "AI Fundamentals"
        },
        "Wednesday": {
            "10:00": "Web Development",
            "13:00": "Software Engineering"
        },
        "Friday": {
            "9:00": "Data Structures",
            "11:00": "Algorithms"
        }
    }
};

// Auth State
let currentUser = null;

// Login Form Handler
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const user = mockUsers.find(u => u.username === username && u.password === password);

    if (user) {
        currentUser = user;
        document.getElementById('login').classList.remove('active');
        document.getElementById('login').classList.add('hidden');
        document.getElementById('app').classList.remove('hidden');
        // Initialize app content
        renderDiscussions();
        renderAnnouncements();
        renderClubs();
        renderAlumni();
        renderTimetable();
    } else {
        alert('Invalid username or password');
    }
});

// Logout Handler
document.getElementById('logoutBtn').addEventListener('click', () => {
    currentUser = null;
    document.getElementById('app').classList.add('hidden');
    document.getElementById('login').classList.remove('hidden');
    document.getElementById('login').classList.add('active');
    document.getElementById('loginForm').reset();
});

// Navigation
document.querySelectorAll('.nav-link').forEach(link => {
    if (link.id !== 'logoutBtn') {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const pageId = link.getAttribute('data-page');

            // Update active states
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

            link.classList.add('active');
            document.getElementById(pageId).classList.add('active');
        });
    }
});

// Format date
function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Render Discussions
function renderDiscussions() {
    const discussionsList = document.getElementById('discussionsList');
    discussionsList.innerHTML = mockData.discussions.map(discussion => `
        <div class="card">
            <div class="card-title">${discussion.title}</div>
            <div class="card-meta">${formatDate(discussion.createdAt)} • ${discussion.category}</div>
            <div class="card-content">${discussion.content}</div>
        </div>
    `).join('');
}

// Render Announcements
function renderAnnouncements() {
    const announcementsList = document.getElementById('announcementsList');
    announcementsList.innerHTML = mockData.announcements.map(announcement => `
        <div class="card">
            <div class="card-title">${announcement.title}</div>
            <div class="card-meta">${formatDate(announcement.createdAt)} • ${announcement.category}</div>
            <div class="card-content">${announcement.content}</div>
        </div>
    `).join('');
}

// Render Clubs
function renderClubs() {
    const clubsList = document.getElementById('clubsList');
    clubsList.innerHTML = mockData.clubs.map(club => `
        <div class="card">
            <div class="card-title">${club.name}</div>
            <div class="card-meta">${club.category}</div>
            <div class="card-content">${club.description}</div>
        </div>
    `).join('');
}

// Render Alumni
function renderAlumni() {
    const alumniList = document.getElementById('alumniList');
    alumniList.innerHTML = mockData.alumni.map(alumnus => `
        <div class="profile-card">
            <img src="${alumnus.image}" alt="${alumnus.name}">
            <h3>${alumnus.name}</h3>
            <p>Class of ${alumnus.graduationYear}</p>
            <p>${alumnus.currentPosition}</p>
            <p>${alumnus.department}</p>
        </div>
    `).join('');
}

// Render Timetable
function renderTimetable() {
    const times = ["9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"];
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

    const tbody = document.querySelector('#weeklySchedule tbody');
    tbody.innerHTML = times.map(time => `
        <tr>
            <td>${time}</td>
            ${days.map(day => `
                <td>${mockData.schedule[day]?.[time] || ''}</td>
            `).join('')}
        </tr>
    `).join('');
}

// Handle Discussion Form
document.getElementById('discussionForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const form = e.target;
    const newDiscussion = {
        id: mockData.discussions.length + 1,
        title: form.querySelector('input').value,
        category: form.querySelector('select').value,
        content: form.querySelector('textarea').value,
        createdAt: new Date().toISOString()
    };

    mockData.discussions.unshift(newDiscussion);
    renderDiscussions();
    form.reset();
});

// Initial render (only if user is already logged in or it's a direct app load)

if (!currentUser) {
    document.getElementById('app').classList.add('hidden');
} else {
    renderDiscussions();
    renderAnnouncements();
    renderClubs();
    renderAlumni();
    renderTimetable();
}