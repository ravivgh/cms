import { TbRectangle } from "react-icons/tb";
import { IoMdDownload } from "react-icons/io";
import { FaLongArrowAltRight } from "react-icons/fa";
import { LuPencil } from "react-icons/lu";
import { GiArrowCursor } from "react-icons/gi";
import { FaRegCircle } from "react-icons/fa6";
import { FaUndo } from "react-icons/fa";
import { FaRedo } from "react-icons/fa";

import {
  Arrow,
  Circle,
  Layer,
  Line,
  Rect,
  Stage,
  Text,
  Transformer,
} from "react-konva";
import { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function App() {
  const ACTIONS = {
    SELECT: "SELECT",
    RECTANGLE: "RECTANGLE",
    CIRCLE: "CIRCLE",
    SCRIBBLE: "SCRIBBLE",
    ARROW: "ARROW",
    TEXT: "text",
  };
  const stageRef = useRef();
  const [action, setAction] = useState(ACTIONS.SELECT);
  const [fillColor, setFillColor] = useState("black");
  const [rectangles, setRectangles] = useState([]);
  const [circles, setCircles] = useState([]);
  const [arrows, setArrows] = useState([]);
  const [scribbles, setScribbles] = useState([]);

  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);

  const strokeColor = "#000";
  const isPaining = useRef();
  const currentShapeId = useRef();
  const transformerRef = useRef();
  const [texts, setTexts] = useState([]); // Store texts
  const [inputValue, setInputValue] = useState(""); // Text input value
  const [currentTextId, setCurrentTextId] = useState(null); // Track the text being edited
  const inputRef = useRef(); // Ref for the input element

  // Handle right-click to show input box
  const handleRightClick = (e) => {
    e.evt.preventDefault(); // Use e.evt to access the native event

    // Get the mouse position on the canvas
    const stage = e.target.getStage();
    const pointerPosition = stage.getPointerPosition();

    // Store the mouse position and set text editing
    setCurrentTextId(null); // No existing text to edit
    setInputValue(""); // Clear previous text
    inputRef.current.style.left = `${pointerPosition.x}px`;
    inputRef.current.style.top = `${pointerPosition.y}px`;
    inputRef.current.style.display = "block"; // Show the input box
    inputRef.current.focus(); // Focus on the input field
  };

  // Handle text input changes
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Handle text input blur (saving text)
  const handleInputBlur = () => {
    if (inputValue.trim() === "") return;

    // If editing existing text, update it, otherwise add a new text
    setTexts([
      ...texts,
      {
        id: Date.now(),
        text: inputValue,
        x: parseInt(inputRef.current.style.left, 10),
        y: parseInt(inputRef.current.style.top, 10),
      },
    ]);
    setInputValue(""); // Clear input
    inputRef.current.style.display = "none"; // Hide the input field
  };
  const isDraggable = action === ACTIONS.SELECT;

  const saveStateToUndo = () => {
    const currentState = { rectangles, circles, arrows, scribbles };
    setUndoStack((prev) => [...prev, currentState]);
    setRedoStack([]); // Clear redo stack on new action
  };

  function onPointerDown() {
    if (action === ACTIONS.SELECT) return;

    const stage = stageRef.current;
    const { x, y } = stage.getPointerPosition();
    const id = uuidv4();

    currentShapeId.current = id;
    isPaining.current = true;

    saveStateToUndo(); // Save the current state before making changes

    switch (action) {
      case ACTIONS.RECTANGLE:
        setRectangles((rectangles) => [
          ...rectangles,
          {
            id,
            x,
            y,
            height: 20,
            width: 20,
            fillColor,
          },
        ]);
        break;
      case ACTIONS.CIRCLE:
        setCircles((circles) => [
          ...circles,
          {
            id,
            x,
            y,
            radius: 20,
            fillColor,
          },
        ]);
        break;
      case ACTIONS.ARROW:
        setArrows((arrows) => [
          ...arrows,
          {
            id,
            points: [x, y, x + 20, y + 20],
            fillColor,
          },
        ]);
        break;
      case ACTIONS.SCRIBBLE:
        setScribbles((scribbles) => [
          ...scribbles,
          {
            id,
            points: [x, y],
            fillColor,
          },
        ]);
        break;
    }
  }

  function onPointerMove() {
    if (action === ACTIONS.SELECT || !isPaining.current) return;

    const stage = stageRef.current;
    const { x, y } = stage.getPointerPosition();

    switch (action) {
      case ACTIONS.RECTANGLE:
        setRectangles((rectangles) =>
          rectangles.map((rectangle) => {
            if (rectangle.id === currentShapeId.current) {
              return {
                ...rectangle,
                width: x - rectangle.x,
                height: y - rectangle.y,
              };
            }
            return rectangle;
          })
        );
        break;
      case ACTIONS.CIRCLE:
        setCircles((circles) =>
          circles.map((circle) => {
            if (circle.id === currentShapeId.current) {
              return {
                ...circle,
                radius: ((y - circle.y) ** 2 + (x - circle.x) ** 2) ** 0.5,
              };
            }
            return circle;
          })
        );
        break;
      case ACTIONS.ARROW:
        setArrows((arrows) =>
          arrows.map((arrow) => {
            if (arrow.id === currentShapeId.current) {
              return {
                ...arrow,
                points: [arrow.points[0], arrow.points[1], x, y],
              };
            }
            return arrow;
          })
        );
        break;
      case ACTIONS.SCRIBBLE:
        setScribbles((scribbles) =>
          scribbles.map((scribble) => {
            if (scribble.id === currentShapeId.current) {
              return {
                ...scribble,
                points: [...scribble.points, x, y],
              };
            }
            return scribble;
          })
        );
        break;
    }
  }

  function onPointerUp() {
    isPaining.current = false;
  }

  const handleUndo = () => {
    if (undoStack.length === 0) return;
    const previousState = undoStack[undoStack.length - 1];
    setRectangles(previousState.rectangles);
    setCircles(previousState.circles);
    setArrows(previousState.arrows);
    setScribbles(previousState.scribbles);
    setRedoStack((prev) => [...prev, previousState]);
    setUndoStack(undoStack.slice(0, -1)); // Remove last undone state
  };

  const handleRedo = () => {
    if (redoStack.length === 0) return;
    const nextState = redoStack[redoStack.length - 1];
    setRectangles(nextState.rectangles);
    setCircles(nextState.circles);
    setArrows(nextState.arrows);
    setScribbles(nextState.scribbles);
    setUndoStack((prev) => [...prev, nextState]);
    setRedoStack(redoStack.slice(0, -1)); // Remove last redone state
  };

  function handleExport() {
    const uri = stageRef.current.toDataURL();
    var link = document.createElement("a");
    link.download = "image.png";
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function onClick(e) {
    if (action !== ACTIONS.SELECT) return;
    const target = e.currentTarget;
    transformerRef.current.nodes([target]);
  }

  return (
    <>
      <div className="relative w-full h-screen overflow-hidden bg-black">
        <svg
          aria-hidden="true"
          className="pointer-events-none h-[450px] w-full fill-gray-400/30 stroke-gray-400/30 opacity-40 hidden lg:block absolute inset-0 [mask-image:radial-gradient(600px_circle_at_center,white,transparent)]"
        >
          <defs>
            <pattern
              id="patternRhflb"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
              x="-1"
              y="-1"
            >
              <path d="M.5 60V.5H60" fill="none" strokeDasharray="0 0"></path>
            </pattern>
          </defs>
          <rect
            width="100%"
            height="100%"
            strokeWidth="0"
            fill="url(#patternRhflb)"
          ></rect>
        </svg>
        {/* Controls */}
        <div className="absolute top-0 z-10 w-full py-2 ">
          <div className="flex justify-center items-center gap-3 py-2 px-3 w-fit mx-auto bg-[#1c1c1c] shadow-lg rounded-lg">
            <button
              className={
                action === ACTIONS.SELECT
                  ? "from-[#3b3c3f] via-[#116752]  to-[#1d68bd]  bg-gradient-to-t p-1 rounded"
                  : "p-1 hover:bg-[#242424] rounded"
              }
              onClick={() => setAction(ACTIONS.SELECT)}
            >
              <GiArrowCursor size={"20px"} className="text-white" />
            </button>
            <button
              className={`
                bg-[#2d2d2d]
                ${
                  action === ACTIONS.RECTANGLE
                    ? "from-[#3b3c3f] via-[#116752]  to-[#1d68bd]  bg-gradient-to-t p-1 rounded"
                    : "p-1 hover:bg-[#242424] rounded"
                }
                 `}
              onClick={() => setAction(ACTIONS.RECTANGLE)}
            >
              <TbRectangle size={"20px"} className="text-white" />
            </button>
            <button
              className={`
                bg-[#2d2d2d] p-2
                ${
                  action === ACTIONS.CIRCLE
                    ? "from-[#3b3c3f] via-[#116752]  to-[#1d68bd]  bg-gradient-to-t p-1 rounded"
                    : "p-1 hover:bg-[#242424] rounded"
                }`}
              onClick={() => setAction(ACTIONS.CIRCLE)}
            >
              <FaRegCircle size={"15px"} className="text-white" />
            </button>
            <button
              className={`
                bg-[#2d2d2d]
                ${
                  action === ACTIONS.ARROW
                    ? "from-[#3b3c3f] via-[#116752]  to-[#1d68bd]  bg-gradient-to-t p-1 rounded"
                    : "p-1 hover:bg-[#242424] rounded"
                }`}
              onClick={() => setAction(ACTIONS.ARROW)}
            >
              <FaLongArrowAltRight size={"20px"} className="text-white" />
            </button>
            <button
              className={`bg-[#2d2d2d] p-2 ${
                action === ACTIONS.SCRIBBLE
                  ? "from-[#3b3c3f] via-[#116752]  to-[#1d68bd]  bg-gradient-to-t p-1 rounded"
                  : "p-1 hover:bg-[#242424] rounded"
              }`}
              onClick={() => setAction(ACTIONS.SCRIBBLE)}
            >
              <LuPencil size={"15px"} className="text-white" />
            </button>

            <button>
              <input
                className="w-8 h-8 bg-[#2d2d2d] p-1 rounded"
                type="color"
                value={fillColor}
                onChange={(e) => setFillColor(e.target.value)}
              />
            </button>

            <button onClick={handleExport} className="bg-[#2d2d2d] p-2 rounded">
              <IoMdDownload size={"15px"} className="text-white" />
            </button>

            <button onClick={handleUndo} className="bg-[#2d2d2d] p-2 rounded">
              <FaUndo className="text-white" />
            </button>
            <button onClick={handleRedo} className="bg-[#2d2d2d] p-2 rounded">
              <FaRedo className="text-white" />
            </button>
          </div>
          <div className="flex items-center justify-center mt-3">
            <span className="bg-[#242424] py-1 text-gray-500 px-3 text-sm">
              Your need according use Tools
            </span>
          </div>
        </div>
        <svg
          aria-hidden="true"
          className="pointer-events-none h-[450px] w-full fill-gray-400/30 stroke-gray-400/30 opacity-40 hidden lg:block absolute inset-0 [mask-image:radial-gradient(600px_circle_at_center,white,transparent)]"
        >
          <defs>
            <pattern
              id="patternRhflb"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
              x="-1"
              y="-1"
            >
              <path d="M.5 60V.5H60" fill="none" strokeDasharray="0 0"></path>
            </pattern>
          </defs>
          <rect
            width="100%"
            height="100%"
            strokeWidth="0"
            fill="url(#patternRhflb)"
          ></rect>
        </svg>
        {/* Canvas */}
        <Stage
          ref={stageRef}
          width={window.innerWidth}
          height={window.innerHeight}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onContextMenu={handleRightClick}
        >
          <Layer>
            <Rect
              x={0}
              y={0}
              height={window.innerHeight}
              width={window.innerWidth}
              fill="#121212"
              id="bg"
              onClick={() => {
                transformerRef.current.nodes([]);
              }}
            />

            {rectangles.map((rectangle) => (
              <Rect
                key={rectangle.id}
                x={rectangle.x}
                y={rectangle.y}
                stroke="#fff"
                strokeWidth={2}
                fill={rectangle.fillColor}
                height={rectangle.height}
                width={rectangle.width}
                draggable={isDraggable}
                onClick={onClick}
              />
            ))}

            {circles.map((circle) => (
              <Circle
                key={circle.id}
                radius={circle.radius}
                x={circle.x}
                y={circle.y}
                stroke="#fff"
                strokeWidth={2}
                fill={circle.fillColor}
                draggable={isDraggable}
                onClick={onClick}
              />
            ))}
            {arrows.map((arrow) => (
              <Arrow
                key={arrow.id}
                points={arrow.points}
                stroke="#fff"
                strokeWidth={2}
                fill={arrow.fillColor}
                draggable={isDraggable}
                onClick={onClick}
              />
            ))}
            {texts.map((text) => (
              <Text
                key={text.id}
                text={text.text}
                x={text.x}
                y={text.y}
                fontSize={20}
                fill="#fff"
                draggable
              />
            ))}
            {scribbles.map((scribble) => (
              <Line
                key={scribble.id}
                lineCap="round"
                lineJoin="round"
                points={scribble.points}
                stroke="#ffffff"
                strokeWidth={2}
                fill={scribble.fillColor}
                draggable={isDraggable}
                onClick={onClick}
              />
            ))}

            <Transformer ref={transformerRef} />
          </Layer>
        </Stage>
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          style={{
            position: "absolute",
            display: "none", // Initially hidden
            padding: "5px",
            fontSize: "16px",
          }}
        />
        <svg
          aria-hidden="true"
          className="pointer-events-none h-[450px] w-full fill-gray-400/30 stroke-gray-400/30 opacity-40 hidden lg:block absolute inset-0 [mask-image:radial-gradient(600px_circle_at_center,white,transparent)]"
        >
          <defs>
            <pattern
              id="patternRhflb"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
              x="-1"
              y="-1"
            >
              <path d="M.5 60V.5H60" fill="none" strokeDasharray="0 0"></path>
            </pattern>
          </defs>
          <rect
            width="100%"
            height="100%"
            strokeWidth="0"
            fill="url(#patternRhflb)"
          ></rect>
        </svg>
      </div>
    </>
  );
}
