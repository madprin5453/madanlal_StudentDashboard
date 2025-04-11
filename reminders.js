document.addEventListener("DOMContentLoaded", () => {
  // Initialize flatpickr for date inputs
  if (typeof flatpickr !== "undefined") {
    flatpickr("#date", {
      dateFormat: "Y-m-d",
      defaultDate: "today",
    })

    flatpickr("#edit-date", {
      dateFormat: "Y-m-d",
    })

    flatpickr("#calendar", {
      inline: true,
      dateFormat: "Y-m-d",
      onChange: (selectedDates, dateStr) => {
        filterRemindersByDate(dateStr)
      },
    })
  }

  // Reminder data
  const reminders = [
    {
      id: 1,
      title: "Web Engineering Assignment",
      description: "Complete the responsive design assignment",
      date: new Date().toISOString().split("T")[0],
      time: "14:00",
      course: "Web Engineering",
      priority: "high",
      completed: false,
    },
    {
      id: 2,
      title: "Database Quiz Preparation",
      description: "Review SQL queries and normalization",
      date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      time: "10:00",
      course: "Database Systems",
      priority: "medium",
      completed: false,
    },
    {
      id: 3,
      title: "Frontend Framework Project",
      description: "Start working on the React project",
      date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      time: "09:00",
      course: "Frontend Frameworks",
      priority: "low",
      completed: false,
    },
    {
      id: 4,
      title: "JavaScript Practice",
      description: "Complete exercises on closures and promises",
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      time: "15:30",
      course: "Web Development",
      priority: "medium",
      completed: true,
    },
  ]

  // DOM elements
  const todayRemindersContainer = document.getElementById("today-reminders")
  const upcomingRemindersContainer = document.getElementById("upcoming-reminders")
  const completedRemindersContainer = document.getElementById("completed-reminders")

  const addReminderModal = document.getElementById("add-reminder-modal")
  const editReminderModal = document.getElementById("edit-reminder-modal")

  const addReminderForm = document.getElementById("add-reminder-form")
  const editReminderForm = document.getElementById("edit-reminder-form")

  const saveReminderBtn = document.getElementById("save-reminder-btn")
  const updateReminderBtn = document.getElementById("update-reminder-btn")
  const addReminderBtn = document.getElementById("add-reminder-btn")

  // Format date for display
  function formatDate(dateStr) {
    const date = new Date(dateStr)
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  }

  // Check if a date is today
  function isToday(dateStr) {
    const today = new Date().toISOString().split("T")[0]
    return dateStr === today
  }

  // Render reminders
  function renderReminders() {
    // Today's reminders
    if (todayRemindersContainer) {
      todayRemindersContainer.innerHTML = ""

      const todayReminders = reminders.filter((reminder) => isToday(reminder.date) && !reminder.completed)

      if (todayReminders.length === 0) {
        todayRemindersContainer.innerHTML = `
          <div class="empty-state">
            <i class="fas fa-bell" style="font-size: 3rem; color: var(--text-secondary); margin-bottom: 1rem;"></i>
            <h3>No reminders for today</h3>
            <p>You don't have any reminders scheduled for today.</p>
          </div>
        `
      } else {
        todayReminders.forEach((reminder) => {
          const reminderItem = document.createElement("div")
          reminderItem.className = `reminder-item ${reminder.priority}`

          reminderItem.innerHTML = `
            <div class="reminder-content">
              <div class="reminder-title">
                ${reminder.title}
                <span class="priority-badge ${reminder.priority}">${reminder.priority}</span>
              </div>
              <p class="reminder-description">${reminder.description}</p>
              <div class="reminder-meta">
                <span><i class="fas fa-clock"></i> ${reminder.time}</span>
                <span><i class="fas fa-book"></i> ${reminder.course}</span>
              </div>
            </div>
            <div class="reminder-actions">
              <button class="btn btn-icon complete-btn" data-id="${reminder.id}" title="Mark as complete">
                <i class="far fa-check-circle"></i>
              </button>
              <button class="btn btn-icon edit-btn" data-id="${reminder.id}" title="Edit">
                <i class="fas fa-edit"></i>
              </button>
              <button class="btn btn-icon delete-btn" data-id="${reminder.id}" title="Delete">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          `

          todayRemindersContainer.appendChild(reminderItem)
        })
      }
    }

    // Upcoming reminders
    if (upcomingRemindersContainer) {
      upcomingRemindersContainer.innerHTML = ""

      const upcomingReminders = reminders.filter((reminder) => !isToday(reminder.date) && !reminder.completed)

      if (upcomingReminders.length === 0) {
        upcomingRemindersContainer.innerHTML = `
          <tr>
            <td colspan="5" class="empty-state">
              <i class="fas fa-bell" style="font-size: 2rem; color: var(--text-secondary); margin-bottom: 0.5rem;"></i>
              <p>No upcoming reminders</p>
            </td>
          </tr>
        `
      } else {
        upcomingReminders.forEach((reminder) => {
          const row = document.createElement("tr")

          row.innerHTML = `
            <td class="font-medium">${reminder.title}</td>
            <td>${formatDate(reminder.date)} at ${reminder.time}</td>
            <td>${reminder.course}</td>
            <td><span class="priority-badge ${reminder.priority}">${reminder.priority}</span></td>
            <td>
              <div class="reminder-actions">
                <button class="btn btn-icon complete-btn" data-id="${reminder.id}" title="Mark as complete">
                  <i class="far fa-check-circle"></i>
                </button>
                <button class="btn btn-icon edit-btn" data-id="${reminder.id}" title="Edit">
                  <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-icon delete-btn" data-id="${reminder.id}" title="Delete">
                  <i class="fas fa-trash"></i>
                </button>
              </div>
            </td>
          `

          upcomingRemindersContainer.appendChild(row)
        })
      }
    }

    // Completed reminders
    if (completedRemindersContainer) {
      completedRemindersContainer.innerHTML = ""

      const completedReminders = reminders.filter((reminder) => reminder.completed)

      if (completedReminders.length === 0) {
        completedRemindersContainer.innerHTML = `
          <div class="empty-state">
            <i class="fas fa-check-circle" style="font-size: 2rem; color: var(--text-secondary); margin-bottom: 0.5rem;"></i>
            <p>No completed reminders</p>
          </div>
        `
      } else {
        completedReminders.forEach((reminder) => {
          const completedItem = document.createElement("div")
          completedItem.className = "completed-item"

          completedItem.innerHTML = `
            <span><i class="fas fa-check-circle"></i> ${reminder.title}</span>
            <button class="btn btn-icon delete-btn" data-id="${reminder.id}" title="Delete">
              <i class="fas fa-trash"></i>
            </button>
          `

          completedRemindersContainer.appendChild(completedItem)
        })
      }
    }

    // Add event listeners to buttons
    document.querySelectorAll(".complete-btn").forEach((btn) => {
      btn.addEventListener("click", function () {
        const id = Number.parseInt(this.getAttribute("data-id"))
        toggleReminderComplete(id)
      })
    })

    document.querySelectorAll(".edit-btn").forEach((btn) => {
      btn.addEventListener("click", function () {
        const id = Number.parseInt(this.getAttribute("data-id"))
        openEditReminderModal(id)
      })
    })

    document.querySelectorAll(".delete-btn").forEach((btn) => {
      btn.addEventListener("click", function () {
        const id = Number.parseInt(this.getAttribute("data-id"))
        deleteReminder(id)
      })
    })
  }

  // Filter reminders by date
  function filterRemindersByDate(dateStr) {
    // Highlight the selected date's reminders
    const filteredReminders = reminders.filter((r) => r.date === dateStr && !r.completed)

    if (filteredReminders.length > 0) {
      window.showToast(`${filteredReminders.length} reminder(s) found for ${formatDate(dateStr)}`)
    } else {
      window.showToast(`No reminders for ${formatDate(dateStr)}`)
    }
  }

  // Toggle reminder complete status
  function toggleReminderComplete(id) {
    const reminder = reminders.find((r) => r.id === id)
    if (reminder) {
      reminder.completed = !reminder.completed
      renderReminders()

      window.showToast(`Reminder "${reminder.title}" marked as ${reminder.completed ? "completed" : "incomplete"}`)
    }
  }

  // Open edit reminder modal
  function openEditReminderModal(id) {
    const reminder = reminders.find((r) => r.id === id)
    if (reminder && editReminderModal) {
      document.getElementById("edit-id").value = reminder.id
      document.getElementById("edit-title").value = reminder.title
      document.getElementById("edit-description").value = reminder.description

      // Handle flatpickr if available
      const dateInput = document.getElementById("edit-date")
      if (dateInput._flatpickr) {
        dateInput._flatpickr.setDate(reminder.date)
      } else {
        dateInput.value = reminder.date
      }

      document.getElementById("edit-time").value = reminder.time
      document.getElementById("edit-course").value = reminder.course
      document.getElementById("edit-priority").value = reminder.priority

      editReminderModal.classList.add("active")
    }
  }

  // Delete reminder
  function deleteReminder(id) {
    const reminderIndex = reminders.findIndex((r) => r.id === id)
    if (reminderIndex !== -1) {
      const reminder = reminders[reminderIndex]
      reminders.splice(reminderIndex, 1)
      renderReminders()

      window.showToast(`Reminder "${reminder.title}" deleted`, "error")
    }
  }

  // Add new reminder
  function addReminder() {
    const title = document.getElementById("title").value
    const description = document.getElementById("description").value
    const date = document.getElementById("date").value
    const time = document.getElementById("time").value
    const course = document.getElementById("course").value
    const priority = document.getElementById("priority").value

    if (!title || !date || !time || !course) {
      window.showToast("Please fill in all required fields", "error")
      return
    }

    const newReminder = {
      id: reminders.length > 0 ? Math.max(...reminders.map((r) => r.id)) + 1 : 1,
      title,
      description,
      date,
      time,
      course,
      priority,
      completed: false,
    }

    reminders.push(newReminder)
    renderReminders()

    // Reset form
    addReminderForm.reset()
    addReminderModal.classList.remove("active")

    window.showToast(`Reminder "${title}" added successfully`)

    // Schedule notification for this reminder
    scheduleReminderNotification(newReminder)
  }

  // Update reminder
  function updateReminder() {
    const id = Number.parseInt(document.getElementById("edit-id").value)
    const title = document.getElementById("edit-title").value
    const description = document.getElementById("edit-description").value
    const date = document.getElementById("edit-date").value
    const time = document.getElementById("edit-time").value
    const course = document.getElementById("edit-course").value
    const priority = document.getElementById("edit-priority").value

    if (!title || !date || !time || !course) {
      window.showToast("Please fill in all required fields", "error")
      return
    }

    const reminderIndex = reminders.findIndex((r) => r.id === id)
    if (reminderIndex !== -1) {
      const updatedReminder = {
        ...reminders[reminderIndex],
        title,
        description,
        date,
        time,
        course,
        priority,
      }

      reminders[reminderIndex] = updatedReminder
      renderReminders()

      // Close modal
      editReminderModal.classList.remove("active")

      window.showToast(`Reminder "${title}" updated successfully`)

      // Reschedule notification
      scheduleReminderNotification(updatedReminder)
    }
  }

  // Schedule reminder notification
  function scheduleReminderNotification(reminder) {
    const now = new Date()
    const reminderDate = new Date(`${reminder.date}T${reminder.time}`)

    // If reminder is in the future
    if (reminderDate > now) {
      const timeUntilReminder = reminderDate.getTime() - now.getTime()

      // Schedule notification
      setTimeout(() => {
        if (!reminder.completed) {
          showReminderNotification(reminder)
        }
      }, timeUntilReminder)
    }
  }

  // Show reminder notification
  function showReminderNotification(reminder) {
    // Create notification popup
    const notification = document.createElement("div")
    notification.className = "reminder-notification"

    notification.innerHTML = `
      <div class="reminder-notification-header">
        <div class="reminder-notification-title">
          <i class="fas fa-bell"></i>
          Reminder
        </div>
        <button class="reminder-notification-close">&times;</button>
      </div>
      <div class="reminder-notification-body">
        <h3>${reminder.title}</h3>
        <p>${reminder.description}</p>
        <div class="reminder-notification-meta">
          <span><i class="fas fa-clock"></i> ${reminder.time}</span>
          <span><i class="fas fa-book"></i> ${reminder.course}</span>
        </div>
      </div>
      <div class="reminder-notification-footer">
        <button class="btn btn-sm btn-outline dismiss-btn">Dismiss</button>
        <button class="btn btn-sm btn-primary complete-notification-btn" data-id="${reminder.id}">Mark as Complete</button>
      </div>
    `

    document.body.appendChild(notification)

    // Show notification with animation
    setTimeout(() => {
      notification.classList.add("active")
    }, 10)

    // Add event listeners
    notification.querySelector(".reminder-notification-close").addEventListener("click", () => {
      notification.classList.remove("active")
      setTimeout(() => {
        document.body.removeChild(notification)
      }, 300)
    })

    notification.querySelector(".dismiss-btn").addEventListener("click", () => {
      notification.classList.remove("active")
      setTimeout(() => {
        document.body.removeChild(notification)
      }, 300)
    })

    notification.querySelector(".complete-notification-btn").addEventListener("click", function () {
      const id = Number.parseInt(this.getAttribute("data-id"))
      toggleReminderComplete(id)
      notification.classList.remove("active")
      setTimeout(() => {
        document.body.removeChild(notification)
      }, 300)
    })

    // Auto dismiss after 10 seconds
    setTimeout(() => {
      if (document.body.contains(notification)) {
        notification.classList.remove("active")
        setTimeout(() => {
          if (document.body.contains(notification)) {
            document.body.removeChild(notification)
          }
        }, 300)
      }
    }, 10000)
  }

  // Event listeners
  if (saveReminderBtn) {
    saveReminderBtn.addEventListener("click", addReminder)
  }

  if (updateReminderBtn) {
    updateReminderBtn.addEventListener("click", updateReminder)
  }

  if (addReminderBtn) {
    addReminderBtn.addEventListener("click", () => {
      if (addReminderModal) {
        addReminderModal.classList.add("active")
      }
    })
  }

  // Initial render
  renderReminders()

  // Schedule notifications for existing reminders
  reminders.forEach((reminder) => {
    if (!reminder.completed) {
      scheduleReminderNotification(reminder)
    }
  })

  // Check for reminders every minute
  setInterval(() => {
    const now = new Date()
    const currentHour = now.getHours()
    const currentMinute = now.getMinutes()
    const currentTimeStr = `${currentHour.toString().padStart(2, "0")}:${currentMinute.toString().padStart(2, "0")}`
    const currentDateStr = now.toISOString().split("T")[0]

    // Find reminders that are due now
    const dueReminders = reminders.filter((r) => !r.completed && r.date === currentDateStr && r.time === currentTimeStr)

    // Show notifications for due reminders
    dueReminders.forEach((reminder) => {
      showReminderNotification(reminder)
    })
  }, 60000) // Check every minute
})
