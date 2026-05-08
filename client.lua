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

RegisterNetEvent('sc_notify:send', function(data)
    sendNotify(data)
end)

exports('notify', function(data)
    sendNotify(data)
end)
