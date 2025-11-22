'use strict';

const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

if (sidebarBtn && sidebar) {
  sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });
}

const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

if (testimonialsItem.length > 0 && modalContainer && modalCloseBtn && overlay && modalImg && modalTitle && modalText) {

  for (let i = 0; i < testimonialsItem.length; i++) {

    testimonialsItem[i].addEventListener("click", function () {

      const avatar = this.querySelector("[data-testimonials-avatar]");
      const title = this.querySelector("[data-testimonials-title]");
      const text = this.querySelector("[data-testimonials-text]");

      if (avatar) {
        modalImg.src = avatar.src || "";
        modalImg.alt = avatar.alt || "";
      }

      if (title) modalTitle.innerHTML = title.innerHTML;
      if (text) modalText.innerHTML = text.innerHTML;

      testimonialsModalFunc();
    });
  }

  modalCloseBtn.addEventListener("click", testimonialsModalFunc);
  overlay.addEventListener("click", testimonialsModalFunc);
}

const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }

    /* Handle contact form submission: route to local success page then return */
    if (form) {
      form.addEventListener("submit", function (e) {
        // Prevent default submit since we want to show the local success page
        e.preventDefault();

        try {
          // Save current page so the success page can return here
          sessionStorage.setItem("prevPage", location.href);
        } catch (err) {
          // ignore storage failures
        }

        // Redirect to the local success page
        location.href = "./submitsuccess.html";
      });
    }

    /* Auto-return logic for success page */
    const successContainer = document.querySelector('.success-container');
    if (successContainer) {
      // Try to get stored previous page, fallback to document.referrer
      const prev = sessionStorage.getItem('prevPage') || document.referrer || '';
      // Wait 3 seconds then go back (use stored URL if available)
      setTimeout(() => {
        if (prev && prev !== location.href) {
          // Navigate to stored previous page
          location.href = prev;
        } else {
          // Fallback: go back in history
          history.back();
        }
      }, 3000);
    }
}

let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}

const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}

const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let j = 0; j < pages.length; j++) {
      if (this.innerHTML.toLowerCase() === pages[j].dataset.page) {
        pages[j].classList.add("active");
        navigationLinks[j].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[j].classList.remove("active");
        navigationLinks[j].classList.remove("active");
      }
    }
  });
}

/* Certification filter (scoped) */
const certFilterBtns = document.querySelectorAll("[data-cert-filter-btn]");
const certItems = document.querySelectorAll(".cert-posts-list [data-filter-item]");

if (certFilterBtns.length && certItems.length) {
  // show all initially
  certItems.forEach(item => item.classList.add("active"));

  let lastCertBtn = certFilterBtns[0];

  certFilterBtns.forEach(btn => {
    btn.addEventListener("click", function () {
      const selectedCategory = this.innerText.toLowerCase();

      certFilterBtns.forEach(b => b.classList.remove("active"));
      this.classList.add("active");

      certItems.forEach(item => {
        const itemCategory = (item.dataset.category || "").toLowerCase();
        if (selectedCategory === "all" || selectedCategory === itemCategory) {
          item.classList.add("active");
        } else {
          item.classList.remove("active");
        }
      });

      lastCertBtn = this;
    });
  });
}

/* Certification mobile select (mirrors portfolio select behavior) */
const certSelect = document.querySelector("[data-cert-select]");
const certSelectItems = document.querySelectorAll("[data-cert-select-item]");
const certSelectValue = document.querySelector("[data-cert-selecct-value]");

if (certSelect) {
  certSelect.addEventListener("click", function () { elementToggleFunc(this); });

  for (let i = 0; i < certSelectItems.length; i++) {
    certSelectItems[i].addEventListener("click", function () {
      const selectedValue = this.innerText.toLowerCase();

      if (certSelectValue) certSelectValue.innerText = this.innerText;
      elementToggleFunc(certSelect);

      // update button active state
      if (certFilterBtns.length) {
        certFilterBtns.forEach(b => b.classList.remove('active'));
        for (let j = 0; j < certFilterBtns.length; j++) {
          if (certFilterBtns[j].innerText.toLowerCase() === selectedValue) {
            certFilterBtns[j].classList.add('active');
            break;
          }
        }
      }

      // apply filter to cert items
      for (let k = 0; k < certItems.length; k++) {
        const itemCategory = (certItems[k].dataset.category || '').toLowerCase();
        if (selectedValue === 'all' || selectedValue === itemCategory) {
          certItems[k].classList.add('active');
        } else {
          certItems[k].classList.remove('active');
        }
      }
    });
  }
}