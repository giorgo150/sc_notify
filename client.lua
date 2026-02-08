-- SC Notify - Client
-- Modern NUI notification system for sc_core

local function sendNotify(data)
    if type(data) == 'string' then
        data = { message = data, type = 'info' }
    end
    SendNUIMessage({
        action = 'notify',
        type = data.type or 'info',
        title = data.title or '',
        message = data.message or '',
        duration = data.duration or 5000
    })
end

-- Direct event (other resources can use this)
RegisterNetEvent('sc_notify:send', function(data)
    sendNotify(data)
end)

-- Export (sc_core ui.lua calls this)
exports('notify', function(data)
    sendNotify(data)
end)
