# Manta Ray - Nautical map navigation learning tool

Manta Ray is a nautical map navigation learning tool that allows users to interact with a map and manage two types of markers: sites and a ship. It provides a platform for users to learn about and practice various nautical navigation methods, including latitude & longitude, range & bearing, and lines of position (LOP).

## Features

-   **Map Display:**
    -   Interactive map with support for multiple tile layers (e.g., OpenStreetMap, Google Maps).
-   **Markers:**
    -   **Sites:** Multiple site markers, each with a location (latitude & longitude).
    -   **Ship:** A single ship marker, with location (latitude & longitude) and heading (orientation).
-   **Marker Placement Methods:**
    -   By latitude & longitude.
    -   By range & bearing from another location.
    -   By range & angle plus port/starboard (for sites, from a ship only).
    -   By crossing two lines of position (e.g., bearing, range, depth line).
-   **User Interaction:**
    -   Add, view, and manage markers using various navigation methods.

Manta Ray is designed as an educational tool for learning and practicing nautical navigation concepts interactively on a digital map.

## Installation

1. Install dependencies:
    ```sh
    npm install
    ```
2. Start the development server:
    ```sh
    npm run dev
    ```

## Usage

-   Open your browser and navigate to the local server URL (usually http://localhost:5173).
-   Interact with the map to add, view, and manage site and ship markers using various navigation methods.
