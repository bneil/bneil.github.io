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

## My Collection

Welcome, seeker of knowledge and secrets. Here are the badges you've earned on your journey through this site.

<div id="badge-container" style="display: flex; flex-wrap: wrap; gap: 20px; margin-top: 20px;">
  <!-- Badges will be dynamically inserted here by JavaScript -->
</div>

<style>
.badge {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 15px;
  width: 200px;
  text-align: center;
  background-color: #f9f9f9;
  transition: transform 0.2s;
}
.badge:hover {
  transform: translateY(-5px);
}
.badge.earned {
  border-color: #28a745;
  background-color: #e9f5ec;
}
.badge-icon {
  font-size: 48px;
}
.badge h3 {
  margin: 10px 0 5px 0;
  font-size: 1.1em;
}
.badge p {
  font-size: 0.9em;
  color: #555;
}
.dark .badge {
    background-color: #2d2d2d;
    border-color: #444;
    color: #f1f1f1;
}
.dark .badge.earned {
    background-color: #1e3a2e;
    border-color: #28a745;
    color: #f1f1f1;
}
.dark .badge p {
    color: #ccc;
}
</style>

<script>
// This script will run on the badges page to display the earned badges.
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
