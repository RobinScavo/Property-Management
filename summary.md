# Property management

- Adding the image gallary slowed the site considerably. So far I've tried manually minifying the images to limited effect. I may need to use a plugin but this points to the need for Gatsby or something.


- Using flex box is still my preferred method for responsiveness but grid can be useful for large collections of similar elements (bunch of boxes etc.)

- Using percent (%) and viewport width (vw) for width and auto for height works well for responsiveness. Space the height using margin and padding (preferably in a reset css file).

- I need to build my own custom css reset file where I also keep commonly used variables.

- Need to add emailing of forms upon submission. Unsure of how to do this without Node.js.

- Pressing the back button while on the property detail page will send you back to property search. Obviously a user would expect to return to their search results. This is due to my lack of routing.

- Users are unable to send links to a specific property which is an obvious flaw. I know how I'd handle this with React but routing with HTML alone is a gap in my knowledge.
