document.addEventListener('DOMContentLoaded', () => {

    // Register service worker (required for Android "Install App" prompt)
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./service-worker.js');
    }

    // Populate landing page from config
    document.getElementById('pwa-icon').src = PWA_CONFIG.iconPath;
    document.getElementById('pwa-icon').alt = PWA_CONFIG.appName;
    document.getElementById('pwa-app-name').textContent = PWA_CONFIG.appName;
    
    // Populate install sheet app info from config
    document.getElementById('pwa-sheet-icon').src = PWA_CONFIG.iconPath;
    document.getElementById('pwa-sheet-icon').alt = PWA_CONFIG.appName;
    document.getElementById('pwa-sheet-app-name').textContent = PWA_CONFIG.appName;

    // Populate URL in browser mocks
    document.querySelectorAll('.pwa-mock-url').forEach(el => {
        el.textContent = PWA_CONFIG.appUrl;
    });

    // Populate app icon inside instruction steps
    document.getElementById('ios-app-icon').src = PWA_CONFIG.iconPath;
    document.getElementById('samsung-app-icon').src = PWA_CONFIG.iconPath;
    document.getElementById('android-app-icon').src = PWA_CONFIG.iconPath;
    
    // Wire up close handlers
    document.getElementById('pwa-backdrop').addEventListener('click', closeInstallSheet);
    document.getElementById('pwa-sheet-close').addEventListener('click', closeInstallSheet);

});


// --- Detection ---

function detectOS() {
    const ua = navigator.userAgent;
    if (/android/i.test(ua)) return 'Android';
    if (/iPad|iPhone|iPod/.test(ua) && !window.MSStream) return 'iOS';
    return 'Other';
}

function isSamsungBrowser() {
    return /SamsungBrowser/.test(navigator.userAgent);
}


// --- Modal ---

function openInstallSheet() {
    const os = detectOS();

    if (os === 'iOS') {
        document.getElementById('pwa-instructions-ios').style.display = 'block';
    } else if (os === 'Android') {
        if (isSamsungBrowser()) {
            document.getElementById('pwa-instructions-android-samsung').style.display = 'block';
        } else {
            document.getElementById('pwa-instructions-android-other').style.display = 'block';
        }
    } else {
        document.getElementById('pwa-instructions-other').style.display = 'block';
    }

    document.getElementById('pwa-sheet-wrapper').classList.add('open');
}

function closeInstallSheet() {
    document.getElementById('pwa-sheet-wrapper').classList.remove('open');
}


// --- In-sheet help toggles ---

function iOSBrowserMenuShareHelp() {
    document.getElementById('pwa-instructions-browser-detail-link').style.display = 'none';
    document.getElementById('pwa-instructions-browser-detail-container').style.display = 'block';
}

function androidInstallButtonMissing() {
    document.getElementById('android-install-button-missing').style.display = 'none';
    document.getElementById('android-add-to-home-screen').style.display = 'block';
}
