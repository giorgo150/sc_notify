# SC Notify

 notification rendszer FiveM szerverekhez.

---

## Meghívás

### Export (kliens oldal)

```lua
exports.sc_notify:notify({
    type     = 'success',
    title    = 'Sikeres művelet',
    message  = 'A jármű sikeresen tárolva.',
    duration = 5000,
})
```

Rövid forma (default `info` típus, 5000ms):

```lua
exports.sc_notify:notify('Hello world!')
```

### Network event (szerver oldal)

```lua
TriggerClientEvent('sc_notify:send', playerId, {
    type    = 'warning',
    title   = 'Figyelmeztetés',
    message = 'Megsérült a járműved.',
})
```

---

## Paraméterek

| Mező       | Típus    | Default  | Leírás                                            |
|------------|----------|----------|---------------------------------------------------|
| `type`     | `string` | `'info'` | `'info'` / `'success'` / `'warning'` / `'error'`  |
| `title`    | `string` | `''`     | Cím (opcionális)                                  |
| `message`  | `string` | `''`     | Üzenet törzs                                      |
| `duration` | `number` | `5000`   | Megjelenítési idő ms-ban                          |

---

## Példák

```lua
exports.sc_notify:notify({ type = 'info',    title = 'Info',     message = 'Új küldetés érkezett.' })
exports.sc_notify:notify({ type = 'success', title = 'Siker',    message = 'Vásárlás kész.' })
exports.sc_notify:notify({ type = 'warning', title = 'Figyelem', message = 'Kevés a benzin.' })
exports.sc_notify:notify({ type = 'error',   title = 'Hiba',     message = 'Nincs elég pénz.' })
```
