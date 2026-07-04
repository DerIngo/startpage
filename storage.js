/**
 * Storage Provider Interface & LocalStorage Implementation.
 * All methods are asynchronous to allow drop-in replacements with
 * databases (e.g. IndexedDB, SQLite) or API endpoints in the future.
 */
class LocalStorageProvider {
    /**
     * Retrieves the saved username.
     * @returns {Promise<string>}
     */
    async getUserName() {
        const savedName = localStorage.getItem('sp-username');
        return savedName || 'Ingo';
    }

    /**
     * Saves the username.
     * @param {string} name 
     * @returns {Promise<void>}
     */
    async saveUserName(name) {
        localStorage.setItem('sp-username', name);
    }

    /**
     * Retrieves the key of the active search engine.
     * @returns {Promise<string>}
     */
    async getSearchEngine() {
        const savedEngine = localStorage.getItem('sp-search-engine');
        return savedEngine || 'google';
    }

    /**
     * Saves the active search engine key.
     * @param {string} engineKey 
     * @returns {Promise<void>}
     */
    async saveSearchEngine(engineKey) {
        localStorage.setItem('sp-search-engine', engineKey);
    }

    /**
     * Retrieves the bookmarks. Initializes them with default values if none exist.
     * @param {Array<Object>} defaultBookmarks 
     * @returns {Promise<Array<Object>>}
     */
    async getBookmarks(defaultBookmarks = []) {
        // Migration to version 2 (New default categories)
        const version = localStorage.getItem('sp-bookmarks-version');
        if (version !== '2') {
            localStorage.setItem('sp-bookmarks-version', '2');
            await this.saveBookmarks(defaultBookmarks);
            return defaultBookmarks;
        }

        const savedBookmarks = localStorage.getItem('sp-bookmarks');
        if (savedBookmarks) {
            try {
                return JSON.parse(savedBookmarks);
            } catch (e) {
                console.error("Fehler beim Laden der Lesezeichen aus dem LocalStorage:", e);
            }
        }
        // Initialize with default bookmarks
        await this.saveBookmarks(defaultBookmarks);
        return defaultBookmarks;
    }

    /**
     * Saves the entire bookmarks array.
     * @param {Array<Object>} bookmarks 
     * @returns {Promise<void>}
     */
    async saveBookmarks(bookmarks) {
        localStorage.setItem('sp-bookmarks', JSON.stringify(bookmarks));
    }

    /**
     * Adds a new bookmark to the list.
     * @param {Object} bookmark 
     * @returns {Promise<Object>} The added bookmark
     */
    async addBookmark(bookmark) {
        const bookmarks = await this.getBookmarks();
        bookmarks.push(bookmark);
        await this.saveBookmarks(bookmarks);
        return bookmark;
    }

    /**
     * Deletes a bookmark by its ID.
     * @param {string} id 
     * @returns {Promise<void>}
     */
    async deleteBookmark(id) {
        let bookmarks = await this.getBookmarks();
        bookmarks = bookmarks.filter(b => b.id !== id);
        await this.saveBookmarks(bookmarks);
    }
}

// Expose the active storage provider instance globally
window.appStorage = new LocalStorageProvider();
