document.addEventListener("DOMContentLoaded", () => {
  const coursesContainer = document.getElementById("courses-container")
  const viewToggle = document.getElementById("view-toggle")

  // Course data
  const courses = [
    {
      id: 1,
      title: "Web Engineering",
      instructor: "Dr. Sarah Johnson",
      icon: "fa-code",
      color: "blue",
      progress: 75,
      totalLessons: 24,
      completedLessons: 18,
      duration: "8 weeks",
    },
    {
      id: 2,
      title: "Database Systems",
      instructor: "Prof. Michael Chen",
      icon: "fa-database",
      color: "green",
      progress: 45,
      totalLessons: 20,
      completedLessons: 9,
      duration: "6 weeks",
    },
    {
      id: 3,
      title: "Web Development",
      instructor: "Dr. Emily Rodriguez",
      icon: "fa-globe",
      color: "purple",
      progress: 90,
      totalLessons: 30,
      completedLessons: 27,
      duration: "10 weeks",
    },
    {
      id: 4,
      title: "Backend Development",
      instructor: "Prof. James Wilson",
      icon: "fa-server",
      color: "orange",
      progress: 60,
      totalLessons: 22,
      completedLessons: 13,
      duration: "8 weeks",
    },
    {
      id: 5,
      title: "Frontend Frameworks",
      instructor: "Dr. Lisa Thompson",
      icon: "fa-code",
      color: "red",
      progress: 30,
      totalLessons: 20,
      completedLessons: 6,
      duration: "7 weeks",
    },
  ]

  // Function to render courses
  function renderCourses(isListView = true) {
    coursesContainer.innerHTML = ""

    courses.forEach((course) => {
      const courseCard = document.createElement("div")
      courseCard.className = `card course-card ${isListView ? "list-view" : ""}`

      courseCard.innerHTML = `
        <div class="card-body">
          <div class="course-header">
            <div class="course-icon ${course.color}">
              <i class="fas ${course.icon}"></i>
            </div>
            <div class="course-info">
              <h3 class="course-title">${course.title}</h3>
              <p class="course-instructor">${course.instructor}</p>
              <div class="course-meta">
                <span><i class="fas fa-clock"></i> ${course.duration}</span>
                <span><i class="fas fa-book"></i> ${course.totalLessons} lessons</span>
              </div>
              <div class="course-progress">
                <div class="course-progress-header">
                  <span>Progress</span>
                  <span>${course.progress}%</span>
                </div>
                <div class="progress-bar">
                  <div class="progress-fill" style="width: ${course.progress}%"></div>
                </div>
                <div class="course-meta" style="margin-top: 0.5rem;">
                  <span><i class="fas fa-check-circle"></i> ${course.completedLessons}/${course.totalLessons} lessons completed</span>
                </div>
              </div>
            </div>
          </div>
          <div class="course-actions">
            <button class="btn btn-primary">Continue Learning</button>
          </div>
        </div>
      `

      coursesContainer.appendChild(courseCard)
    })
  }

  // Initial render
  renderCourses(true)

  // Toggle view
  if (viewToggle) {
    viewToggle.addEventListener("change", function () {
      renderCourses(this.checked)
    })
  }
})
