import { useEffect, useState, useCallback } from 'react'
import Notification from './Notification'
import { NotifyData, NotifyItem } from './types'

const MAX_NOTIFICATIONS = 5

export default function App() {
  const [items, setItems] = useState<NotifyItem[]>([])
  const [scale, setScale] = useState(() => window.innerHeight / 1080)

  useEffect(() => {
    const onResize = () => setScale(window.innerHeight / 1080)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    const onMessage = (event: MessageEvent<NotifyData>) => {
      if (event.data?.action !== 'notify') return

      const next: NotifyItem = {
        id:       Date.now() + Math.random(),
        type:     event.data.type    ?? 'info',
        title:    event.data.title   ?? '',
        message:  event.data.message ?? '',
        duration: event.data.duration ?? 5000,
      }

      setItems(prev => {
        const trimmed = prev.length >= MAX_NOTIFICATIONS ? prev.slice(1) : prev
        return [...trimmed, next]
      })
    }

    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [])

  const handleRemove = useCallback((id: number) => {
    setItems(prev => prev.filter(n => n.id !== id))
  }, [])

  return (
    <div
      style={{ transform: `scale(${scale})`, transformOrigin: 'top right' }}
      className="fixed top-5 right-5 flex flex-col gap-2 z-[9999] max-w-[380px]"
    >
      {items.map(item => (
        <Notification key={item.id} item={item} onRemove={handleRemove} />
      ))}
    </div>
  )
}
