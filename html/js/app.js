const container = document.getElementById('notification-container');
const MAX_NOTIFICATIONS = 5;

// Scale UI based on 1080p base resolution
function updateScale() {
    var scale = window.innerHeight / 1080;
    container.style.transform = 'scale(' + scale + ')';
    container.style.transformOrigin = 'top right';
}
updateScale();
window.addEventListener('resize', updateScale);

const ICONS = {
    info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>',
    success: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
    warning: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
    error: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>'
};

const CLOSE_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';

function removeNotification(el) {
    el.classList.add('removing');
    setTimeout(function () {
        if (el.parentNode) el.remove();
    }, 300);
}

function createNotification(data) {
    var type = data.type || 'info';
    var title = data.title || '';
    var message = data.message || '';
    var duration = data.duration || 5000;

    while (container.children.length >= MAX_NOTIFICATIONS) {
        var oldest = container.firstChild;
        if (oldest) oldest.remove();
    }

    var el = document.createElement('div');
    el.className = 'notification ' + type;

    var html = '<div class="notification-icon">' + (ICONS[type] || ICONS.info) + '</div>';
    html += '<div class="notification-content">';
    if (title) {
        html += '<div class="notification-title">' + escapeHtml(title) + '</div>';
    }
    html += '<div class="notification-message">' + escapeHtml(message) + '</div>';
    html += '</div>';
    html += '<div class="notification-close">' + CLOSE_ICON + '</div>';
    html += '<div class="notification-progress" style="animation-duration: ' + duration + 'ms;"></div>';

    el.innerHTML = html;
    container.appendChild(el);

    // Close button
    var closeBtn = el.querySelector('.notification-close');
    closeBtn.addEventListener('click', function () {
        clearTimeout(timer);
        removeNotification(el);
    });

    // Auto remove
    var timer = setTimeout(function () {
        removeNotification(el);
    }, duration);
}

function escapeHtml(text) {
    var div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

window.addEventListener('message', function (event) {
    if (event.data.action === 'notify') {
        createNotification(event.data);
    }
});
