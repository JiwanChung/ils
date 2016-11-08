heroku create ils3
heroku buildpacks:set https://github.com/AdmitHub/meteor-buildpack-horse.git
heroku addons:create mongolab
heroku config:set ROOT_URL="https://ils3.herokuapp.com"
git push heroku master
