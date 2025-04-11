const ctxPie = document.getElementById('pieChart').getContext('2d');

  const pieChart = new Chart(ctxPie, {
    type: 'pie',
    data: {
      labels: ['Courses', 'Daily Packs', 'Quizzes', 'Assessments'],
      datasets: [{
        label: 'Course Breakdown',
        data: [36, 33, 12, 2], // Same as in the legend
        backgroundColor: [
          '#3498db', // blue
          '#2ecc71', // green
          '#e74c3c', // red
          '#f1c40f'  // yellow
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false // Hide built-in legend, use your custom HTML legend
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              const label = context.label || '';
              const value = context.raw;
              return `${label}: ${value}`;
            }
          }
        }
      }
    }
  });



  const ctxLine = document.getElementById('lineChart').getContext('2d');

  // Sample dataset
  const chartData = {
    courses: {
      daily: [5, 8, 6, 4, 7, 3, 9],
      weekly: [40, 45, 38, 50],
      monthly: [160, 170, 155, 180]
    },
    quizzes: {
      daily: [2, 3, 1, 4, 3, 2, 5],
      weekly: [14, 18, 12, 20],
      monthly: [50, 60, 48, 70]
    },
    assessments: {
      daily: [1, 0, 2, 1, 0, 1, 3],
      weekly: [4, 5, 6, 3],
      monthly: [15, 18, 20, 12]
    }
  };

  const labels = {
    daily: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    weekly: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    monthly: ['Jan', 'Feb', 'Mar', 'Apr']
  };

  // Initial chart config
  let lineChart = new Chart(ctxLine, {
    type: 'line',
    data: {
      labels: labels['daily'],
      datasets: [{
        label: 'Courses',
        data: chartData['courses']['daily'],
        fill: false,
        borderColor: '#3498db',
        backgroundColor: '#3498db',
        tension: 0.3
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top'
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

  // Dropdown handlers
  document.getElementById('contentType').addEventListener('change', updateChart);
  document.getElementById('timeframe').addEventListener('change', updateChart);

  function updateChart() {
    const contentType = document.getElementById('contentType').value;
    const timeframe = document.getElementById('timeframe').value;

    lineChart.data.labels = labels[timeframe];
    lineChart.data.datasets[0].data = chartData[contentType][timeframe];
    lineChart.data.datasets[0].label = contentType.charAt(0).toUpperCase() + contentType.slice(1);

    // Change color based on contentType (optional)
    const colorMap = {
      courses: '#3498db',
      quizzes: '#e67e22',
      assessments: '#9b59b6'
    };
    lineChart.data.datasets[0].borderColor = colorMap[contentType];
    lineChart.data.datasets[0].backgroundColor = colorMap[contentType];

    lineChart.update();
  }