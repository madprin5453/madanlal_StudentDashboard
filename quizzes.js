document.addEventListener("DOMContentLoaded", () => {
  const upcomingQuizzesContainer = document.getElementById("upcoming-quizzes")
  const pastQuizzesContainer = document.getElementById("past-quizzes")
  const upcomingQuizzesTable = document.getElementById("upcoming-quizzes-table")
  const pastQuizzesTable = document.getElementById("past-quizzes-table")

  // Quiz data
  const upcomingQuizzes = [
    {
      id: 1,
      title: "Web Engineering Midterm",
      course: "Web Engineering",
      date: new Date(2025, 3, 15, 10, 0),
      duration: "60 minutes",
      questions: 30,
    },
    {
      id: 2,
      title: "Database Systems Quiz",
      course: "Database Systems",
      date: new Date(2025, 3, 18, 14, 30),
      duration: "45 minutes",
      questions: 20,
    },
    {
      id: 3,
      title: "Frontend Frameworks Assessment",
      course: "Frontend Frameworks",
      date: new Date(2025, 3, 22, 9, 0),
      duration: "90 minutes",
      questions: 40,
    },
  ]

  const pastQuizzes = [
    {
      id: 4,
      title: "HTML & CSS Basics",
      course: "Web Development",
      date: new Date(2025, 3, 1, 11, 0),
      duration: "30 minutes",
      score: 85,
    },
    {
      id: 5,
      title: "JavaScript Fundamentals",
      course: "Web Engineering",
      date: new Date(2025, 3, 5, 13, 0),
      duration: "45 minutes",
      score: 92,
    },
  ]

  // Format date
  function formatDate(date) {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return date.toLocaleDateString("en-US", options)
  }

  // Format time
  function formatTime(date) {
    const options = { hour: "numeric", minute: "numeric", hour12: true }
    return date.toLocaleTimeString("en-US", options)
  }

  // Render upcoming quizzes table
  if (upcomingQuizzesTable) {
    upcomingQuizzesTable.innerHTML = ""

    upcomingQuizzes.forEach((quiz) => {
      const row = document.createElement("tr")
      row.innerHTML = `
        <td class="font-medium">${quiz.title}</td>
        <td>${quiz.course}</td>
        <td>${formatDate(quiz.date)}</td>
        <td>${formatTime(quiz.date)}</td>
        <td>${quiz.duration}</td>
        <td class="text-right">
          <div class="quiz-actions">
            <button class="btn btn-outline">Set Reminder</button>
            <button class="btn btn-primary">Start Quiz</button>
          </div>
        </td>
      `
      upcomingQuizzesTable.appendChild(row)
    })
  }

  // Render past quizzes table
  if (pastQuizzesTable) {
    pastQuizzesTable.innerHTML = ""

    pastQuizzes.forEach((quiz) => {
      const row = document.createElement("tr")
      row.innerHTML = `
        <td class="font-medium">${quiz.title}</td>
        <td>${quiz.course}</td>
        <td>${formatDate(quiz.date)}</td>
        <td>${quiz.score}%</td>
        <td><span class="badge">Completed</span></td>
        <td class="text-right">
          <div class="quiz-actions">
            <button class="btn btn-primary">Review Quiz</button>
          </div>
        </td>
      `
      pastQuizzesTable.appendChild(row)
    })
  }

  // Render upcoming quizzes cards
  if (upcomingQuizzesContainer) {
    upcomingQuizzesContainer.innerHTML = ""

    upcomingQuizzes.forEach((quiz) => {
      const quizCard = document.createElement("div")
      quizCard.className = "card quiz-card"

      quizCard.innerHTML = `
        <div class="card-body">
          <div class="quiz-header">
            <div>
              <h3 class="quiz-title">${quiz.title}</h3>
              <span class="badge">${quiz.course}</span>
            </div>
            <div class="quiz-actions">
              <button class="btn btn-outline">Set Reminder</button>
              <button class="btn btn-primary">Prepare</button>
            </div>
          </div>
          <div class="quiz-meta">
            <span><i class="fas fa-calendar"></i> ${formatDate(quiz.date)}</span>
            <span><i class="fas fa-clock"></i> ${formatTime(quiz.date)}</span>
            <span><i class="fas fa-hourglass-half"></i> ${quiz.duration}</span>
          </div>
          <div class="quiz-alert">
            <i class="fas fa-exclamation-circle"></i>
            <p>This quiz is scheduled for ${formatDate(quiz.date)} at ${formatTime(quiz.date)}. It will contain ${quiz.questions} questions and last for ${quiz.duration}.</p>
          </div>
        </div>
      `

      upcomingQuizzesContainer.appendChild(quizCard)
    })
  }

  // Render past quizzes cards
  if (pastQuizzesContainer) {
    pastQuizzesContainer.innerHTML = ""

    pastQuizzes.forEach((quiz) => {
      const quizCard = document.createElement("div")
      quizCard.className = "card quiz-card"

      quizCard.innerHTML = `
        <div class="card-body">
          <div class="quiz-header">
            <div>
              <h3 class="quiz-title">${quiz.title}</h3>
              <span class="badge">${quiz.course}</span>
            </div>
            <div class="quiz-actions">
              <button class="btn btn-primary">Review Quiz</button>
            </div>
          </div>
          <div class="quiz-meta">
            <span><i class="fas fa-calendar"></i> ${formatDate(quiz.date)}</span>
            <span><i class="fas fa-clock"></i> ${quiz.duration}</span>
            <span><i class="fas fa-check-circle" style="color: var(--success);"></i> Score: ${quiz.score}%</span>
          </div>
        </div>
      `

      pastQuizzesContainer.appendChild(quizCard)
    })
  }
})
