import json
import numpy as np
import matplotlib.pyplot as plt

# Get JSON input from the user
json_input = input("Enter JSON data: ")

try:
    # Parse the user input as JSON
    data = json.loads(json_input)

    # Convert the JSON data to a numpy array
    heatmap_data = np.array(data)

    # Create the heatmap using matplotlib
    plt.figure(figsize=(8, 6))  # Adjust the figure size as needed
    plt.imshow(heatmap_data, cmap='viridis', interpolation='nearest')
    plt.colorbar(label='Color Scale')  # Add a colorbar
    plt.title('Heatmap from JSON Data')
    plt.xlabel('X-axis')
    plt.ylabel('Y-axis')

    # Show the heatmap
    plt.show()
except json.JSONDecodeError as e:
    print(f"Error parsing JSON: {e}")
except Exception as e:
    print(f"An error occurred: {e}")
"""
[
  [1, 2, 3, 4, 5],
  [2, 3, 4, 5, 6],
  [3, 4, 5, 6, 7],
  [4, 5, 6, 7, 8],
  [5, 6, 7, 8, 9]
]

"""