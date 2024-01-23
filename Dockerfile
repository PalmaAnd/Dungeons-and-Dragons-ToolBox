# Use an official Node runtime as a parent image
FROM node:20

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Env variables
ENV DATABASE_URL = $DATABASE_URL
ENV NEXTAUTH_URL = $NEXTAUTH_URL
ENV NEXTAUTH_SECRET = $NEXTAUTH_SECRET
ENV DISCORD_CLIENT_ID = $DISCORD_CLIENT_ID
ENV DISCORD_CLIENT_SECRET = $DISCORD_CLIENT_SECRET

# Install app dependencies
RUN npm install

# Copy the entire project to the working directory
COPY . .

# Build the React app
RUN npm run build

# Expose the port your app will run on
EXPOSE 3000

# Define the command to run your app
CMD ["npm", "start"]
