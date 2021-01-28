Instructions to make consistent, good-looking species icons:

1. Look for a well-designed, solid-fill, monochrome, rounded icon on these sites, in order of preference:
    1. fontawesome.com
    2. material.io/resources/icons
    3. materialdesignicons.com
    4. thenounproject.com
2. Download as SVG
3. Run SVG through jakearchibald.github.io/svgomg with all options enabled except for `remove xmlns` and `shapes to (smaller) paths`.
4. Open SVG in text editor
5. Remove all elements and attributes except for `<svg xmlns="..." viewBox="...">` and shapes (`<path>`, `<circle>`, `<rect>`).
Look for spurious or unnecessary elements, like `<g>`'s, invisible `<rect>`'s, empty `<def>`'s, copyright text, etc.
6. The `viewBox` attribute determines the boundaries of the SVG (like a frame/window into the image), in the format `x y width height`.
Make it square, and crop it until the image centered and fit right up to the boundaries.

RECOMMENDED: To do step 6 visually, install a browser extension like Tampermonkey, make sure the extension [can access local files](https://stackoverflow.com/a/55568568/2180570), and add the following script to run when you open any svg file:

```javascript
// ==UserScript==
// @name         Debug SVG
// @include *.svg
// ==/UserScript==

(function() {
    'use strict';

    const ns = "http://www.w3.org/2000/svg";
    const svg = document.querySelector("svg");
    const [x, y, width, height] = svg.getAttribute("viewBox").split(/\s/).map(n => Number(n));
    const rect = document.createElementNS(ns, "rect");
    rect.setAttribute("x", x + 0.5);
    rect.setAttribute("y", y + 0.5);
    rect.setAttribute("width", width - 1);
    rect.setAttribute("height", height - 1);
    rect.setAttribute("fill", "none");
    rect.setAttribute("stroke", "red");
    rect.setAttribute("stroke-opacity", "0.5");
    rect.setAttribute("stroke-width", "1");
    svg.insertBefore(rect, svg.firstChild);
})();
```

All this script does is insert a rectangle with a red outline with the same position/size as the view box.
Note: the exact boundaries of the view box are the OUTSIDE of the red outline, not the inside.
