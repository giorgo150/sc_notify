import { useEffect, useRef, useState } from 'react'
import { Info, CheckCircle2, AlertTriangle, XCircle, X, type LucideIcon } from 'lucide-react'
import { NotifyItem, NotifyType } from './types'

interface Props {
  item:     NotifyItem
  onRemove: (id: number) => void
}

interface TypeStyle {
  Icon:        LucideIcon
  iconColor:   string
  titleColor:  string
  border:      string
  glow:        string
  progressBg:  string
}

const TYPE_STYLES: Record<NotifyType, TypeStyle> = {
  info: {
    Icon:       Info,
    iconColor:  'text-indigo-400',
    titleColor: 'text-indigo-200',
    border:     'border-indigo-500/15',
    glow:       '0 8px 32px rgba(0,0,0,0.4), 0 0 20px rgba(99,102,241,0.08)',
    progressBg: 'linear-gradient(90deg, #6366f1, #818cf8)',
  },
  success: {
    Icon:       CheckCircle2,
    iconColor:  'text-emerald-400',
    titleColor: 'text-emerald-200',
    border:     'border-emerald-500/15',
    glow:       '0 8px 32px rgba(0,0,0,0.4), 0 0 20px rgba(16,185,129,0.08)',
    progressBg: 'linear-gradient(90deg, #10b981, #34d399)',
  },
  warning: {
    Icon:       AlertTriangle,
    iconColor:  'text-amber-400',
    titleColor: 'text-amber-200',
    border:     'border-amber-500/15',
    glow:       '0 8px 32px rgba(0,0,0,0.4), 0 0 20px rgba(245,158,11,0.08)',
    progressBg: 'linear-gradient(90deg, #f59e0b, #fbbf24)',
  },
  error: {
    Icon:       XCircle,
    iconColor:  'text-red-400',
    titleColor: 'text-red-200',
    border:     'border-red-500/15',
    glow:       '0 8px 32px rgba(0,0,0,0.4), 0 0 20px rgba(239,68,68,0.08)',
    progressBg: 'linear-gradient(90deg, #ef4444, #f87171)',
  },
}

export default function Notification({ item, onRemove }: Props) {
  const [removing, setRemoving] = useState(false)
  const [hovered, setHovered]   = useState(false)
  const timerRef                = useRef<number | null>(null)
  const startTimeRef            = useRef<number>(Date.now())
  const remainingRef            = useRef<number>(item.duration)

  const style = TYPE_STYLES[item.type]
  const Icon  = style.Icon

  useEffect(() => {
    const startTimer = (ms: number) => {
      startTimeRef.current = Date.now()
      timerRef.current = window.setTimeout(() => {
        setRemoving(true)
      }, ms)
    }

    if (!hovered) {
      startTimer(remainingRef.current)
    } else if (timerRef.current !== null) {
      clearTimeout(timerRef.current)
      remainingRef.current -= Date.now() - startTimeRef.current
    }

    return () => {
      if (timerRef.current !== null) clearTimeout(timerRef.current)
    }
  }, [hovered])

  useEffect(() => {
    if (!removing) return
    const t = window.setTimeout(() => onRemove(item.id), 300)
    return () => clearTimeout(t)
  }, [removing, item.id, onRemove])

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ boxShadow: style.glow }}
      className={`
        group relative overflow-hidden
        flex items-start gap-3
        min-w-[300px] max-w-[380px]
        px-4 py-3.5
        rounded-[10px]
        bg-[rgba(15,15,25,0.92)]
        border ${style.border}
        ${removing ? 'animate-slide-out' : 'animate-slide-in'}
      `}
    >
      <div className={`flex-shrink-0 w-5 h-5 mt-px ${style.iconColor}`}>
        <Icon className="w-full h-full" strokeWidth={2} />
      </div>

      <div className="flex-1 min-w-0">
        {item.title && (
          <div className={`text-[13px] font-semibold tracking-[0.2px] mb-0.5 ${style.titleColor}`}>
            {item.title}
          </div>
        )}
        <div className="text-[12px] font-normal text-white/60 leading-[1.5] break-words">
          {item.message}
        </div>
      </div>

      <button
        onClick={() => setRemoving(true)}
        className="flex-shrink-0 w-4 h-4 mt-px ml-1 opacity-0 group-hover:opacity-40 hover:!opacity-100 transition-opacity duration-150"
      >
        <X className="w-full h-full text-white/50" strokeWidth={2} />
      </button>

      <div
        style={{
          background:        style.progressBg,
          animationDuration: `${item.duration}ms`,
          animationPlayState: hovered ? 'paused' : 'running',
        }}
        className="absolute bottom-0 left-0 h-[2px] animate-progress"
      />
    </div>
  )
}
