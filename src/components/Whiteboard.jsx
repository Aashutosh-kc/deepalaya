import './Whiteboard.css'
import thaliPalette from '../assets/palette.svg'
import { useState, useRef, useEffect } from 'react'
import {
  Brush,
  Eraser,
  Undo,
  Redo,
  Trash,
  Download,
  Share2,
  ArrowLeft,
  MousePointer2,
  Square,
  Circle,
  Minus,
  PaintBucket,
  Palette,
  Leaf
} from 'lucide-react'

const CANVAS_WIDTH = 900
const CANVAS_HEIGHT = 600
const CANVAS_BG = '#FFFFFF'
const MAX_HISTORY = 30

const COLORS = [
  '#000000', '#6B7280', '#FFFFFF',
  '#F0502F', '#F59E0B', '#EAB308',
  '#4C9A2A', '#14B8A6', '#4A9BD9',
  '#6366F1', '#A23FD0', '#F0509B'
]

const THALI_COLORS = [
  { color: '#F0502F', x: 50, y: 17.9, label: 'Coral' },
  { color: '#F59E0B', x: 70.3, y: 34.4, label: 'Orange' },
  { color: '#14B8A6', x: 70.3, y: 65.6, label: 'Teal' },
  { color: '#4A9BD9', x: 50, y: 81.7, label: 'Blue' },
  { color: '#4C9A2A', x: 29.7, y: 65.6, label: 'Green' },
  { color: '#A23FD0', x: 29.7, y: 34.4, label: 'Violet' },
  { color: '#EAB308', x: 50, y: 50.1, label: 'Yellow' }
]

const TOOLS = [
  { id: 'select', label: 'Select', icon: MousePointer2, key: 'V' },
  { id: 'pen', label: 'Pen', icon: Brush, key: 'P' },
  { id: 'eraser', label: 'Eraser', icon: Eraser, key: 'E' },
  { id: 'rectangle', label: 'Rectangle', icon: Square, key: 'R' },
  { id: 'circle', label: 'Circle', icon: Circle, key: 'O' },
  { id: 'line', label: 'Line', icon: Minus, key: 'L' },
  { id: 'petal', label: 'Petal', icon: Leaf, key: 'T' },
  { id: 'bucket', label: 'Bucket Fill', icon: PaintBucket, key: 'B' }
]

export default function Whiteboard({ setOnSelect }) {
  const canvasRef = useRef(null)
  const isDrawing = useRef(false)
  const startPoint = useRef(null)
  const shapeSnapshot = useRef(null)
  const history = useRef([])
  const historyIndex = useRef(-1)

  const [tool, setTool] = useState('pen')
  const [lineWidth, setLineWidth] = useState(4)
  const [currentColor, setCurrentColor] = useState('#F0509B')
  const [fillShapes, setFillShapes] = useState(false)

  const [canUndo, setCanUndo] = useState(false)
  const [canRedo, setCanRedo] = useState(false)
  
function getCtx() {
  return canvasRef.current.getContext('2d', { willReadFrequently: true })
}

  function fillBackground() {
    const ctx = getCtx()

    ctx.globalCompositeOperation = 'source-over'
    ctx.fillStyle = CANVAS_BG
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
  }

  function updateHistoryButtons() {
    setCanUndo(historyIndex.current > 0)
    setCanRedo(historyIndex.current < history.current.length - 1)
  }

  function pushSnapshot() {
    const snapshot = canvasRef.current.toDataURL()

    history.current = history.current.slice(
      0,
      historyIndex.current + 1
    )

    history.current.push(snapshot)

    if (history.current.length > MAX_HISTORY) {
      history.current.shift()
    }

    historyIndex.current = history.current.length - 1
    updateHistoryButtons()
  }

  function restoreSnapshot(index) {
    if (index < 0 || index >= history.current.length) return

    const img = new Image()

    img.onload = () => {
      const ctx = getCtx()

      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
      ctx.drawImage(img, 0, 0)
    }

    img.src = history.current[index]
  }

  function undo() {
    if (historyIndex.current <= 0) return

    historyIndex.current--
    restoreSnapshot(historyIndex.current)
    updateHistoryButtons()
  }

  function redo() {
    if (historyIndex.current >= history.current.length - 1) return

    historyIndex.current++
    restoreSnapshot(historyIndex.current)
    updateHistoryButtons()
  }

  function clearCanvas() {
    fillBackground()
    pushSnapshot()
  }

  function getPoint(e) {
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()

    return {
      x: (e.clientX - rect.left) * (CANVAS_WIDTH / rect.width),
      y: (e.clientY - rect.top) * (CANVAS_HEIGHT / rect.height)
    }
  }

  function floodFill(point) {
    const ctx = getCtx()

    const imageData = ctx.getImageData(
      0,
      0,
      CANVAS_WIDTH,
      CANVAS_HEIGHT
    )

    const pixels = imageData.data

    const startX = Math.floor(point.x)
    const startY = Math.floor(point.y)

    if (
      startX < 0 ||
      startX >= CANVAS_WIDTH ||
      startY < 0 ||
      startY >= CANVAS_HEIGHT
    ) {
      return false
    }

    const startIndex = (startY * CANVAS_WIDTH + startX) * 4

    const targetR = pixels[startIndex]
    const targetG = pixels[startIndex + 1]
    const targetB = pixels[startIndex + 2]
    const targetA = pixels[startIndex + 3]

    const newColor = [
      parseInt(currentColor.slice(1, 3), 16),
      parseInt(currentColor.slice(3, 5), 16),
      parseInt(currentColor.slice(5, 7), 16),
      255
    ]

    if (
      targetR === newColor[0] &&
      targetG === newColor[1] &&
      targetB === newColor[2] &&
      targetA === 255
    ) {
      return false
    }

    const tolerance = 28
    const visited = new Uint8Array(CANVAS_WIDTH * CANVAS_HEIGHT)
    const stack = [startY * CANVAS_WIDTH + startX]

    visited[startY * CANVAS_WIDTH + startX] = 1

    function matchesTarget(index) {
      const pixelIndex = index * 4

      return (
        Math.abs(pixels[pixelIndex] - targetR) <= tolerance &&
        Math.abs(pixels[pixelIndex + 1] - targetG) <= tolerance &&
        Math.abs(pixels[pixelIndex + 2] - targetB) <= tolerance &&
        Math.abs(pixels[pixelIndex + 3] - targetA) <= tolerance
      )
    }

    while (stack.length > 0) {
      const pixel = stack.pop()
      const pixelIndex = pixel * 4

      if (!matchesTarget(pixel)) continue

      pixels[pixelIndex] = newColor[0]
      pixels[pixelIndex + 1] = newColor[1]
      pixels[pixelIndex + 2] = newColor[2]
      pixels[pixelIndex + 3] = newColor[3]

      const x = pixel % CANVAS_WIDTH
      const y = Math.floor(pixel / CANVAS_WIDTH)

      const neighbours = [
        x > 0 ? pixel - 1 : -1,
        x < CANVAS_WIDTH - 1 ? pixel + 1 : -1,
        y > 0 ? pixel - CANVAS_WIDTH : -1,
        y < CANVAS_HEIGHT - 1 ? pixel + CANVAS_WIDTH : -1
      ]

      for (const neighbour of neighbours) {
        if (neighbour === -1 || visited[neighbour]) continue

        visited[neighbour] = 1

        if (matchesTarget(neighbour)) {
          stack.push(neighbour)
        }
      }
    }

    ctx.putImageData(imageData, 0, 0)
    return true
  }

  function drawShape(ctx, start, end) {
    const width = end.x - start.x
    const height = end.y - start.y

    ctx.beginPath()

    if (tool === 'rectangle') {
      ctx.rect(start.x, start.y, width, height)
    }

    if (tool === 'circle') {
      const radius = Math.sqrt(width * width + height * height)

      ctx.arc(start.x, start.y, radius, 0, Math.PI * 2)
    }

    if (tool === 'line') {
      ctx.moveTo(start.x, start.y)
      ctx.lineTo(end.x, end.y)
    }

    if (tool === 'petal') {
      const distance = Math.sqrt(width * width + height * height)

      if (distance < 1) return

      const middleX = (start.x + end.x) / 2
      const middleY = (start.y + end.y) / 2

      const normalX = -height / distance
      const normalY = width / distance

      const petalWidth = distance * 0.28

      ctx.moveTo(start.x, start.y)

      ctx.quadraticCurveTo(
        middleX + normalX * petalWidth,
        middleY + normalY * petalWidth,
        end.x,
        end.y
      )

      ctx.quadraticCurveTo(
        middleX - normalX * petalWidth,
        middleY - normalY * petalWidth,
        start.x,
        start.y
      )

      ctx.closePath()
    }

    ctx.strokeStyle = currentColor
    ctx.lineWidth = lineWidth
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'

    if (tool !== 'line' && fillShapes) {
      ctx.fillStyle = currentColor
      ctx.fill()
    }

    ctx.stroke()
  }

  function handlePointerDown(e) {
    const point = getPoint(e)

    if (tool === 'select') return

    if (tool === 'bucket') {
      const changed = floodFill(point)

      if (changed) pushSnapshot()
      return
    }

    e.currentTarget.setPointerCapture(e.pointerId)

    const ctx = getCtx()

    isDrawing.current = true
    startPoint.current = point

    if (
      ['rectangle', 'circle', 'line', 'petal'].includes(tool)
    ) {
      shapeSnapshot.current = ctx.getImageData(
        0,
        0,
        CANVAS_WIDTH,
        CANVAS_HEIGHT
      )

      return
    }

    ctx.beginPath()
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.globalCompositeOperation = 'source-over'

    if (tool === 'eraser') {
      ctx.strokeStyle = CANVAS_BG
      ctx.lineWidth = 24
    } else {
      ctx.strokeStyle = currentColor
      ctx.lineWidth = lineWidth
    }

    ctx.moveTo(point.x, point.y)
    ctx.lineTo(point.x + 0.01, point.y)
    ctx.stroke()
  }

  function handlePointerMove(e) {
    if (!isDrawing.current) return

    const point = getPoint(e)
    const ctx = getCtx()

    if (
      ['rectangle', 'circle', 'line', 'petal'].includes(tool)
    ) {
      ctx.putImageData(shapeSnapshot.current, 0, 0)
      drawShape(ctx, startPoint.current, point)
      return
    }

    ctx.lineTo(point.x, point.y)
    ctx.stroke()
  }

  function handlePointerUp() {
    if (!isDrawing.current) return

    isDrawing.current = false
    startPoint.current = null
    shapeSnapshot.current = null

    getCtx().globalCompositeOperation = 'source-over'
    pushSnapshot()
  }

  function pickColor(color) {
    setCurrentColor(color)
    setTool('pen')
  }

  function saveCanvas() {
    const link = document.createElement('a')

    link.download = 'my-rangoli.png'
    link.href = canvasRef.current.toDataURL('image/png')
    link.click()
  }

  function shareCanvas() {
    canvasRef.current.toBlob(async (blob) => {
      if (!blob) return

      const file = new File([blob], 'my-rangoli.png', {
        type: 'image/png'
      })

      if (navigator.canShare?.({ files: [file] })) {
        try {
          await navigator.share({
            files: [file],
            title: 'My Rangoli'
          })
        } catch {
          return
        }
      } else {
        saveCanvas()
      }
    })
  }

  useEffect(() => {
    function handleKeyDown(e) {
      const target = e.target

      const isTyping =
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target.isContentEditable

      if (isTyping) return

      const key = e.key.toLowerCase()
      const modifier = e.ctrlKey || e.metaKey

      if (modifier && key === 'z') {
        e.preventDefault()

        if (e.shiftKey) redo()
        else undo()

        return
      }

      if (modifier && key === 'y') {
        e.preventDefault()
        redo()
        return
      }

      if (modifier && key === 's') {
        e.preventDefault()
        saveCanvas()
        return
      }

      if (modifier) return

      const selectedTool = TOOLS.find(
        (item) => item.key.toLowerCase() === key
      )

      if (selectedTool) setTool(selectedTool.id)

      if (key === 'f') {
        setFillShapes((prev) => !prev)
      }

      if (key === 'escape') {
        setTool('pen')
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    fillBackground()

    history.current = []
    historyIndex.current = -1

    pushSnapshot()
  }, [])

  return (
    <div className="whiteboard">
      <header className="wb-header">
        <div className="wb-brand">
          <button
            className="wb-back"
            onClick={() => setOnSelect('home')}
            title="Back to home"
          >
            <ArrowLeft size={18} />
          </button>

          <div>
            <h1>Deepalaya</h1>
            <span>Rangoli Maker</span>
          </div>
        </div>

        <div className="wb-actions">
          <button
            onClick={undo}
            disabled={!canUndo}
            title="Undo (Ctrl + Z)"
          >
            <Undo size={17} />
          </button>

          <button
            onClick={redo}
            disabled={!canRedo}
            title="Redo (Ctrl + Shift + Z)"
          >
            <Redo size={17} />
          </button>

          <button onClick={clearCanvas} title="Clear canvas">
            <Trash size={17} />
            <span>Clear</span>
          </button>

          <button onClick={shareCanvas} title="Share">
            <Share2 size={17} />
          </button>

          <button className="wb-export" onClick={saveCanvas}>
            <Download size={17} />
            <span>Export PNG</span>
          </button>
        </div>
      </header>

      <main className="wb-editor">
        <aside className="wb-tool-rail">
          <span className="rail-label">TOOLS</span>

          {TOOLS.map(({ id, label, icon: Icon, key }) => (
            <button
              key={id}
              className={`wb-tool ${tool === id ? 'active' : ''}`}
              onClick={() => setTool(id)}
              title={`${label} (${key})`}
              aria-label={`${label} (${key})`}
              aria-pressed={tool === id}
            >
              <Icon size={20} />
              <span className="tool-shortcut">{key}</span>
            </button>
          ))}

          <div className="rail-divider" />

          <button
            className={`wb-tool ${fillShapes ? 'active' : ''}`}
            onClick={() => setFillShapes((prev) => !prev)}
            title="Toggle shape fill (F)"
            aria-label="Toggle shape fill"
            aria-pressed={fillShapes}
          >
            <PaintBucket size={20} />
            <span className="tool-shortcut">F</span>
          </button>
        </aside>

        <section className="wb-workspace">
          <div className="wb-canvas-info">
            <div>
              <span className="workspace-title">Your canvas</span>
              <span className="workspace-subtitle">
                Let your creativity bloom
              </span>
            </div>

            <span className="canvas-dimensions">900 × 600</span>
          </div>

          <div className="wb-stage">
            <canvas
              ref={canvasRef}
              className="canvas"
              width={CANVAS_WIDTH}
              height={CANVAS_HEIGHT}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              onLostPointerCapture={handlePointerUp}
            />
          </div>

          <div className="wb-status">
            <span>
              <span className="status-dot" />
              Your artwork is ready to create
            </span>

            <span>
              Shortcuts available · Press F for shape fill
            </span>
          </div>
        </section>

        <aside className="wb-palette-panel">
          <div className="palette-heading">
            <div>
              <Palette size={19} />
              <h2>Colours</h2>
            </div>

            <span>RANGOLI PALETTE</span>
          </div>

          <div className="palette-preview">
            <img
              className="palette-thali"
              src={thaliPalette}
              alt="Traditional seven-bowl colour thali"
            />

            <div className="thali-color-buttons" aria-label="Choose a thali colour">
              {THALI_COLORS.map(({ color, x, y, label }) => (
                <button
                  key={label}
                  type="button"
                  className={`thali-color-button ${
                    currentColor === color ? 'selected' : ''
                  }`}
                  style={{
                    '--bowl-x': `${x}%`,
                    '--bowl-y': `${y}%`,
                    '--bowl-color': color
                  }}
                  onClick={() => pickColor(color)}
                  title={`Select ${label}`}
                  aria-label={`Select ${label}`}
                  aria-pressed={currentColor === color}
                />
              ))}
            </div>
          </div>

          <div className="palette-presets">
            <h3>More colours</h3>

            <div className="color-grid">
              {COLORS.map((color) => (
                <button
                  key={color}
                  className={`color-swatch ${
                    currentColor === color ? 'selected' : ''
                  }`}
                  style={{ '--swatch-color': color }}
                  onClick={() => pickColor(color)}
                  title={color}
                  aria-label={`Select ${color}`}
                  aria-pressed={currentColor === color}
                />
              ))}
            </div>
          </div>

          <div className="custom-color">
            <label htmlFor="custom-color">Custom colour</label>

            <div className="custom-color-control">
              <input
                id="custom-color"
                type="color"
                value={currentColor}
                onChange={(e) => pickColor(e.target.value)}
              />

              <span>{currentColor.toUpperCase()}</span>
            </div>
          </div>

          <div className="shape-settings">
            <h3>Shape settings</h3>

            <label className="fill-toggle">
              <span>
                <PaintBucket size={16} />
                Fill shapes
              </span>

              <input
                type="checkbox"
                checked={fillShapes}
                onChange={(e) => setFillShapes(e.target.checked)}
              />
            </label>

            <label className="size-setting">
              <span>Stroke size</span>
              <strong>{lineWidth}px</strong>
            </label>

            <input
              type="range"
              min="1"
              max="30"
              value={lineWidth}
              onChange={(e) => setLineWidth(Number(e.target.value))}
            />
          </div>
        </aside>
      </main>
    </div>
  )
}