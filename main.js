document.addEventListener("DOMContentLoaded", () => {
  // Apply theme from localStorage
  const isDarkTheme = localStorage.getItem("darkTheme") === "true"
  if (isDarkTheme) {
    document.body.classList.add("dark-theme")
  }

  // Sidebar Toggle
  const sidebar = document.getElementById("sidebar")
  const mainContent = document.querySelector(".main-content")
  const sidebarToggle = document.getElementById("sidebar-toggle")

  if (sidebarToggle) {
    sidebarToggle.addEventListener("click", () => {
      sidebar.classList.toggle("active")
      sidebar.classList.toggle("collapsed")
      mainContent.classList.toggle("expanded")
    })
  }

  // Tab functionality
  const tabButtons = document.querySelectorAll(".tab-button")

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const tabId = button.getAttribute("data-tab")

      // Remove active class from all buttons and content
      document.querySelectorAll(".tab-button").forEach((btn) => {
        btn.classList.remove("active")
      })

      document.querySelectorAll(".tab-content").forEach((content) => {
        content.classList.remove("active")
      })

      // Add active class to clicked button and corresponding content
      button.classList.add("active")
      document.getElementById(`${tabId}-tab`).classList.add("active")
    })
  })

  // Settings tab functionality
  const settingsNavItems = document.querySelectorAll(".settings-nav-item")

  settingsNavItems.forEach((item) => {
    item.addEventListener("click", () => {
      const tabId = item.getAttribute("data-tab")

      // Remove active class from all nav items and tabs
      document.querySelectorAll(".settings-nav-item").forEach((navItem) => {
        navItem.classList.remove("active")
      })

      document.querySelectorAll(".settings-tab").forEach((tab) => {
        tab.classList.remove("active")
      })

      // Add active class to clicked nav item and corresponding tab
      item.classList.add("active")
      document.getElementById(`${tabId}-tab`).classList.add("active")
    })
  })

  // Modal functionality
  const modals = document.querySelectorAll(".modal")
  const modalTriggers = document.querySelectorAll('[id$="-btn"]')
  const closeButtons = document.querySelectorAll('.close-btn, [id$="-cancel-btn"]')

  modalTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const modalId = trigger.id.replace("-btn", "-modal")
      const modal = document.getElementById(modalId)

      if (modal) {
        modal.classList.add("active")
      }
    })
  })

  closeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const modal = button.closest(".modal")
      if (modal) {
        modal.classList.remove("active")
      }
    })
  })

  // Close modal when clicking outside
  modals.forEach((modal) => {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.remove("active")
      }
    })
  })

  // Toast notification function
  window.showToast = (message, type = "success") => {
    // Remove existing toasts
    const existingToasts = document.querySelectorAll(".toast")
    existingToasts.forEach((toast) => {
      document.body.removeChild(toast)
    })

    const toast = document.createElement("div")
    toast.className = `toast ${type}`
    toast.innerHTML = `
      <div class="toast-content">
        <i class="fas ${type === "success" ? "fa-check-circle" : "fa-exclamation-circle"}"></i>
        <span>${message}</span>
      </div>
      <button class="toast-close">&times;</button>
    `

    document.body.appendChild(toast)

    setTimeout(() => {
      toast.classList.add("show")
    }, 10)

    setTimeout(() => {
      toast.classList.remove("show")
      setTimeout(() => {
        if (document.body.contains(toast)) {
          document.body.removeChild(toast)
        }
      }, 300)
    }, 3000)

    toast.querySelector(".toast-close").addEventListener("click", () => {
      toast.classList.remove("show")
      setTimeout(() => {
        if (document.body.contains(toast)) {
          document.body.removeChild(toast)
        }
      }, 300)
    })
  }
})
