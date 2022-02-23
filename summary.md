# Billings Property Management

- This site was created for demonstrational purposes only and is not intended for financial gain. Original design credit goes to <a target='_blank' href='https://www.rentinmissoula.com/'> but the code-base is entirely original. Any design changes made were due to personal preference.

# Acknowledgements:
- Thank you to free-use contributors to The Noun Project for the images and icons. Individual credits can be found in the alt tags.
- Thank you to the open source developers who made the image processor Gimp.

# Features:
- Custom dropdown menus
- Custom 'Troubleshooting Tips' UI
- Custom Forms


# Takeaways from this project:
- Using flex box is still my preferred method for responsiveness but grid can be useful for large collections of similar elements (bunch of boxes etc.)

- Using percent (%) and viewport width (vw) for width and auto for height works well for responsiveness. Space the height using margin and padding (preferably in a reset css file).

- I need to build my own custom css reset file where I also keep commonly used variables.

# Improvements needed:

- Property data is simply dummy data so I'll return to this and add a back end and a headless CMS for the customer to easily update listings.

- Need to add emailing of forms upon submission. Unsure of how to do this without Node.js.

- Pressing the back button while on the property detail page will send you back to property search. Obviously a user would expect to return to their search results.

- Users are unable to send links to a specific property which is an obvious flaw. I know how I'd remedy this with React Router but routing with HTML alone is a gap in my knowledge.

# Optimizations needed

## Image format
 - The biggest hit I took on Google Lighthouse was for having my images in JPEG format. In the future I'll use Gimp to export them as WebP files.
## Image Sizing
 - I'm using images that are often bigger than the images rendered which is a waste of resources. In the future I should size them specifically to what I need, even making multiple sizes of the same image if necessary. I may just use the gatsby-image plugin for future websites.
