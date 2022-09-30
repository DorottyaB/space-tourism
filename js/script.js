const mobileNav = document.querySelector('.hamburger');
const closeBtn = document.querySelector('.close');
const nav = document.querySelector('.navigation');
const hr = document.querySelector('.line');
const cta = document.querySelector('.cta-container');
const destinationLinks = document.querySelectorAll('.destination-link');
const crewLinks = document.querySelectorAll('.crew-link');
const technologyLinks = document.querySelectorAll('.technology-link');

if (window.innerWidth <= 599) {
  mobileNav.classList.remove('hidden');
}

if (window.innerWidth >= 600) {
  nav.classList.remove('hidden');
}

if (window.innerWidth >= 1400) {
  hr.classList.remove('hidden');
}

if (cta) {
  cta.onclick = function () {
    location.href = 'pages/destinations.html';
  };
}

const toggleNav = () => {
  nav.classList.toggle('hidden');
  mobileNav.classList.toggle('hidden');
  closeBtn.classList.toggle('hidden');
};

const getTopic = e => {
  const element = e.target;
  const topic = element.getAttribute('id');
  return topic;
};

const updateImg = (element, source, topic) => {
  if (element.nodeName === 'DIV') {
    if (window.innerWidth <= 1000) {
      element.style.backgroundImage = `url(../images/${source}/image-${topic}-landscape.jpg)`;
    } else {
      element.style.backgroundImage = `url(../images/${source}/image-${topic}-portrait.jpg)`;
    }
  } else {
    element.setAttribute('src', `../images/${source}/image-${topic}.png`);
    element.setAttribute('alt', `${topic}`);
  }
};

const updateSubheading = e => {
  const topic = getTopic(e);
  const subheading = document.querySelector('h6');
  if (topic === 'douglas-hurley') {
    subheading.textContent = 'Commander';
  } else if (topic === 'mark-shuttleworth') {
    subheading.textContent = 'Mission Specialist';
  } else if (topic === 'victor-glover') {
    subheading.textContent = 'Pilot';
  } else {
    subheading.textContent = 'Flight Engineer';
  }
};

const updateHeading = topic => {
  const heading = document.querySelector('h2');
  const modifiedString = topic.replace('-', ' ');
  heading.textContent = modifiedString;
};

const updateText = topic => {
  const paragraphs = document.querySelectorAll('.text');
  paragraphs.forEach(p => {
    const id = p.getAttribute('id');
    if (id === topic) {
      p.classList.remove('hidden');
    } else {
      p.classList.add('hidden');
    }
  });
};

const destinations = [
  {
    name: 'Moon',
    distance: '384,400 km',
    time: '3 days',
  },
  {
    name: 'Mars',
    distance: '225 mil. km',
    time: '9 months',
  },
  {
    name: 'Europa',
    distance: '628 mil. km',
    time: '3 years',
  },
  {
    name: 'Titan',
    distance: '1.6 bil. km',
    time: '7 years',
  },
];

const updateInfo = e => {
  const topic = getTopic(e);
  const distance = document.getElementById('distance');
  const time = document.getElementById('time');

  for (let item of destinations) {
    if (topic === item.name) {
      distance.textContent = item.distance;
      time.textContent = item.time;
    }
  }
};

const updatePage = e => {
  e.target.classList.add('active');
  let topic = getTopic(e);
  updateHeading(topic);
  updateText(topic);
  const parentEl = e.target.parentElement;
  const category = parentEl.getAttribute('id');
  const img = document.getElementById(`${category}-img`);
  topic = topic.toLowerCase();
  updateImg(img, category, topic);

  if (category === 'destination') {
    destinationLinks.forEach(link => {
      if (link !== e.target) {
        link.classList.remove('active');
      }
    });
  } else if (category === 'crew') {
    crewLinks.forEach(link => {
      if (link !== e.target) {
        link.classList.remove('active');
      }
    });
  } else if (category === 'technology') {
    technologyLinks.forEach(link => {
      if (link !== e.target) {
        link.classList.remove('active');
      }
    });
  }
};

mobileNav.addEventListener('click', toggleNav);
closeBtn.addEventListener('click', toggleNav);
destinationLinks.forEach(link =>
  link.addEventListener('click', e => {
    updatePage(e);
    updateInfo(e);
  })
);
crewLinks.forEach(link =>
  link.addEventListener('click', e => {
    updatePage(e);
    updateSubheading(e);
  })
);
technologyLinks.forEach(link => link.addEventListener('click', updatePage));
