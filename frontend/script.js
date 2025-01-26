let tapCount = 0;
let lastTap = 0;

document.getElementById('panic-button').addEventListener('click', function () {
    const currentTime = new Date().getTime();
    const timeDifference = currentTime - lastTap;

    // If the time difference between two taps is less than 500ms, it's considered a double tap
    if (timeDifference < 500 && timeDifference > 0) {
        tapCount++;

        // If it's a double tap, trigger the alert
        if (tapCount === 2) {
            // Reset the tap count
            tapCount = 0;
            document.getElementById('message').textContent = "Fetching current location...";

            if (navigator.geolocation) {
                // Use Geolocation API to get the user's current location
                navigator.geolocation.getCurrentPosition(
                    async (position) => {
                        const latitude = position.coords.latitude;
                        const longitude = position.coords.longitude;

                        console.log(`Current Location: Lat ${latitude}, Long ${longitude}`);  // Corrected string interpolation
                        document.getElementById('message').textContent = "Sending alert...";

                        // Send the current location to the backend
                        try {
                            const response = await fetch("http://127.0.0.1:5000/live-location", {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({
                                    latitude: latitude,
                                    longitude: longitude,
                                }),
                            });

                            if (response.ok) {
                                const data = await response.json();
                                console.log("Response from backend:", data);
                                document.getElementById('message').textContent = "Alert sent successfully!";
                            } else {
                                console.error("Failed to send alert:", response.statusText);
                                document.getElementById('message').textContent = "Failed to send alert!";
                            }
                        } catch (error) {
                            console.error("Network error while sending location:", error);
                            document.getElementById('message').textContent = "Network error, try again!";
                        }
                    },
                    (error) => {
                        console.error("Error fetching location:", error);
                        document.getElementById('message').textContent = "Failed to fetch location!";
                    },
                    { enableHighAccuracy: true } // Ensure accurate GPS location
                );
            } else {
                console.error("Geolocation is not supported by this browser.");
                document.getElementById('message').textContent = "Geolocation not supported!";
            }
        }
    } else {
        tapCount = 1; // Reset tap count if time difference is too large
    }
    lastTap = currentTime;
});
