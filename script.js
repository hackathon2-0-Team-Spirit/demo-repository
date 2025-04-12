// Sample club data
const clubs = [
    {
        id: 1,
        name: "Dance Club",
        description: "Express yourself through various dance forms and performances",
        logo: "💃",
        department: "Arts & Culture",
    },
    {
        id: 2,
        name: "Finance Club",
        description: "Learn about financial markets, investment strategies, and wealth management",
        logo: "💹",
        department: "Business",
    },
    {
        id: 3,
        name: "Sports Club",
        description: "Join various sports teams and participate in tournaments",
        logo: "⚽",
        department: "Athletics",
    },
    {
        id: 4,
        name: "Coding Club",
        description: "Develop your programming skills and work on exciting projects",
        logo: "💻",
        department: "Computer Science",
    },
    {
        id: 5,
        name: "Study Club",
        description: "Form study groups and excel in your academics",
        logo: "📚",
        department: "Academic Support",
    },
    {
        id: 6,
        name: "Business Club",
        description: "Network with entrepreneurs and learn about business strategies",
        logo: "💼",
        department: "Business",
    }
];

// Sample events data
const events = {
    1: [
        {
            id: 1,
            title: "Annual Dance Competition",
            description: "Showcase your dance talent in our yearly competition",
            startDate: "2024-03-15",
            location: "Main Auditorium"
        }
    ],
    2: [
        {
            id: 2,
            title: "Stock Market Workshop",
            description: "Learn about stock market basics and investment strategies",
            startDate: "2024-03-20",
            location: "Room 101"
        }
    ]
};

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    const clubsGrid = document.getElementById('clubsGrid');
    const modal = document.getElementById('clubModal');
    const closeButton = document.querySelector('.close-button');

    // Render clubs
    clubs.forEach(club => {
        const clubCard = createClubCard(club);
        clubsGrid.appendChild(clubCard);
    });

    // Close modal when clicking the close button or outside the modal
    closeButton.addEventListener('click', () => modal.style.display = 'none');
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});

function createClubCard(club) {
    const card = document.createElement('div');
    card.className = 'club-card';
    card.innerHTML = `
        <div class="club-emoji">${club.logo}</div>
        <div class="club-info">
            <h2 class="club-name">${club.name}</h2>
            <p class="club-department">${club.department}</p>
            <p class="club-description">${club.description}</p>
        </div>
    `;
    
    card.addEventListener('click', () => showClubDetails(club));
    return card;
}

function showClubDetails(club) {
    const modal = document.getElementById('clubModal');
    const clubTitle = document.getElementById('clubTitle');
    const clubEmoji = document.getElementById('clubEmoji');
    const clubEvents = document.getElementById('clubEvents');

    clubTitle.textContent = club.name;
    clubEmoji.textContent = club.logo;

    // Display club events
    const clubEventsList = events[club.id] || [];
    clubEvents.innerHTML = clubEventsList.length ? clubEventsList.map(event => `
        <div class="event-card">
            <h3 class="event-title">${event.title}</h3>
            <p class="event-description">${event.description}</p>
            <div class="event-details">
                <span class="event-detail">
                    📅 ${formatDate(event.startDate)}
                </span>
                <span class="event-detail">
                    📍 ${event.location}
                </span>
            </div>
        </div>
    `).join('') : '<p class="no-events">No upcoming activities at the moment</p>';

    modal.style.display = 'block';
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}
