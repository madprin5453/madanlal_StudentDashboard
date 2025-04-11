document.addEventListener("DOMContentLoaded", () => {
  // Profile photo upload
  const photoUpload = document.getElementById("photo-upload")
  const uploadBtn = document.getElementById("upload-btn")
  const photoPreview = document.getElementById("photo-preview")
  const profileImage = document.getElementById("profile-image")
  const savePhotoBtn = document.getElementById("save-photo-btn")
  const changePhotoBtn = document.getElementById("change-photo-btn")
  const photoModal = document.getElementById("photo-modal")
  const photoCancelBtn = document.getElementById("photo-cancel-btn")

  // Profile form
  const profileForm = document.getElementById("profile-form")
  const saveProfileBtn = document.getElementById("save-profile-btn")
  const nameInput = document.getElementById("name")
  const emailInput = document.getElementById("email")

  // Password form
  const passwordForm = document.getElementById("password-form")
  const updatePasswordBtn = document.getElementById("update-password-btn")

  // Theme toggle
  const themeToggle = document.getElementById("theme-toggle")

  // Settings navigation
  const settingsNavItems = document.querySelectorAll(".settings-nav-item")
  const settingsTabs = document.querySelectorAll(".settings-tab")

  // Open photo modal
  if (changePhotoBtn && photoModal) {
    changePhotoBtn.addEventListener("click", () => {
      photoModal.classList.add("active")
    })
  }

  // Close photo modal
  if (photoCancelBtn && photoModal) {
    photoCancelBtn.addEventListener("click", () => {
      photoModal.classList.remove("active")
    })
  }

  // Trigger file input when upload button is clicked
  if (uploadBtn && photoUpload) {
    uploadBtn.addEventListener("click", () => {
      photoUpload.click()
    })
  }

  // Preview uploaded photo
  if (photoUpload && photoPreview) {
    photoUpload.addEventListener("change", function () {
      if (this.files && this.files[0]) {
        const reader = new FileReader()

        reader.onload = (e) => {
          photoPreview.src = e.target.result
        }

        reader.readAsDataURL(this.files[0])
      }
    })
  }

  // Save photo
  if (savePhotoBtn && profileImage && photoPreview) {
    savePhotoBtn.addEventListener("click", () => {
      profileImage.src = photoPreview.src

      // Update all profile images across the app
      const allProfileImages = document.querySelectorAll(".avatar")
      allProfileImages.forEach((img) => {
        img.src = photoPreview.src
      })

      photoModal.classList.remove("active")
      window.showToast("Profile photo updated successfully")
    })
  }

  // Save profile
  if (saveProfileBtn && profileForm) {
    saveProfileBtn.addEventListener("click", () => {
      const name = nameInput ? nameInput.value : ""
      const email = emailInput ? emailInput.value : ""

      // Update profile name across the app
      if (name) {
        const profileNames = document.querySelectorAll(".user-profile span")
        profileNames.forEach((span) => {
          span.textContent = name
        })
      }

      window.showToast("Profile information updated successfully")
    })
  }

  // Update password
  if (updatePasswordBtn && passwordForm) {
    updatePasswordBtn.addEventListener("click", () => {
      const currentPassword = document.getElementById("current-password").value
      const newPassword = document.getElementById("new-password").value
      const confirmPassword = document.getElementById("confirm-password").value

      if (!currentPassword || !newPassword || !confirmPassword) {
        window.showToast("Please fill in all password fields", "error")
        return
      }

      if (newPassword !== confirmPassword) {
        window.showToast("New passwords do not match", "error")
        return
      }

      window.showToast("Password updated successfully")

      // Reset form
      passwordForm.reset()
    })
  }

  // Toggle theme
  if (themeToggle) {
    // Check if dark theme is stored in localStorage
    const isDarkTheme = localStorage.getItem("darkTheme") === "true"

    // Apply theme based on localStorage
    if (isDarkTheme) {
      document.body.classList.add("dark-theme")
      themeToggle.checked = true
    }

    themeToggle.addEventListener("change", function () {
      if (this.checked) {
        document.body.classList.add("dark-theme")
        localStorage.setItem("darkTheme", "true")
        window.showToast("Dark theme enabled")
      } else {
        document.body.classList.remove("dark-theme")
        localStorage.setItem("darkTheme", "false")
        window.showToast("Light theme enabled")
      }
    })
  }

  // Settings navigation
  if (settingsNavItems && settingsTabs) {
    settingsNavItems.forEach((item) => {
      item.addEventListener("click", function () {
        const tabId = this.getAttribute("data-tab")

        // Remove active class from all tabs and nav items
        settingsNavItems.forEach((navItem) => navItem.classList.remove("active"))
        settingsTabs.forEach((tab) => tab.classList.remove("active"))

        // Add active class to clicked nav item and corresponding tab
        this.classList.add("active")
        document.getElementById(`${tabId}-tab`).classList.add("active")
      })
    })
  }

  // Settings options toggles
  const settingsToggles = document.querySelectorAll(".settings-option .toggle input")
  settingsToggles.forEach((toggle) => {
    toggle.addEventListener("change", function () {
      const settingName = this.closest(".settings-option").querySelector("h4").textContent
      window.showToast(`${settingName} setting ${this.checked ? "enabled" : "disabled"}`)
    })
  })
})
