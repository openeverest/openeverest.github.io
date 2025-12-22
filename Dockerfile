
FROM hugomods/hugo:exts-0.147.3

WORKDIR /src

# Copy package files first for better caching
COPY package*.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Expose port 5000
EXPOSE 5000

# Run Hugo server
CMD ["hugo", "server", "-D", "--bind", "0.0.0.0", "--port", "5000", "--baseURL", "/", "--appendPort=false"]
