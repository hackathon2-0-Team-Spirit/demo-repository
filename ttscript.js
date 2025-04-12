// Faculty data
const FACULTY = {
    math: { name: 'Dr. Sarah Johnson', subject: 'Mathematics' },
    physics: { name: 'Prof. James Wilson', subject: 'Physics' },
    cs: { name: 'Dr. Emily Chen', subject: 'Computer Science' },
    electronics: { name: 'Prof. Michael Roberts', subject: 'Electronics' },
    chemistry: { name: 'Dr. Lisa Anderson', subject: 'Chemistry' },
    design: { name: 'Prof. David Thompson', subject: 'Engineering Design' }
};

// Sample timetable data for all years
const TIMETABLE_DATA = {
    1: {
        // First Year timetable
        monday: [
            { time: '9:00-10:00', subject: 'Mathematics', faculty: 'math', room: 'R101' },
            { time: '10:00-11:00', subject: 'Physics', faculty: 'physics', room: 'R102' },
            { time: '11:15-12:15', subject: 'Chemistry', faculty: 'chemistry', room: 'R103' },
            { time: '1:15-2:15', subject: 'Engineering Design', faculty: 'design', room: 'R104' }
        ],
        // ... similar data for other days
    },
    2: {
        // Second Year timetable
        monday: [
            { time: '9:00-10:00', subject: 'Computer Science', faculty: 'cs', room: 'R201' },
            { time: '10:00-11:00', subject: 'Electronics', faculty: 'electronics', room: 'R202' },
            { time: '11:15-12:15', subject: 'Mathematics', faculty: 'math', room: 'R203' },
            { time: '1:15-2:15', subject: 'Physics', faculty: 'physics', room: 'R204' }
        ],
        // ... similar data for other days
    },
    // ... similar data for years 3 and 4
};

// Time slots
const TIME_SLOTS = [
    '9:00-10:00',
    '10:00-11:00',
    '11:15-12:15',
    '1:15-2:15',
    '2:15-3:15'
];

// Days of the week
const DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];

// Current selected year
let currentYear = 1;

// Initialize Bootstrap modal
let subjectModal;

document.addEventListener('DOMContentLoaded', function() {
    // Initialize modal
    subjectModal = new bootstrap.Modal(document.getElementById('subjectModal'));
    
    // Set up year selector buttons
    setupYearSelector();
    
    // Generate faculty legend
    generateFacultyLegend();
    
    // Load initial timetable
    loadTimetable(currentYear);
});

function setupYearSelector() {
    const yearButtons = document.querySelectorAll('.year-selector button');
    yearButtons.forEach(button => {
        button.addEventListener('click', function() {
            yearButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            currentYear = parseInt(this.dataset.year);
            loadTimetable(currentYear);
        });
    });
}

function generateFacultyLegend() {
    const legendContainer = document.getElementById('facultyLegend');
    Object.entries(FACULTY).forEach(([key, faculty]) => {
        const facultyDiv = document.createElement('div');
        facultyDiv.className = 'col-md-4 col-sm-6';
        facultyDiv.innerHTML = `
            <div class="faculty-card subject-${key}">
                <div class="fw-bold">${faculty.name}</div>
                <div class="small">${faculty.subject}</div>
            </div>
        `;
        legendContainer.appendChild(facultyDiv);
    });
}

function loadTimetable(year) {
    // Show loading state
    document.getElementById('loading').style.display = 'flex';
    document.getElementById('timetableView').style.opacity = '0';

    // Simulate loading delay
    setTimeout(() => {
        const timetableBody = document.querySelector('#timetableView tbody');
        timetableBody.innerHTML = '';

        // Generate time slots
        TIME_SLOTS.forEach(timeSlot => {
            const row = document.createElement('tr');
            
            // Time column
            const timeCell = document.createElement('td');
            timeCell.textContent = timeSlot;
            row.appendChild(timeCell);

            // Day columns
            DAYS.forEach(day => {
                const cell = document.createElement('td');
                const subject = findSubject(year, day, timeSlot);
                
                if (subject) {
                    cell.innerHTML = createSubjectCell(subject);
                    cell.querySelector('.subject-cell').addEventListener('click', () => {
                        showSubjectDetails(subject);
                    });
                }
                
                row.appendChild(cell);
            });

            timetableBody.appendChild(row);
        });

        // Hide loading and show timetable
        document.getElementById('loading').style.display = 'none';
        document.getElementById('timetableView').style.opacity = '1';
    }, 500);
}

function findSubject(year, day, timeSlot) {
    if (TIMETABLE_DATA[year] && TIMETABLE_DATA[year][day]) {
        return TIMETABLE_DATA[year][day].find(slot => slot.time === timeSlot);
    }
    return null;
}

function createSubjectCell(subject) {
    return `
        <div class="subject-cell subject-${subject.faculty.toLowerCase()}">
            <div class="subject-name">${subject.subject}</div>
            <div class="faculty-name">${FACULTY[subject.faculty].name}</div>
            <div class="room-number">${subject.room}</div>
        </div>
    `;
}

function showSubjectDetails(subject) {
    const modalBody = document.querySelector('#subjectModal .modal-body');
    modalBody.innerHTML = `
        <div class="p-3">
            <h4 class="mb-3">${subject.subject}</h4>
            <p><strong>Faculty:</strong> ${FACULTY[subject.faculty].name}</p>
            <p><strong>Room:</strong> ${subject.room}</p>
            <p><strong>Time:</strong> ${subject.time}</p>
        </div>
    `;
    subjectModal.show();
}
