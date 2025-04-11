  
 
 // Sample course progress data
 const courseProgressData = [
  {
    name: 'Web Development',
    progress: 80,
    hours: 45,
    trend: 'up',
    lastActivity: '2025-04-05'
  },
  {
    name: 'Data Structures',
    progress: 65,
    hours: 30,
    trend: 'down',
    lastActivity: '2025-04-04'
  },
  {
    name: 'Machine Learning',
    progress: 90,
    hours: 60,
    trend: 'up',
    lastActivity: '2025-04-07'
  },
  {
    name: 'Cybersecurity Basics',
    progress: 50,
    hours: 25,
    trend: 'down',
    lastActivity: '2025-04-02'
  }
];

// Function to populate the table
function populateCourseProgressTable() {
  const tableBody = document.getElementById('progress-table-body');
  tableBody.innerHTML = ''; // Clear existing rows

  courseProgressData.forEach(course => {
    const trendIcon = course.trend === 'up' ? 'fa-arrow-up' : 'fa-arrow-down';
    const trendClass = course.trend === 'up' ? 'trend up' : 'trend down';

    const row = `
      <tr>
        <td>${course.name}</td>
        <td>
          ${course.progress}%
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${course.progress}%;"></div>
          </div>
        </td>
        <td>${course.hours} hrs</td>
        <td>
          <div class="${trendClass}">
            <i class="fas ${trendIcon}"></i>
            ${course.trend === 'up' ? 'Improving' : 'Declining'}
          </div>
        </td>
        <td>${course.lastActivity}</td>
      </tr>
    `;

    tableBody.insertAdjacentHTML('beforeend', row);
  });
}

// Call function when page loads
document.addEventListener('DOMContentLoaded', populateCourseProgressTable);



document.addEventListener('DOMContentLoaded', () => {
  // --- Bar Chart: Course Progress Comparison ---
  const barCtx = document.getElementById('barChart').getContext('2d');
  const barChart = new Chart(barCtx, {
    type: 'bar',
    data: {
      labels: ['Web Dev', 'Data Structures', 'Machine Learning', 'Cybersecurity', 'AI'],
      datasets: [{
        label: 'Progress (%)',
        data: [80, 65, 90, 50, 70],
        backgroundColor: [
          '#3498db', '#2ecc71', '#f1c40f', '#e67e22', '#9b59b6'
        ],
        borderRadius: 8
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false
        },
        title: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 100
        }
      }
    }
  });

  // --- Line Chart: Learning Hours Trend ---
  const lineCtx = document.getElementById('trendChart').getContext('2d');
  const lineChart = new Chart(lineCtx, {
    type: 'line',
    data: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      datasets: [{
        label: 'Learning Hours',
        data: [10, 15, 12, 18],
        fill: true,
        borderColor: '#2ecc71',
        backgroundColor: 'rgba(46, 204, 113, 0.2)',
        tension: 0.3,
        pointBackgroundColor: '#2ecc71',
        pointBorderColor: '#fff',
        pointRadius: 5,
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
});