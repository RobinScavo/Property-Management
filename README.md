# Billings Property Management

- This site was created for demonstrational purposes only and is not intended for financial gain. Original design credit: https://www.rentinmissoula.com/. The code-base is entirely original. Any design changes made were due to personal preference.


# Acknowledgements:
- Thank you free-use contributors of The Noun Project for the images and icons. Individual credits can be found in the alt tags.
- Thank you to the open source developers who made the image processor Gimp.


# Features:
- Custom dropdown menus
- Custom Forms and Models
- Custom Content Manager


# Improvements needed:

- Add database and headless CMS (property data is POJO dummy data).
- Add restful routing so users can send specific property links.
- I lose some of functionality when viewed on my iPhone (animation transitions and the carousel). I have much to learn about browsers on mobile devices.


# Optimizations needed

## Image format
 - The biggest hit I took on Google Lighthouse was for having my images in JPEG format. In the future I'll use Gimp to export them as WebP files.
## Image Sizing
 - I'm using images that are often bigger than the images rendered which is a waste of resources. In the future I should size them specifically to what I need, even making multiple sizes of the same image if necessary. I may just use the gatsby-image plugin for future websites.
## Lazy loading
 - Some of the 3rd party code I'm using (i.e. Google recapcha) are slowing down my initial load. I should have used the IntersectionObserver API to load elements which are 'below the fold' as needed.
 ## Minimize main-thread work
 - I need to read more about this.

 # NPM Dependencies
 - EJS
 - Nodemon
 - Express
 - MongoDB
 - Morgan
 - Mongoose
 - Cors

 # Stack
 - EJS/ CSS/ JS/ Node.js/ MongoDB

 # Technologies
 - Google maps API
 - Random User  API
 - Mongoose
 - Express Router
 - Netlify Forms

 # Development
- nodemon app
