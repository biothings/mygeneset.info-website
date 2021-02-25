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
6. Set the fill/stroke colors of any remaining shapes to `currentColor`
7. The `viewBox` attribute determines the boundaries of the SVG (like a frame/window into the image), in the format `x y width height`.
Make it square, and crop it until the image centered and fit right up to the boundaries.
