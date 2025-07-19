// =============================================================================
// Badge System Logic
// =============================================================================

(function() {
    // -------------------------------------------------------------------------
    // Configuration
    // -------------------------------------------------------------------------

    // All possible badges that can be earned.
    const allBadges = [
        { id: 'explorer', name: 'Blog Explorer', description: 'Visited 5 different pages.', icon: '🧭' },
        { id: 'dedicated', name: 'Dedicated Reader', description: 'Visited 25 different pages.', icon: '📚' },
        { id: 'loremaster', name: 'Loremaster', description: 'Visited 100 different pages.', icon: '👑' },
        { id: 'deepdive', name: 'Deep Diver', description: 'Scrolled to the bottom of 10 articles.', icon: '🌊' },
        { id: 'archivist', name: 'The Archivist', description: 'Visited a post older than 2 years.', icon: '📜' },
        { id: 'nowandthen', name: 'Now And Then', description: 'Visited the /now page.', icon: '⏱️' },
        { id: 'sourcerer', name: 'Source Seeker', description: 'Looked behind the curtain.', icon: '🔮' },
        { id: 'bughunter', name: 'Bug Hunter', description: 'You have a keen eye for detail.', icon: '🐛' },
        { id: 'konami', name: 'Konami Code', description: 'Respect for the classics.', icon: '🎮' },
        { id: 'indieweb', name: 'IndieWeb Ally', description: 'You believe in a free and open web.', icon: '🕸️' }
    ];

    // Keys for storing data in localStorage.
    const BADGE_STORAGE_KEY = 'userBadges';
    const VISITED_PAGES_KEY = 'visitedPages';
    const SCROLLED_PAGES_KEY = 'scrolledPages';

    // -------------------------------------------------------------------------
    // Core Badge Functions
    // -------------------------------------------------------------------------

    /**
     * Retrieves the list of earned badge IDs from localStorage.
     * @returns {string[]} An array of earned badge IDs.
     */
    function getEarnedBadges() {
        return JSON.parse(localStorage.getItem(BADGE_STORAGE_KEY) || '[]');
    }

    /**
     * Saves the list of earned badge IDs to localStorage.
     * @param {string[]} badges - An array of earned badge IDs.
     */
    function saveEarnedBadges(badges) {
        localStorage.setItem(BADGE_STORAGE_KEY, JSON.stringify(badges));
    }

    /**
     * Displays a notification for a newly earned badge.
     * @param {object} badge - The badge object to display.
     */
    function showBadgeNotification(badge) {
        const notification = document.createElement('div');
        notification.className = 'badge-notification';
        notification.innerHTML = `
            <div class="badge-notification-icon">${badge.icon}</div>
            <div class="badge-notification-content">
                <strong>Badge Unlocked!</strong>
                <p>${badge.name}</p>
            </div>
        `;
        document.body.appendChild(notification);

        // Animate the notification in.
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);

        // Animate the notification out and remove it.
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 500);
        }, 4000);
    }

    /**
     * Unlocks a badge for the user.
     * @param {string} badgeId - The ID of the badge to unlock.
     */
    window.unlockBadge = function(badgeId) {
        const earnedBadges = getEarnedBadges();
        if (earnedBadges.includes(badgeId)) {
            console.log(`You have already earned the "${badgeId}" badge.`);
            return;
        }

        const badge = allBadges.find(b => b.id === badgeId);
        if (badge) {
            earnedBadges.push(badgeId);
            saveEarnedBadges(earnedBadges);
            showBadgeNotification(badge);
            console.log(`Congratulations! You've unlocked the "${badge.name}" badge!`);
        } else {
            console.error(`Badge with ID "${badgeId}" not found.`);
        }
    }

    // -------------------------------------------------------------------------
    // Tracking and Event Listeners
    // -------------------------------------------------------------------------

    /**
     * Tracks visited pages and unlocks badges based on the count.
     */
    function trackVisitedPage() {
        let visited = JSON.parse(localStorage.getItem(VISITED_PAGES_KEY) || '[]');
        const currentPage = window.location.pathname;

        const wasNewPage = !visited.includes(currentPage);
        if (wasNewPage) {
            visited.push(currentPage);
            localStorage.setItem(VISITED_PAGES_KEY, JSON.stringify(visited));
            console.log(`New page visited: ${currentPage}. Total pages: ${visited.length}`);
            
            // Unlock badges based on the number of unique pages visited.
            if (visited.length === 5) unlockBadge('explorer');
            if (visited.length === 25) unlockBadge('dedicated');
            if (visited.length === 100) unlockBadge('loremaster');
        }
    }

    /**
     * Tracks pages that have been scrolled to the bottom.
     */
    function trackPageScroll() {
        let scrolled = JSON.parse(localStorage.getItem(SCROLLED_PAGES_KEY) || '[]');
        const currentPage = window.location.pathname;

        const handleScroll = () => {
            // Check if the user has scrolled to the bottom of the page.
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 200) { // 200px buffer
                if (!scrolled.includes(currentPage)) {
                    scrolled.push(currentPage);
                    localStorage.setItem(SCROLLED_PAGES_KEY, JSON.stringify(scrolled));
                    console.log(`Scrolled to bottom: ${currentPage}. Total scrolled: ${scrolled.length}`);
                    
                    // Unlock a badge when 10 pages have been scrolled to the bottom.
                    if (scrolled.length === 10) unlockBadge('deepdive');
                }
                // Remove the scroll listener to avoid re-checking on the same page.
                window.removeEventListener('scroll', handleScroll);
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
    }

    /**
     * Checks for visits to special pages and unlocks badges accordingly.
     */
    function checkSpecialPages() {
        const path = window.location.pathname;
        if (path.includes('/now') || path === '/now' || path === '/now/') {
            unlockBadge('nowandthen');
        }
    }

    /**
     * Checks the publication date of a post and unlocks a badge if it's old.
     */
    function checkPostDate() {
        const dateElement = document.querySelector('meta[property="article:published_time"]');
        if (dateElement) {
            const postDate = new Date(dateElement.getAttribute('content'));
            const twoYearsAgo = new Date();
            twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);
            if (postDate < twoYearsAgo) {
                unlockBadge('archivist');
            }
        }
    }

    /**
     * Sets up the Konami code listener.
     */
    function setupKonamiCode() {
        const sequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
        let keyStrokes = [];
        window.addEventListener('keydown', (e) => {
            keyStrokes.push(e.key);
            if (keyStrokes.length > sequence.length) {
                keyStrokes.shift();
            }
            if (keyStrokes.join('') === sequence.join('')) {
                unlockBadge('konami');
            }
        });
    }

    // -------------------------------------------------------------------------
    // Initialization
    // -------------------------------------------------------------------------

    // Expose the badger object immediately to avoid race conditions on the badges page.
    window.badger = {
        list: () => console.table(allBadges),
        mine: () => console.log(getEarnedBadges()),
        getAllBadges: () => allBadges,
        clear: () => {
            localStorage.removeItem(BADGE_STORAGE_KEY);
            localStorage.removeItem(VISITED_PAGES_KEY);
            localStorage.removeItem(SCROLLED_PAGES_KEY);
            console.log('All badge data cleared.');
        },
        unlock: window.unlockBadge,
        debug: () => {
            console.log('Earned badges:', getEarnedBadges());
            console.log('Visited pages:', JSON.parse(localStorage.getItem(VISITED_PAGES_KEY) || '[]'));
            console.log('Scrolled pages:', JSON.parse(localStorage.getItem(SCROLLED_PAGES_KEY) || '[]'));
        }
    };

    // Run all checks when the DOM is loaded.
    document.addEventListener('DOMContentLoaded', function() {
        console.log('Badge system initializing...');
        console.log('Current path:', window.location.pathname);
        console.log('Badge system loaded, window.badger available:', !!window.badger);
        
        // Don't run tracking on the badges page itself to avoid confusion.
        if (!window.location.pathname.includes('/badges')) {
            trackVisitedPage();
            trackPageScroll();
            checkSpecialPages();
            checkPostDate();
        }
        
        // Always set up the Konami code listener.
        setupKonamiCode();
    });

})();

// Expose unlockBadge globally for console commands.
var unlockBadge = window.unlockBadge;
