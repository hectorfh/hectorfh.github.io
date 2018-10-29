source bin/page.tcl

st { Linear B&eacute;zier curve. }

p {
  The most basic B&eacute;zier curve is defined by two points in the plane or space.
  In fact, it's not a curve, it consists of a straight line that goes from point P0 to point P1.
}

p {
  We could say that this curve is the line described by all the points that results from applying the following function:
}

p {
  <strong>P0 + (P1 - P0) * t</strong> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; with t being all the numbers between 0 and 1.
}

p {
  ( this is the same that &nbsp;&nbsp; <strong>P0 + P1 * t - P0 * t</strong> &nbsp;&nbsp; or &nbsp;&nbsp; <strong>P0 * (1 - t) +  P1 * t</strong> &nbsp;&nbsp; )
}
      
p {
  If you want to draw it programming, just iterate over t and calculate and draw the points with the formula above.
}

img "../img/bezier-intro/Bezier_1_big.gif"

st { Quadratic B&eacute;zier curve. }

p {
  Now it gets more interesting.
}

p {
  This curve is defined by three points in the plane or space. Let's suppose P0, P1 and P2. Again we will have t in a range from 0 to 1.
}

p {
  We get two line segments, P0P1 and P1P2.
  Let's take the "t" point for P0P1 segment, let's call it Q0 for the sake of example, and the "t" point for P1P2 segment, Q1. We have a new segment Q0Q1.
}

p {
  Let's calculate and draw the "t" point for it, as it is one of the points that belongs to the curve.
}

p {
  Let's repeat the operation for every "t" between 0 and 1.
}

img "../img/bezier-intro/Bezier_2_big.svg.png"
img "../img/bezier-intro/Bezier_2_big.gif"

st { Cubic B&eacute;zier curve. }

p {
  I guess we have already got Pierre B&eacute;zier's idea with quadratic curves.
}

p {
  In this case we have four points: P0, P1, P2, P3. So we have three line segments: P0P1, P1P2 and P2P3.
}

p {
  We'll get the "t" point for those segments: Q0, Q1 and Q2.
}

p {
  Now we have one extra step: we need to get the "t" point for Q0Q1 and Q1Q2 segments: R0 and R1.
}

p {
  Finally let's draw the "t" point for R0R1 and repeat the process for "t" between 0 and 1.
}

img "../img/bezier-intro/Bezier_3_big.svg.png"
img "../img/bezier-intro/Bezier_3_big.gif"

st { Higher degree B&eacute;zier curves. }

p {
  So far, we have build B&eacute;zier curves with degree one (linear), two (quadratic) and three (cubic).
}

p {
  But the same applied recursive method could be used with any degree curve.
}

p {
  Following animations show the construction of degree four and degree five curves:
}

end pages/bezier-intro.html
