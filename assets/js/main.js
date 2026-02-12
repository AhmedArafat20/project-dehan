// إعدادات عامة
const PHONE_LOCAL = "0577401516";
const PHONE_INTL = "966577401516"; // واتساب
const WA_LINK = `https://wa.me/${PHONE_INTL}`;
const TEL_LINK = `tel:${PHONE_LOCAL}`;

function setContactLinks() {
  document.querySelectorAll("[data-wa]").forEach(a => a.setAttribute("href", WA_LINK));
  document.querySelectorAll("[data-phone]").forEach(a => a.setAttribute("href", TEL_LINK));
}

// تفعيل لينك الصفحة الحالية
function setActiveNav() {
  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav a").forEach(a => {
    const href = a.getAttribute("href");
    if (href === path) a.classList.add("active");
  });
}

// منيو الموبايل
function mobileNav() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    nav.classList.toggle("mobile");
  });

  // قفل المنيو بعد الضغط على لينك
  nav.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => nav.classList.remove("mobile"));
  });

  // قفل المنيو عند الضغط خارجها
  document.addEventListener("click", (e) => {
    const isInside = nav.contains(e.target) || toggle.contains(e.target);
    if (!isInside) nav.classList.remove("mobile");
  });
}

// تأثير ظهور بسيط
function revealOnScroll() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (en.isIntersecting) en.target.classList.add("show");
    });
  }, { threshold: 0.12 });

  items.forEach(el => io.observe(el));
}

// فورم واتساب
function whatsappForm() {
  const form = document.querySelector("#waForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = (document.querySelector("#name")?.value || "").trim();
    const phone = (document.querySelector("#phone")?.value || "").trim();
    const msg = (document.querySelector("#message")?.value || "").trim();

    const text =
`مرحباً، معك ${name || "عميل"}.
رقم التواصل: ${phone || "غير مذكور"}.
تفاصيل الطلب:
${msg || "أحتاج عرض سعر وموعد معاينة."}

الموقع: الرياض`;

    const url = `${WA_LINK}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  });
}

setContactLinks();
setActiveNav();
mobileNav();
revealOnScroll();
whatsappForm();
