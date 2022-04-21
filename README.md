# Billings Property Management

- This site was created for demonstrational purposes only and is not intended for financial gain. Original design credit: https://www.rentinmissoula.com/. The code-base is entirely original. Any design changes made were due to personal preference.

 # NPM Dependencies
 - EJS
 - Nodemon
 - Express
 - MongoDB
 - Morgan
 - Mongoose
 - Cors
 - Path

 # Stack
 - EJS/ CSS/ JS/ Node.js/ MongoDB

 # Technologies
 - Google maps API
 - Random User  API
 - Mongoose
 - Express Router


 # Development
- nodemon app


# Features:
## Custom Dropdown Menus
- A smooth-scrolling dropdown effect was done by positioning containers absolutely, with their bottoms aligned with the banner's bottom. Z-index is used to hide them and a CSS transition completes the effect.
    <link>View Live  <link>View Code

## Custom Forms
- Customers can send contact forms, repair requests and report concerns and the information is emailed to the operator using NPM nodemailer.
    <link>View Live  <link>View Code

## Content Management
- Log in as the administrator to edit or remove current listings or create new ones in the Mongo Atlas database.
    <link>View Live  <link>View Code

# Optimizations needed

## Image format
 - The biggest hit I took on Google Lighthouse was for having my images in JPEG format. In the future I'll use Gimp to export them as WebP files.
## Image Sizing
 - I'm using images that are often bigger than the images rendered which is a waste of resources. In the future I should size them specifically to what I need, even making multiple sizes of the same image if necessary. I may just use the gatsby-image plugin for future websites.
## Lazy loading
 - Some of the 3rd party code I'm using (i.e. Google recapcha) are slowing down my initial load. I should have used the IntersectionObserver API to load elements which are 'below the fold' as needed.

 # Acknowledgements:
- Thank you free-use contributors of The Noun Project for the images and icons. Individual credits can be found in the alt tags.
- Thank you to the open source developers who made the image processor Gimp.
