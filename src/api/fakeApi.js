// src/api/fakeApi.js
// Fake API using localStorage, now with university support

const delay = ms => new Promise(res => setTimeout(res, ms));

/**
 * Register a new user.
 * Expects: { name, email, password, university }
 * Throws if email already exists.
 */
export const register = async ({ name, email, password, university }) => {
  await delay(500);
  const users = JSON.parse(localStorage.getItem('users') || '[]');

  // email uniqueness check
  if (users.find(u => u.email === email)) {
    throw new Error('User already exists');
  }

  // Create and persist new user
  const user = {
    id: Date.now().toString(),
    name,
    email,
    password,
    university,       // store university
    createdAt: new Date().toISOString()
  };
  users.push(user);
  localStorage.setItem('users', JSON.stringify(users));

  // Keep them "logged in"
  localStorage.setItem('token', user.id);
  localStorage.setItem('user', JSON.stringify(user));

  return { token: user.id, user };
};

/**
 * Log in an existing user.
 * Expects: { email, password }
 * Throws on invalid credentials.
 */
export const login = async ({ email, password }) => {
  await delay(500);
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    throw new Error('Invalid credentials');
  }

  // Persist session
  localStorage.setItem('token', user.id);
  localStorage.setItem('user', JSON.stringify(user));

  return { token: user.id, user };
};

/**
 * Get the current authenticated profile.
 */
export const getProfile = async () => {
  await delay(200);
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) throw new Error('Not authenticated');
  return user;
};

/**
 * Skill & booking methods unchanged...
 */
export const getSkills = async () => {
  await delay(300);
  return JSON.parse(localStorage.getItem('skills') || '[]');
};

export const createSkill = async ({ title, description, tags }) => {
  await delay(300);
  const skills = JSON.parse(localStorage.getItem('skills') || '[]');
  const skill = {
    id: Date.now().toString(),
    title,
    description,
    tags,
    user: JSON.parse(localStorage.getItem('user'))
  };
  skills.push(skill);
  localStorage.setItem('skills', JSON.stringify(skills));
  return skill;
};

export const createBooking = async ({ skillId, timeSlot }) => {
  await delay(300);
  const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
  const booking = {
    id: Date.now().toString(),
    skillId,
    timeSlot,
    user: JSON.parse(localStorage.getItem('user')),
    status: 'pending'
  };
  bookings.push(booking);
  localStorage.setItem('bookings', JSON.stringify(bookings));
  return booking;
};

export const getMyBookings = async () => {
  await delay(300);
  const user = JSON.parse(localStorage.getItem('user'));
  const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
  return bookings.filter(b => b.user.id === user.id);
};

export const updateProfile = async updatedData => {
  await delay(300);
  // load all users & current
  const users   = JSON.parse(localStorage.getItem('users')   || '[]');
  const current = JSON.parse(localStorage.getItem('user'));

  // merge & save
  const updated = { ...current, ...updatedData };
  const newUsers = users.map(u => u.id === updated.id ? updated : u);
  localStorage.setItem('users', JSON.stringify(newUsers));
  localStorage.setItem('user',  JSON.stringify(updated));

  return updated;
};


// Dummy mentor datasets
const MENTORS = [
  // Top Rated
  {
    id: 'm1',
    name: 'Alex Chen',
    avatar: '/avatars/alex.jpg',
    rating: 4.9,
    tags: ['React','Node.js'],
    available: false,
    role: 'Full Stack Developer',
    rate: 25,
    reviews: 124
  },
  {
    id: 'm2',
    name: 'Sarah Kim',
    avatar: '/avatars/sarah.jpg',
    rating: 4.8,
    tags: ['Python','ML'],
    available: false,
    role: 'Data Scientist',
    rate: 30,
    reviews: 98
  },
  // Available Now
  {
    id: 'm3',
    name: 'David Park',
    avatar: '/avatars/david.jpg',
    rating: 4.9,
    tags: ['JavaScript','React','Node.js'],
    available: true,
    role: 'Full Stack Developer',
    rate: 25,
    reviews: 124
  },
  {
    id: 'm4',
    name: 'Emma Wilson',
    avatar: '/avatars/emma.jpg',
    rating: 4.7,
    tags: ['HTML/CSS','Vue.js'],
    available: true,
    role: 'Frontend Developer',
    rate: 20,
    reviews: 89
  },
  // Add more mentors as needed...
];

/**
 * Get top-rated mentors
 */
export const getTopRatedMentors = async () => {
  await delay(300);
  return MENTORS
    .filter(m => !m.available)
    .sort((a, b) => b.rating - a.rating);
};

/**
 * Get mentors who are available now
 */
export const getAvailableMentors = async () => {
  await delay(300);
  return MENTORS.filter(m => m.available);
};

/**
 * Search mentors or tags
 * @param {string} query
 */
export const searchMentors = async query => {
  await delay(300);
  if (!query) return MENTORS;
  const q = query.toLowerCase();
  return MENTORS.filter(m =>
    m.name.toLowerCase().includes(q) ||
    m.tags.some(tag => tag.toLowerCase().includes(q))
  );
};
// src/api/fakeApi.js
// …existing code…

/**
 * Fetch a single mentor by id
 */
export const getMentorById = async id => {
  await delay(300);
  const mentors = JSON.parse(localStorage.getItem('mentors')) || MENTORS;
  return mentors.find(m => m.id === id);
};

/**
 * Fetch availability for a mentor (next 4 days)
 * Returns array of { date: ISOString }
 */
export const getAvailability = async mentorId => {
  await delay(200);
  const today = new Date();
  return Array.from({ length: 4 }, (_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() + i);
    return { date: d.toISOString() };
  });
};
// src/api/fakeApi.js
// …existing exports…

/**
 * Returns an array of available dates (ISO strings) for the next 30 days.
 */
export const getScheduleDates = async mentorId => {
  await delay(200);
  const today = new Date();
  return Array.from({ length: 30 }, (_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() + i);
    return d.toISOString();
  });
};

/**
 * Given a date ISO (yyyy-mm-ddT..), returns available time slots.
 */
export const getScheduleTimeSlots = async (mentorId, dateIso) => {
  await delay(200);
  // Dummy slots 9–16, disable the second slot arbitrarily
  const hours = [9, 10, 11, 14, 15, 16];
  return hours.map((h, idx) => ({
    time: `${h.toString().padStart(2,'0')}:00`,
    available: idx !== 1 // make 10:00 AM unavailable
  }));
};
