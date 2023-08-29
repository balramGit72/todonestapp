# Use the official Node.js LTS (Long Term Support) image as the base image
FROM node:16.14.2

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Copy the TypeScript configuration file to the working directory
COPY tsconfig.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application files to the container
COPY . .

# Build the Nest.js application
RUN npm run build

# Expose the port that your Nest.js app listens on (change 3000 to the appropriate port if needed)
EXPOSE 3000

# Command to start your Nest.js app
CMD ["node", "dist/src/main.js"]
