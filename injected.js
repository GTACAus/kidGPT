(function() {
    'use strict';

    console.log("Injected script running.");

    // Continuously search for the editor container
    const interval = setInterval(() => {
        console.log("Attempting to find editor container.");

        // Select the main editor container
        const editorContainer = document.querySelector('main#editor .editor-container');

        if (editorContainer) {
            console.log("Editor container found, adding Paste Clipboard button.");

            // Create a new button element
            const pasteButton = document.createElement('button');
            pasteButton.textContent = 'Paste Clipboard';
            pasteButton.style.position = 'absolute';
            pasteButton.style.top = '2px';  // Adjust positioning as needed
            pasteButton.style.right = '20px';
            pasteButton.style.padding = '10px';
            pasteButton.style.backgroundColor = '#fff';
            pasteButton.style.color = 'transparent';
            pasteButton.style.border = 'none';
            pasteButton.style.borderRadius = '5px';
            pasteButton.style.cursor = 'pointer';
            pasteButton.style.boxShadow = '0 2px 5px rgba(0,0,0,0.3)';
            pasteButton.style.backgroundImage = 'linear-gradient(90deg, red, orange, yellow, green, blue, indigo, violet)';
            pasteButton.style.backgroundClip = 'text';
            pasteButton.style.webkitBackgroundClip = 'text';
            pasteButton.style.zIndex = '10000';

            // Add click event listener to paste clipboard content
            pasteButton.addEventListener('click', async () => {
                try {
                    const text = await navigator.clipboard.readText();  // Read clipboard content
                    if (text) {
                        // Access the CodeMirror instance
                        const codeMirrorInstance = document.querySelector('.CodeMirror').CodeMirror;
                        if (codeMirrorInstance) {
                            // Clear the entire editor content
                            codeMirrorInstance.setValue('');
                            // Insert the clipboard content, overwriting everything
                            codeMirrorInstance.setValue(text);
                            console.log("Pasted clipboard content into CodeMirror.");
                        } else {
                            alert("CodeMirror instance not found!");
                        }
                    } else {
                        alert("Clipboard is empty!");
                    }
                } catch (err) {
                    alert("Failed to read clipboard: " + err);
                }
            });

            // Append the button to the editor container
            editorContainer.appendChild(pasteButton);

            // Clear the interval once the editor container is found
            clearInterval(interval);
        } else {
            console.log('Editor container not yet found, retrying...');
        }
    }, 1000);  // Check every 1000ms (1 second)
})();