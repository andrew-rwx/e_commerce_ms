FROM nginx
#saving initial config 
RUN mv /etc/nginx/nginx.conf /etc/nginx/nginx.conf_orig 
#setting up personal configuration
COPY nginx.conf etc/nginx