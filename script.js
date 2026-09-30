const zoneData = {
  arena: {
    name: 'Esports Arena',
    description:
      'Премиальная зона для соревновательной игры: мощные ПК, быстрые мониторы, профессиональная периферия и стабильный интернет для CS2, Valorant, Dota 2, Apex и любого другого тайтла с высоким уровнем конкуренции.',
    price: '399 ₽ / час',
    specs: ['RTX 4080 SUPER', 'Intel i7-14700K', '32 GB DDR5', '240 Hz IPS', '2.5 Gbit интернет'],
    images: [
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=900&q=80'
    ]
  },
  console: {
    name: 'Console Lounge',
    description:
      'Комфортная зона для PS5, Xbox и кооперативных вечеров: мягкие кресла, качественная звуковая сцена, большой экран и атмосфера, в которой можно расслабиться после работы или провести вечер с друзьями.',
    price: '499 ₽ / час',
    specs: ['PS5 Pro / Xbox Series X', '4K OLED 120 Hz', 'Dolby Atmos', 'Мягкие recliners', 'Кооперативный лаунж'],
    images: [
      'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1526509705337-2c92d1f6d8ce?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=900&q=80'
    ]
  },
  studio: {
    name: 'Creative Lab',
    description:
      'Для стриминга, монтажа, работы, обучения и креативных проектов — здесь есть всё, чтобы вы могли сосредоточиться на задаче: быстрый интернет, мощный ПК, удобное пространство и поддержка современного рабочего потока.',
    price: '299 ₽ / час',
    specs: ['RTX 4070 Ti', 'AMD Ryzen 9 7900', '64 GB RAM', '4K monitor', 'Стриминг + монтаж'],
    images: [
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80'
    ]
  }
};

const revealItems = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.18,
  }
);

revealItems.forEach((item) => revealObserver.observe(item));

const zoneTabs = document.querySelectorAll('.zone-tab');
const zoneMainImage = document.getElementById('zone-main-image');
const zoneName = document.getElementById('zone-name');
const zoneDescription = document.getElementById('zone-description');
const zonePrice = document.getElementById('zone-price');
const zoneSpecs = document.getElementById('zone-specs');
const zoneThumbs = document.getElementById('zone-thumbs');

function renderZone(zoneKey) {
  const zone = zoneData[zoneKey];
  if (!zone) return;

  zoneName.textContent = zone.name;
  zoneDescription.textContent = zone.description;
  zonePrice.textContent = zone.price;
  zoneMainImage.src = zone.images[0];
  zoneMainImage.alt = zone.name;

  zoneSpecs.innerHTML = zone.specs.map((spec) => `<li>${spec}</li>`).join('');

  zoneThumbs.innerHTML = zone.images
    .map(
      (image, index) => `
        <button class="zone-thumb ${index === 0 ? 'is-active' : ''}" type="button" data-image="${image}" data-index="${index}" aria-label="Показать фото ${index + 1}">
          <img src="${image}" alt="${zone.name} фото ${index + 1}" />
        </button>
      `
    )
    .join('');

  zoneTabs.forEach((tab) => {
    tab.classList.toggle('is-active', tab.dataset.zone === zoneKey);
  });

  zoneThumbs.querySelectorAll('.zone-thumb').forEach((thumb) => {
    thumb.addEventListener('click', () => {
      const image = thumb.dataset.image;
      zoneMainImage.src = image;
      zoneThumbs.querySelectorAll('.zone-thumb').forEach((item) => item.classList.remove('is-active'));
      thumb.classList.add('is-active');
    });
  });
}

zoneTabs.forEach((tab) => {
  tab.addEventListener('click', () => renderZone(tab.dataset.zone));
});

renderZone('arena');

const heroVisual = document.querySelector('.hero-visual');
const monitorCard = document.querySelector('.monitor-card');

if (heroVisual && monitorCard) {
  heroVisual.addEventListener('pointermove', (event) => {
    const rect = heroVisual.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    const rotateY = (x - 0.5) * 14;
    const rotateX = (0.5 - y) * 12;

    monitorCard.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    monitorCard.style.boxShadow = `0 32px 90px rgba(6, 10, 18, 0.72), 0 0 36px rgba(97, 208, 255, 0.18), ${(-rotateY * 2).toFixed(2)}px ${(-rotateX * 2).toFixed(2)}px 30px rgba(157, 123, 255, 0.15)`;
  });

  heroVisual.addEventListener('pointerleave', () => {
    monitorCard.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) translateY(0)';
    monitorCard.style.boxShadow = '0 32px 90px rgba(6, 10, 18, 0.72), inset 0 0 0 1px rgba(255, 255, 255, 0.02), 0 0 32px rgba(97, 208, 255, 0.15)';
  });
}

const navToggle = document.querySelector('.nav-toggle');
const navPanel = document.querySelector('.nav-panel');

if (navToggle && navPanel) {
  navToggle.addEventListener('click', () => {
    const isOpen = navPanel.classList.toggle('nav-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navPanel.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navPanel.classList.remove('nav-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const bookingForm = document.querySelector('#booking');
if (bookingForm) {
  bookingForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const button = bookingForm.querySelector('button');
    const originalText = button.textContent;
    button.textContent = 'Место забронировано';
    button.disabled = true;

    setTimeout(() => {
      button.textContent = originalText;
      button.disabled = false;
      bookingForm.reset();
    }, 1800);
  });
}
