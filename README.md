# SC Notify

Notification system for FiveM servers.

---

## Usage

### Export (client side)

```lua
exports.sc_notify:notify({
    type     = 'success',
    title    = 'Operation successful',
    message  = 'Vehicle stored successfully.',
    duration = 5000,
})
```

Short form (defaults to `info` type, 5000ms):

```lua
exports.sc_notify:notify('Hello world!')
```

### Network event (server side)

```lua
TriggerClientEvent('sc_notify:send', playerId, {
    type    = 'warning',
    title   = 'Warning',
    message = 'Your vehicle is damaged.',
})
```

---

## Parameters

| Field      | Type     | Default  | Description                                       |
|------------|----------|----------|---------------------------------------------------|
| `type`     | `string` | `'info'` | `'info'` / `'success'` / `'warning'` / `'error'`  |
| `title`    | `string` | `''`     | Title (optional)                                  |
| `message`  | `string` | `''`     | Message body                                      |
| `duration` | `number` | `5000`   | Display duration in ms                            |

---

## Examples

```lua
exports.sc_notify:notify({ type = 'info',    title = 'Info',    message = 'New mission received.' })
exports.sc_notify:notify({ type = 'success', title = 'Success', message = 'Purchase complete.' })
exports.sc_notify:notify({ type = 'warning', title = 'Warning', message = 'Low fuel.' })
exports.sc_notify:notify({ type = 'error',   title = 'Error',   message = 'Not enough money.' })
```
