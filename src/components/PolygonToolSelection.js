import { fabric } from "fabric";

export default class PolyToolSelection {
  constructor(canvas, maxPoints = 100) {
    this.polygon = null;
    this.canvas = canvas;
    this.enabled = false;
    this.maxPoints = maxPoints;
    this.editing = false;
    this.currentPoint = null;
    this.points = [];
    this.canvas.on("object:moving", this.onPointMoving);
    this.canvas.on("mouse:dblclick", this.onDraw);
    this.canvas.on("mouse:over", e => {
      if (e.target && e.target.get("type") == "circle") {
        e.target.set("fill", "red");
        this.canvas.renderAll();
      }
    });
    this.canvas.on("mouse:out", e => {
      if (e.target && e.target.get("type") == "circle") {
        e.target.set("fill", "rgba(229, 9, 127,1)");
        this.canvas.renderAll();
      }
    });
  }
  onMouseAction = args => {
    var pt = this.canvas.getPointer(args.e); //get mouse position info
    if (this.enabled) {
      switch (args.e.type) {
        case "mousedown":
          //c onsole.log(`mousedown evt triggered ${pt.x},${pt.y}`);
          if (!this.editing && this.points.length < this.maxPoints) {
            this.points.push({ x: pt.x, y: pt.y });
            console.log({ x: pt.x, y: pt.y });
          }
          break;
        case "mousemove":
          //console.log(`mousemove evt triggered ${pt.x},${pt.y}`)
          break;
      }
    }
  };
  onDraw = e => {
    this.points = this.points.slice(0, this.points.length - 2);
    var options = {
      selectable: false,
      objectCaching: false,
      hasBorders: false,
      hasControls: false,
      lockRotation: true,
      lockScalingFlip: true,
      lockScalingX: true,
      lockScalingY: true,
      lockUniScaling: true,
      lockMovementX: true,
      lockMovementY: true,
      fill: "rgba(229, 9, 127,0.3)"
    };
    this.polygon = new fabric.Polygon(this.points, options);
    this.canvas.add(this.polygon);
    this.points.forEach((point, index) => {
      var circle = new fabric.Circle({
        radius: 5,
        fill: "rgba(229, 9, 127,1)",
        left: point.x,
        top: point.y,
        originX: "center",
        originY: "center",
        hasBorders: false,
        hasControls: false,
        name: index
      });
      this.canvas.add(circle);
      this.editing = true;
    });
    this.canvas.setActiveObject(this.polygon);
    this.canvas.getObjects().forEach((object, index) => {
      if (object.get("type") == "circle") object.bringToFront();
    });
    this.canvas.renderAll();
  };
  reset = () => {
    if (this.polygon) {
      this.points = [];
      this.editing = false;
      this.canvas.remove(this.polygon);
      this.polygon = null;
      this.canvas.getObjects().forEach((object, index) => {
        if (object.get("type") == "circle") this.canvas.remove(object);
      });
    }
  };
  onPointMoving = options => {
    if (this.polygon) {
      var objType = options.target.get("type");
      console.log(objType);
      this.currentPoint = options.target;
      var p = options.target;
      this.polygon.points[p.name] = {
        x: p.getCenterPoint().x,
        y: p.getCenterPoint().y
      };
    }
  };
}
