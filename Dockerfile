FROM nginx
# Copy in your project's new nginx conf
RUN mv /etc/nginx/nginx.conf /etc/nginx/nginx.conf_orig 
COPY nginx.conf etc/nginx