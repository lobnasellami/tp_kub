# Stage 1: Build the React app
FROM node:14 AS build

WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app
RUN npm run build

# Stage 2: Serve the React app using Nginx
FROM nginx:alpine

# Remove the default Nginx configuration
RUN rm -rf /usr/share/nginx/html/*

# Copy the built React app from the build stage to Nginx's web root directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose the port that Nginx will listen on (default is 80)
EXPOSE 80

# Start Nginx when a container is run
CMD ["nginx", "-g", "daemon off;"]