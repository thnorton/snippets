# Use an official Python image as the base
FROM python:3.10-slim

# Set the working directory inside the container
WORKDIR /snippets

# Copy only the requirements file first (for caching)
COPY requirements.txt /snippets/

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire app into the container
COPY . /snippets

# Expose the Django development server port
EXPOSE 8000

# Default command to run Django's development server
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]

