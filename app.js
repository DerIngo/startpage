// Default Bookmarks Data Structure
const DEFAULT_BOOKMARKS = [
    // Video Group
    { id: '1', title: 'Amazon Prime Video', url: 'https://www.amazon.de/gp/video/storefront', category: 'video', icon: 'video' },
    { id: '2', title: 'Netflix', url: 'https://netflix.com', category: 'video', icon: 'film' },
    { id: '3', title: 'Disney+', url: 'https://www.disneyplus.com', category: 'video', icon: 'tv' },
    { id: '4', title: 'Paramount+', url: 'https://www.paramountplus.com', category: 'video', icon: 'tv' },
    { id: '5', title: 'Apple TV+', url: 'https://tv.apple.com', category: 'video', icon: 'tv' },
    { id: '6', title: 'RTL+', url: 'https://www.rtlplus.com', category: 'video', icon: 'tv' },
    
    // ÖRR Group
    { id: '7', title: 'ARD Mediathek', url: 'https://www.ardmediathek.de', category: 'oerr', icon: 'play-circle' },
    { id: '8', title: 'ZDF Mediathek', url: 'https://www.zdf.de', category: 'oerr', icon: 'play-circle' },
    { id: '9', title: 'Arte', url: 'https://www.arte.tv', category: 'oerr', icon: 'play-circle' },
    { id: '10', title: '3sat', url: 'https://www.3sat.de', category: 'oerr', icon: 'play-circle' },
    { id: '11', title: 'Phoenix', url: 'https://www.phoenix.de', category: 'oerr', icon: 'play-circle' },
    
    // Video 2 Group
    { id: '12', title: 'YouTube', url: 'https://youtube.com', category: 'video2', icon: 'youtube' },
    { id: '13', title: 'Plex TV', url: 'https://watch.plex.tv', category: 'video2', icon: 'tv' },
    { id: '14', title: 'Dailymotion', url: 'https://www.dailymotion.com', category: 'video2', icon: 'video' },
    { id: '15', title: 'Rumble', url: 'https://rumble.com', category: 'video2', icon: 'video' },
    
    // Audio Group
    { id: '16', title: 'Spotify', url: 'https://spotify.com', category: 'audio', icon: 'music' },
    { id: '17', title: 'Audible', url: 'https://www.audible.de', category: 'audio', icon: 'headphones' },
    
    // AI Group
    { id: '18', title: 'ChatGPT', url: 'https://chatgpt.com', category: 'ai', icon: 'message-square' },
    { id: '19', title: 'Gemini', url: 'https://gemini.google.com', category: 'ai', icon: 'sparkles' },
    { id: '20', title: 'Grok', url: 'https://grok.com', category: 'ai', icon: 'message-circle' },
    { id: '21', title: 'Claude', url: 'https://claude.ai', category: 'ai', icon: 'message-circle' },
    { id: '22', title: 'DeepSeek', url: 'https://chat.deepseek.com', category: 'ai', icon: 'brain' },
    { id: '23', title: 'Kimi', url: 'https://kimi.moonshot.cn', category: 'ai', icon: 'message-circle' },
    { id: '24', title: 'Qwen', url: 'https://chat.qwenlm.ai', category: 'ai', icon: 'message-circle' },
    { id: '25', title: 'Z.ai', url: 'https://z.ai', category: 'ai', icon: 'message-circle' },
    { id: '26', title: 'Mistral', url: 'https://chat.mistral.ai', category: 'ai', icon: 'wind' },
    { id: '27', title: 'Groq', url: 'https://groq.com', category: 'ai', icon: 'zap' },
    
    // Development Group
    { id: '28', title: 'GitHub', url: 'https://github.com', category: 'dev', icon: 'github' },
    { id: '29', title: 'Stack Overflow', url: 'https://stackoverflow.com', category: 'dev', icon: 'code' },
    { id: '30', title: 'Localhost', url: 'http://localhost:3000', category: 'dev', icon: 'terminal' }
];

// Search Engines Configuration
const SEARCH_ENGINES = {
    google: {
        name: 'Google',
        icon: 'search',
        action: 'https://www.google.com/search',
        param: 'q',
        placeholder: 'Suchen mit Google...'
    },
    youtube: {
        name: 'YouTube',
        icon: 'youtube',
        action: 'https://www.youtube.com/results',
        param: 'search_query',
        placeholder: 'Suchen auf YouTube...'
    }
};

// Global State
let bookmarks = [];
let currentEngine = 'google';
let activeBookmarkCategory = 'video';

// DOM Elements
const clockEl = document.getElementById('clock');
const dateEl = document.getElementById('date');
const greetingTextEl = document.getElementById('greeting-text');
const userNameEl = document.getElementById('user-name');
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const engineBtn = document.getElementById('engine-btn');
const engineLabel = document.getElementById('engine-label');
const engineDropdown = document.getElementById('engine-dropdown');

// Modals & Forms
const settingsModal = document.getElementById('settings-modal');
const settingsBtn = document.getElementById('settings-btn');
const settingsCloseBtn = document.getElementById('settings-close-btn');
const settingsForm = document.getElementById('settings-form');

// --- 1. Clock, Date and Greeting Logic ---
function updateClock() {
    const now = new Date();
    
    // Time
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    clockEl.textContent = `${hours}:${minutes}:${seconds}`;
    
    // Date: e.g. "Freitag, 19. Juni 2026"
    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    dateEl.textContent = now.toLocaleDateString('de-DE', options);
    
    // Greeting
    const hour = now.getHours();
    let greeting = 'Hallo';
    if (hour >= 5 && hour < 11) {
        greeting = 'Guten Morgen';
    } else if (hour >= 11 && hour < 18) {
        greeting = 'Guten Tag';
    } else if (hour >= 18 && hour < 22) {
        greeting = 'Guten Abend';
    } else {
        greeting = 'Gute Nacht';
    }
    greetingTextEl.textContent = greeting;
}

// --- 2. User Name Logic ---
async function loadUserName() {
    const savedName = await appStorage.getUserName();
    userNameEl.textContent = savedName;
}

async function saveUserName(name) {
    await appStorage.saveUserName(name);
    userNameEl.textContent = name;
}

// --- 3. Search Engine Selector Logic ---
async function selectSearchEngine(engineKey) {
    const engine = SEARCH_ENGINES[engineKey];
    if (!engine) return;
    
    currentEngine = engineKey;
    await appStorage.saveSearchEngine(engineKey);
    
    // Update form attributes
    searchForm.action = engine.action;
    searchInput.name = engine.param;
    searchInput.placeholder = engine.placeholder;
    engineLabel.textContent = engine.name;
    
    // Update Selector Button Icon
    const iconBtn = engineBtn.querySelector('.engine-icon');
    if (iconBtn) {
        const newIcon = document.createElement('i');
        newIcon.className = 'engine-icon';
        newIcon.setAttribute('data-lucide', engine.icon);
        iconBtn.replaceWith(newIcon);
    }
    
    // Update Dropdown active styling
    document.querySelectorAll('.engine-item').forEach(item => {
        if (item.getAttribute('data-engine') === engineKey) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
    
    // Re-create icons to apply Lucide styling
    if (window.lucide) {
        window.lucide.createIcons();
    }
}

// Open / Close Dropdown
engineBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    engineDropdown.classList.toggle('show');
});

document.addEventListener('click', () => {
    engineDropdown.classList.remove('show');
});

// Dropdown item click
document.querySelectorAll('.engine-item').forEach(item => {
    item.addEventListener('click', (e) => {
        const engineKey = e.currentTarget.getAttribute('data-engine');
        selectSearchEngine(engineKey);
        searchInput.focus();
    });
});

// Keyboard short-cuts in search input
// If user starts query with '/g ' or '/y ', switch search engine on the fly.
searchInput.addEventListener('input', (e) => {
    const val = e.target.value;
    if (val.startsWith('/g ')) {
        selectSearchEngine('google');
        e.target.value = val.substring(3);
    } else if (val.startsWith('/y ')) {
        selectSearchEngine('youtube');
        e.target.value = val.substring(3);
    }
});

// --- 4. Bookmarks Management Logic ---
async function loadBookmarks() {
    bookmarks = await appStorage.getBookmarks(DEFAULT_BOOKMARKS);
}

function getHostName(url) {
    try {
        const parsed = new URL(url);
        return parsed.hostname.replace('www.', '');
    } catch (e) {
        return '';
    }
}

function renderBookmarks() {
    const gridEl = document.getElementById('active-bookmarks-grid');
    if (!gridEl) return;
    
    // Clear current elements
    gridEl.innerHTML = '';
    
    // Filter bookmarks by active category
    const catBookmarks = bookmarks.filter(b => b.category === activeBookmarkCategory);
    
    if (catBookmarks.length === 0) {
        gridEl.classList.add('empty');
        const emptyEl = document.createElement('div');
        emptyEl.className = 'bookmarks-empty-state';
        emptyEl.innerHTML = `
            <i data-lucide="info"></i>
            <span>Keine Lesezeichen in dieser Kategorie vorhanden.</span>
        `;
        gridEl.appendChild(emptyEl);
    } else {
        gridEl.classList.remove('empty');
        catBookmarks.forEach(b => {
            const itemEl = document.createElement('a');
            itemEl.href = b.url;
            itemEl.className = 'bookmark-item';
            itemEl.target = '_self'; // Opens in same tab for fluid browser home page feel
            
            // Build Icon markup
            let iconMarkup = '';
            const isLucideName = /^[a-z0-9-]+$/.test(b.icon.trim().toLowerCase());
            
            if (isLucideName) {
                iconMarkup = `<i data-lucide="${b.icon.toLowerCase()}"></i>`;
            } else {
                iconMarkup = `<span class="emoji-icon">${b.icon}</span>`;
            }
            
            const hostname = getHostName(b.url);
            
            itemEl.innerHTML = `
                <div class="bookmark-icon-wrapper">
                    ${iconMarkup}
                </div>
                <div class="bookmark-details">
                    <span class="bookmark-title">${b.title}</span>
                    <span class="bookmark-host">${hostname}</span>
                </div>
            `;
            
            gridEl.appendChild(itemEl);
        });
    }
    
    // Load Lucide Icons dynamically
    if (window.lucide) {
        window.lucide.createIcons();
    }
}

// Tab Switching for Bookmark Categories on Home Page
document.querySelectorAll('.bookmark-tab-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        activeBookmarkCategory = e.currentTarget.getAttribute('data-category');
        
        // Update active tab styling
        document.querySelectorAll('.bookmark-tab-btn').forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        
        // Re-render bookmarks
        renderBookmarks();
    });
});

async function deleteBookmark(id) {
    await appStorage.deleteBookmark(id);
    bookmarks = await appStorage.getBookmarks(DEFAULT_BOOKMARKS);
    renderBookmarks();
}

async function addBookmark(title, url, category, icon) {
    const newBookmark = {
        id: Date.now().toString(),
        title,
        url,
        category,
        icon: icon || 'link'
    };
    
    await appStorage.addBookmark(newBookmark);
    bookmarks = await appStorage.getBookmarks(DEFAULT_BOOKMARKS);
    renderBookmarks();
}

// --- 5. Modal & Settings Controllers ---
function renderSettingsBookmarks() {
    const listEl = document.getElementById('settings-bookmarks-list');
    if (!listEl) return;
    
    listEl.innerHTML = '';
    
    bookmarks.forEach(b => {
        const itemEl = document.createElement('div');
        itemEl.className = 'settings-bookmark-item';
        
        let iconMarkup = '';
        const isLucideName = /^[a-z0-9-]+$/.test(b.icon.trim().toLowerCase());
        if (isLucideName) {
            iconMarkup = `<i data-lucide="${b.icon.toLowerCase()}"></i>`;
        } else {
            iconMarkup = `<span class="emoji-icon">${b.icon}</span>`;
        }
        
        const categoryLabels = {
            video: 'Video',
            oerr: 'ÖRR',
            video2: 'Video 2',
            audio: 'Audio',
            ai: 'AI',
            dev: 'Entwicklung'
        };
        const catLabel = categoryLabels[b.category] || b.category;
        const hostname = getHostName(b.url);
        
        itemEl.innerHTML = `
            <div class="settings-bookmark-info">
                <div class="settings-bookmark-icon">
                    ${iconMarkup}
                </div>
                <div class="settings-bookmark-details">
                    <span class="settings-bookmark-title">${b.title}</span>
                    <span class="settings-bookmark-meta">${catLabel} &bull; ${hostname}</span>
                </div>
            </div>
            <button class="settings-bookmark-delete" data-id="${b.id}" title="Lesezeichen löschen">
                <i data-lucide="trash-2"></i>
            </button>
        `;
        
        const deleteBtn = itemEl.querySelector('.settings-bookmark-delete');
        deleteBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            e.stopPropagation();
            await deleteBookmark(b.id);
            renderSettingsBookmarks();
        });
        
        listEl.appendChild(itemEl);
    });
    
    if (window.lucide) {
        window.lucide.createIcons();
    }
}

// Settings Modal Open
settingsBtn.addEventListener('click', async () => {
    const savedName = await appStorage.getUserName();
    document.getElementById('settings-name').value = savedName;
    
    // Activate Profile tab by default when opening settings
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelector('.tab-btn[data-tab="tab-profile"]').classList.add('active');
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    document.getElementById('tab-profile').classList.add('active');
    
    renderSettingsBookmarks();
    
    settingsModal.classList.add('show');
    document.getElementById('settings-name').focus();
});

function closeSettingsModal() {
    settingsModal.classList.remove('show');
    settingsForm.reset();
    document.getElementById('modal-bookmark-form').reset();
}

settingsCloseBtn.addEventListener('click', closeSettingsModal);

// Profile Form Submit
settingsForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('settings-name').value;
    await saveUserName(name);
    closeSettingsModal();
});

// Bookmark Form Submit inside Settings
const modalBookmarkForm = document.getElementById('modal-bookmark-form');
modalBookmarkForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('bookmark-title').value;
    const url = document.getElementById('bookmark-url').value;
    const category = document.getElementById('bookmark-category').value;
    const icon = document.getElementById('bookmark-icon').value;
    
    await addBookmark(title, url, category, icon);
    modalBookmarkForm.reset();
    renderSettingsBookmarks();
});

// Tab Switching
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const targetTab = e.currentTarget.getAttribute('data-tab');
        
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        const targetContent = document.getElementById(targetTab);
        if (targetContent) {
            targetContent.classList.add('active');
        }
    });
});

// Escape Key Modal Closing
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeSettingsModal();
    }
});

// --- 6. Quick Autofocus Search Key ---
// Focus the search bar when the user starts typing anywhere, unless an input has focus.
document.addEventListener('keydown', (e) => {
    // Exclude when input/textarea/select are focused, or when Meta/Control keys are pressed
    const activeEl = document.activeElement;
    const isInput = activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA' || activeEl.tagName === 'SELECT';
    
    if (!isInput && !e.ctrlKey && !e.metaKey && !e.altKey) {
        // If it's a single letter or number, focus search
        if (e.key.length === 1) {
            searchInput.focus();
        }
    }
});

// --- 7. App Initialization ---
async function init() {
    // 1. Clock updates
    updateClock();
    setInterval(updateClock, 1000);
    
    // 2. Load User Profile
    await loadUserName();
    
    // 3. Load Selected Search Engine
    const savedEngine = await appStorage.getSearchEngine();
    await selectSearchEngine(savedEngine);
    
    // 4. Load & Render Bookmarks
    await loadBookmarks();
    renderBookmarks();
}

// Run init when DOM content is fully loaded
document.addEventListener('DOMContentLoaded', init);
window.addEventListener('load', () => {
    // In case icons are not fully loaded in DOMContentLoaded
    if (window.lucide) {
        window.lucide.createIcons();
    }
});
