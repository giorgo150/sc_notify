const container = document.getElementById('notification-container');
const MAX_NOTIFICATIONS = 5;

const ICONS = {
    info: '<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>',
    success: '<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>',
    warning: '<svg viewBox="0 0 24 24"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>',
    error: '<svg viewBox="0 0 24 24"><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/></svg>'
};

function createNotification(data) {
    const type = data.type || 'info';
    const title = data.title || '';
    const message = data.message || '';
    const duration = data.duration || 5000;

    // Limit max notifications
    while (container.children.length >= MAX_NOTIFICATIONS) {
        const oldest = container.firstChild;
        if (oldest) oldest.remove();
    }

    const el = document.createElement('div');
    el.className = 'notification ' + type;

    let html = '<div class="notification-icon">' + (ICONS[type] || ICONS.info) + '</div>';
    html += '<div class="notification-content">';
    if (title) {
        html += '<div class="notification-title">' + escapeHtml(title) + '</div>';
    }
    html += '<div class="notification-message">' + escapeHtml(message) + '</div>';
    html += '</div>';
    html += '<div class="notification-progress" style="animation-duration: ' + duration + 'ms;"></div>';

    el.innerHTML = html;
    container.appendChild(el);

    // Auto remove
    setTimeout(function () {
        el.classList.add('removing');
        setTimeout(function () {
            if (el.parentNode) el.remove();
        }, 300);
    }, duration);
}

function escapeHtml(text) {
    var div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// NUI message listener
window.addEventListener('message', function (event) {
    if (event.data.action === 'notify') {
        createNotification(event.data);
    }
});
