# Autokino.Tirol Boilerplate

Unfortunately this project will never go live. Used the time to extract this minimal boilerplate:  
Supports:
- **gulp**
gulp is used to automate the build and development process. All files are compiled into the */dist* folder.
It uses *browser-sync* to automatically re-compile and refresh the site running in your browser. Starts the development server at *localhost:3000*
- **ES6**
Javascript Code gets automatically transpiled from ES6 to ES5 for backwards compatibility.
- **Bootstrap**
Bootstrap is imported into the main SCSS file and served locally without CDN
- **SCSS**
Your SCSS gets transpiled using gulp-sass
- **Docker and docker-compose**
Deploy your website behind the latest stable release of NGINX and use docker-compose to deploy your website along with [letsencrypt-nginx-proxy-companion](https://github.com/nginx-proxy/docker-letsencrypt-nginx-proxy-companion) for SSL
