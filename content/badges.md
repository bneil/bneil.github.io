---
title: "Your Earned Badges"
slug: "badges"
layout: "single"
menu:
  main:
    parent: ""
    weight: -1
    params:
      hidden: true
_build:
  list: false
sitemap:
  changefreq: "monthly"
  priority: 0.1
  filename: "sitemap.xml"
  disable: true
DisableComments: true
---

## Behold, your findings!

Welcome, seeker of knowledge and secrets. Here are the badges you've earned on your journey through this site.

<div id="badge-container" style="display: flex; flex-wrap: wrap; gap: 20px; margin-top: 20px;">
  <!-- Badges will be dynamically inserted here by JavaScript -->
</div>

<style>
/* Gruvbox Light Theme */
.badge {
  border: 1px solid #bdae93;
  border-radius: 8px;
  padding: 15px;
  width: 200px;
  text-align: center;
  background-color: #fbf1c7;
  color: #3c3836;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
.badge:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
}
.badge.earned {
  border-color: #79740e;
  background-color: #b8bb26;
  color: #282828;
}
.badge-icon {
  font-size: 48px;
  margin-bottom: 10px;
  margin-top:10px;
}
.badge h3 {
  margin: 10px 0 5px 0;
  font-size: 1.1em;
  font-weight: bold;
  color: inherit;
}
.badge p {
  font-size: 0.9em;
  color: #504945;
  margin: 5px 0;
}
.badge small {
  opacity: 0.7;
  font-size: 0.8em;
  color: #665c54;
}

/* Gruvbox Dark Theme */
.dark .badge {
  background-color: #3c3836;
  border-color: #504945;
  color: #ebdbb2;
  box-shadow: 0 2px 4px rgba(0,0,0,0.3);
}
.dark .badge:hover {
  box-shadow: 0 4px 8px rgba(0,0,0,0.5);
}
.dark .badge.earned {
  background-color: #b8bb26;
  border-color: #79740e;
  color: #282828;
}
.dark .badge p {
  color: #a89984;
}
.dark .badge small {
  color: #928374;
}
</style>

<script>
document.addEventListener('DOMContentLoaded', function() {
    // Wait for badges.js to load and expose the badges
    function displayBadges() {
        console.log('Checking for window.badger...', !!window.badger);
        console.log('localStorage available:', typeof(Storage) !== "undefined");
        console.log('Raw localStorage userBadges:', localStorage.getItem('userBadges'));

        if (!window.badger || !window.badger.getAllBadges) {
            // Give up after 50 attempts (5 seconds) to prevent infinite loop
            if (!displayBadges.attempts) displayBadges.attempts = 0;
            displayBadges.attempts++;

            if (displayBadges.attempts > 50) {
                console.error('Failed to load badges.js after 5 seconds');
                document.getElementById('badge-container').innerHTML = '<p>Error: Badge system failed to load.</p>';
                return;
            }

            console.log('Waiting for badges.js to load...');
            setTimeout(displayBadges, 100);
            return;
        }

        const allBadges = window.badger.getAllBadges();
        const earnedBadges = JSON.parse(localStorage.getItem('userBadges') || '[]');
        const container = document.getElementById('badge-container');

        console.log('Earned badges:', earnedBadges);
        console.log('Total badges:', allBadges.length);

        if (allBadges.length === 0) {
            container.innerHTML = '<p>Loading badges...</p>';
            return;
        }

        allBadges.forEach(badge => {
            const isEarned = earnedBadges.includes(badge.id);
            const badgeElement = document.createElement('div');
            badgeElement.className = 'badge' + (isEarned ? ' earned' : '');
            badgeElement.innerHTML = `
                <div class="badge-icon">${badge.icon}</div>
                <h3>${badge.name}</h3>
                <p>${badge.description}</p>
                <small style="opacity: 0.7;">${isEarned ? 'Earned!' : 'Not earned yet'}</small>
            `;
            container.appendChild(badgeElement);
        });
    }

    displayBadges();
});
</script>
