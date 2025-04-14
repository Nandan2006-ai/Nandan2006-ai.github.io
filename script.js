// script.js

// ========== Preloader ==========
window.addEventListener('load', () => {
  document.querySelector('.preloader').style.display = 'none';
});

// ========== Smooth Scrolling ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// ========== Q2: Event Tracking (Clicks + Views) ==========
// Custom element type classifier
function getElementType(element) {
  const tag = element.tagName.toLowerCase();
  const classList = element.classList;

  if (tag === 'img') return 'image';
  if (tag === 'a' && element.href) return 'hyperlink';
  if (tag === 'button') return 'button';
  if (classList.contains('skill-card')) return 'skill-card';
  if (tag === 'section') return 'section';
  if (['h1', 'h2', 'h3'].includes(tag)) return 'heading';
  return 'text-element'; // Default for paragraphs, divs etc
}

// Click Tracking
document.addEventListener('click', (event) => {
  const type = getElementType(event.target);
  console.log(`${new Date().toISOString()}, click, ${type}`);
});

// View Tracking with Intersection Observer
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const type = getElementType(entry.target);
      console.log(`${new Date().toISOString()}, view, ${type}`);
      observer.unobserve(entry.target); // Log once per element
    }
  });
}, { threshold: 0.5 });

// Observe important elements
document.querySelectorAll(
  'section, img, .skill-card, h1, h2, h3, p, a'
).forEach(el => observer.observe(el));

// ========== Q3: Text Analysis Tool ==========
function analyzeText() {
  const text = document.getElementById('inputText').value;
  
  // Basic Statistics
  const letters = text.replace(/[^a-zA-Z]/g, '').length;
  const words = text.trim().split(/\s+/).filter(w => w).length;
  const spaces = (text.match(/ /g) || []).length;
  const newlines = (text.match(/\n/g) || []).length;
  const symbols = text.replace(/[\w\s]/g, '').length;

  // Enhanced Word Lists (Expand as needed)
  const PRONOUNS = ['i', 'you', 'he', 'she', 'we', 'they', 'it', 'me', 'us', 'them'];
  const PREPOSITIONS = ['in', 'on', 'at', 'by', 'for', 'with', 'about', 'between', 'under', 'over'];
  const ARTICLES = ['a', 'an']; // Only indefinite articles

  // Case-insensitive counting
  const countGroup = (words, text) => words.reduce((acc, word) => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    acc[word] = (text.match(regex) || []).length;
    return acc;
  }, {});

  // Generate counts
  const pronounCounts = countGroup(PRONOUNS, text);
  const prepositionCounts = countGroup(PREPOSITIONS, text);
  const articleCounts = countGroup(ARTICLES, text);

  // Display Results
  document.getElementById('results').innerHTML = `
    <div class="stats-box">
      <h3>Basic Statistics</h3>
      <p>Letters: ${letters}</p>
      <p>Words: ${words}</p>
      <p>Spaces: ${spaces}</p>
      <p>Newlines: ${newlines}</p>
      <p>Special Symbols: ${symbols}</p>
    </div>

    <div class="analysis-box">
      <h3>Pronouns Found</h3>
      <pre>${JSON.stringify(pronounCounts, null, 2)}</pre>
    </div>

    <div class="analysis-box">
      <h3>Prepositions Found</h3>
      <pre>${JSON.stringify(prepositionCounts, null, 2)}</pre>
    </div>

    <div class="analysis-box">
      <h3>Indefinite Articles</h3>
      <pre>${JSON.stringify(articleCounts, null, 2)}</pre>
    </div>
  `;
}