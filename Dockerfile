# Use an official Node runtime as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and yarn.lock files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

# Expose the port Expo runs on
EXPOSE 8081

# Set environment
ENV APP_ENV=dev

# Set the command to run your app
CMD ["yarn", "start"]