# Start with node image
FROM node:16.20.2-buster-slim

# Set the working directory
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the files
COPY . .

# RUN mv .env.example .env

# Build the client app for production
RUN npm run build

# Expose the port
EXPOSE 3000

# Start the client app
CMD ["npm", "start"]
