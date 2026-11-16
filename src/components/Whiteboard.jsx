import './Whiteboard.css'
import { useState,useRef, useEffect } from 'react'
import { Eraser,Brush, Pen, Undo,Trash,ArrowLeft, Download } from 'lucide-react';
const CANVAS_HEIGHT = 600;
const CANVAS_WIDTH = 900;
const COLORS = [
    "#000000", // Black
    "#6B7280", // Gray
    "#FFFFFF", // White
    "#EF4444", // Red
    "#F97316", // Orange
    "#F59E0B", // Amber
    "#EAB308", // Yellow
    "#22C55E", // Green
    "#14B8A6", // Teal
    "#3B82F6", // Blue
    "#6366F1", // Indigo
    "#A855F7", // Purple
    "#EC4899", // Pink
    "#8B5CF6"  // Violet
];
export default function Whiteboard({onBack}){
    
    const canvasRef = useRef(null);
    const isDrawing = useRef(false);
    const [lineWidth,setLineWidth] = useState(3);
    const [currentColor, setCurrentColor] = useState("#000000");
    const [tool,setTool] = useState('pencil');
    const history = useRef([])

   function handleMouseMove(e){
        if(!isDrawing.current)return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (x > (CANVAS_WIDTH) || x<0|| y<0|| y > (CANVAS_HEIGHT)){
        isDrawing.current = false;
        return;
    }
    const ctx = canvasRef.current.getContext('2d');
    ctx.lineTo(x,y);
    ctx.stroke();

   }
function clearCanvas() {
    const ctx = canvasRef.current.getContext('2d');

    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    const snapshot = canvasRef.current.toDataURL();
    if (history.current[history.current.length - 1] !== snapshot) {
        history.current.push(snapshot);
    }

}
    function handleMouseDown(e){
    isDrawing.current = true;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const ctx = canvasRef.current.getContext('2d');
    ctx.lineCap = 'round';
    if (tool === "pencil"){
        ctx.globalCompositeOperation = 'source-over';
    }
    else if (tool === "eraser"){
        ctx.globalCompositeOperation = 'destination-out';
    }
    ctx.beginPath();
    ctx.strokeStyle = currentColor;
    ctx.lineWidth = (tool === "pencil")? lineWidth: 20;
    ctx.moveTo(x,y);
    }

function handleMouseUp() {
    if (!isDrawing.current) return;

    isDrawing.current = false;

    const snapShot = canvasRef.current.toDataURL();
    history.current.push(snapShot);
}
function undo() {
    if (history.current.length === 0) return;

    history.current.pop();

    const ctx = canvasRef.current.getContext('2d');

    if (history.current.length === 0) {
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        return;
    }

    const img = new Image();

    img.src = history.current[history.current.length - 1];

    img.onload = () => {
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        ctx.drawImage(img, 0, 0);
    };
}
function saveCanvas(){
    const canvas = canvasRef.current;
    const image = canvas.toDataURL("image/png")
    const link = document.createElement('a');
    link.download = "rangoli.png"
    link.href = image;
    link.click();
}
useEffect(() => {
    history.current.push(canvasRef.current.toDataURL());
}, []);
    return(
        <div className="whiteboard">
            <div className="header-sect">
                <h1>Rangooli</h1>
                <div className="main-btns">
                    <button className="undo-btn" type="button" onClick={undo}><Undo />Undo</button>
                    <button className="clear-btn" onClick={()=>clearCanvas()}><Trash />Clear</button>
                    <button className="download-btn" onClick={saveCanvas}><Download/> Save PNG</button>
                    <button type="button" onClick={onBack}><ArrowLeft />Back</button>
                </div>
                
            </div>
            <aside className='tool-bar'>
                <button className={tool === "pencil" ? "brush-btn active" : "brush-btn"} onClick={()=>{ setTool('pencil')}}><Brush />Pen</button>
                <button className={tool === "eraser" ? "eraser-btn active" : "eraser-btn"} onClick={()=>{ setTool('eraser')}}><Eraser />Eraser</button>
                <label>Size</label>
                <input type='range' max={20} step={1} value={lineWidth} onChange={(e)=>setLineWidth(Number(e.target.value))}/>
            <div className="color-palette">
                <label>Colors:</label>
            {COLORS.map((color) => (
                <button
                key={color}
                className={`color-option ${currentColor === color ? 'active' : ''}`}
                style={{ backgroundColor: color }}
                onClick={() => setCurrentColor(color)}
                title={color}
                aria-label={`Select ${color}`}
                />
                ))}
            </div>
            <label className='color-label'>Custom color</label>
            <input type='color' value={currentColor} onChange={(e)=>{
                setCurrentColor(e.target.value);
            }}/>

            </aside>
            <main className="rangoli-canvas">
                <canvas
            height={CANVAS_HEIGHT}
            width={CANVAS_WIDTH}
            ref={canvasRef}
            className='canvas'
            onMouseMove={(e)=>{
                handleMouseMove(e);
            }}
            onMouseDown={(e)=>{
                handleMouseDown(e)
            }}
            onMouseUp={(e)=>{
                handleMouseUp(e)
            }}
            onMouseLeave={(e)=>
            {
                handleMouseUp(e);
            }
            }
            >

            </canvas>
            </main>
            
            
        </div>
    )
}