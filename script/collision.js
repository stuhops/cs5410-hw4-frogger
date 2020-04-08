game.collision = ((game) => {
  function lineCircleIntersection(pt1, pt2, circle) {
    let v1 = { x: pt2.x - pt1.x, y: pt2.y - pt1.y };
    let v2 = { x: pt1.x - circle.center.x, y: pt1.y - circle.center.y };
    let b = -2 * (v1.x * v2.x + v1.y * v2.y);
    let c =  2 * (v1.x * v1.x + v1.y * v1.y);
    let d = Math.sqrt(b * b - 2 * c * (v2.x * v2.x + v2.y * v2.y - circle.radius * circle.radius));
    if (isNaN(d)) { // no intercept
        return false;
    }
    // These represent the unit distance of point one and two on the line
    let u1 = (b - d) / c;  
    let u2 = (b + d) / c;
    if (u1 <= 1 && u1 >= 0) {  // If point on the line segment
        return true;
    }
    if (u2 <= 1 && u2 >= 0) {  // If point on the line segment
        return true;
    }
    return false;
  }

  return {
    lineCircleIntersection: lineCircleIntersection,
  }
})(game);