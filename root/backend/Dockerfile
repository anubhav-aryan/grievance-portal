# Use the official Golang image as the base image
FROM golang:1.19.4 AS backend-build

# Set the working directory inside the container
WORKDIR /app

# Copy the Go modules manifests
COPY go.mod go.sum ./

# Download the Go module dependencies
RUN go mod download

# Copy the source code from the host to the container
COPY . .

# Build the Go application
RUN go build -o main .

# Expose a port (if your application listens on a specific port)
EXPOSE 8080

# Define the command to run your application
CMD ["./main"]