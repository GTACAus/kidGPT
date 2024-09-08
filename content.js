(function() {
    'use strict';
    // Function to inject the script into the page
    function injectScript() {
        const script = document.createElement('script');
        script.src = chrome.runtime.getURL('injected.js');  // Load the external script
        script.onload = function() {
            this.remove();  // Remove the script tag after injection
        };
        (document.head || document.documentElement).appendChild(script);
    }

    // Inject the script when the page loads
    window.addEventListener('load', function() {
        console.log("Injecting the external script into the page.");
        injectScript();
    });
    (function() {
    'use strict';

    // Get the current URL or hostname
    const currentUrl = window.location.href;
    const hostname = window.location.hostname;

    // Define behavior for each site
    if (hostname.includes('chat.openai.com') || hostname.includes('chatgpt.com')) {
        // Behavior for ChatGPT
        handleChatGPTBehavior();
    } else if (hostname.includes('glitch.com')) {
        // Behavior for Glitch.com
        handleGlitchBehavior();
    }

    // Function for ChatGPT behavior
    function handleChatGPTBehavior() 
	{// Check if the current URL is chatgpt.com without the #
    if (window.location.hostname.includes('chatgpt.com') && window.location.pathname === '/') {
        // Redirect to chatgpt.com/# if no # exists in the URL
        if (!window.location.hash) {
            console.log("Redirecting to chatgpt.com/#");
            window.location.href = window.location.href + '#';
        }
    }
        console.log("Running behavior for ChatGPT");
        // Load Minecraft font by dynamically appending a <link> tag to the head
    const fontLink = document.createElement('link');
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap'; // Similar retro font
    fontLink.rel = 'stylesheet';
    document.head.appendChild(fontLink);

    const promptText = `I am less than 13 years old.  Apply a very strong profanity filter to your responses.
I am not allowed to sign up for any services or websites and don't have a google login. I'm not allowed to sign up for anything and can't sign up for and change or include API keys in my code.
I want all of my code included in a single HTML file, including styles and scripts. Please make my scripts for me! If a task can be automated, I want you to do it for me. If you think automation might be better, let's do it!
Code is pretty new to me, so please explain in simple terms and don't use words like javascript, styles, API or HTML in your explanations. Explain like I'm ten years old. Whenever you generate code, please generate ALL HTML in full (with no abbreviations or placeholders) even if we have chatted about it for a while. I MUST be able to just post it into Glitch.com and test it by clicking copy code and pasting that into my index.html file in glitch. Also, I can't sign up for API keys and can only use what is freely available. If possible, I would like to access live data if I request it, but if this isn't possible without keys, then don't consider it. I'm from Melbourne, in Australia so understand those units and measurements.
With these instructions, could you please help me with making a website "for a better world"? Please don't generate any code until I tell you what I want to make. Let's work together to make something great!

Please respond to my first prompt in this way:
"I’m here to help you make your website "for a better world." Just let me know what specific things you’d like to include on your website.

Here are some questions to get us started:

What’s the main purpose of your website? For example, do you want to share information, raise awareness, or provide resources?

What kind of information or features do you want? This could be things like text, images, videos, or interactive elements.

Do you have a specific design in mind? For example, colors, layout, or any particular style?

Would you like to include any special features? For instance, a contact form, a gallery, or any interactive elements?

Feel free to share any ideas or inspirations you have, and we can start planning your site from there!"
After the first html you generate would you please return your prompt followed by "You can click Copy Code near the top left corner, then click Go to Glitch.com to paste and test your website.`;

    // Create and add the "Go to Glitch.com" button to the top left of the window
    const glitchButton = document.createElement('button');
    glitchButton.innerText = "Go to Glitch.com";
    glitchButton.style.position = 'fixed';
    glitchButton.style.top = '10px';
    glitchButton.style.left = '10px';
    glitchButton.style.backgroundColor = 'black';
    glitchButton.style.color = 'white';
    glitchButton.style.padding = '10px';
    glitchButton.style.border = 'none';
    glitchButton.style.borderRadius = '5px';
    glitchButton.style.cursor = 'pointer';
    glitchButton.style.zIndex = '10000'; // Ensures it stays on top

    glitchButton.onclick = function() {
        // Send a message to the background script to handle tab switching
        chrome.runtime.sendMessage({ action: 'openOrSwitchToGlitchTab' });
    };

    document.body.appendChild(glitchButton);

    // Create and add the "That didn't work :(" button but keep it hidden initially
    const didntWorkButton = document.createElement('button');
    didntWorkButton.innerText = "Tell KidGPT | That didn't work";
    didntWorkButton.style.position = 'fixed';
    didntWorkButton.style.bottom = '70px';
    didntWorkButton.style.left = '10px';
    didntWorkButton.style.backgroundColor = 'gray';
    didntWorkButton.style.color = 'white';
    didntWorkButton.style.padding = '10px';
    didntWorkButton.style.border = 'none';
    didntWorkButton.style.borderRadius = '5px';
    didntWorkButton.style.cursor = 'pointer';
    didntWorkButton.style.zIndex = '10000'; // Ensures it stays on top
    didntWorkButton.style.display = 'none'; // Hidden initially

    didntWorkButton.onclick = function() {
        const inputBox = document.querySelector('textarea'); // Locate the textarea input box
        if (inputBox) {
            inputBox.value = "That didn't work.  Please ask me 2 questions before generating new code."; // Insert "That didn't work" into the text box
            inputBox.dispatchEvent(new Event('input', { bubbles: true })); // Trigger input event to simulate typing

            // Wait a bit and attempt to find the "Send prompt" button
            setTimeout(function() {
                const sendButton = document.querySelector('button[aria-label="Send prompt"]');
                if (sendButton) {
                    sendButton.focus();
                    setTimeout(function() {
                        sendButton.click(); // Click the button to submit the prompt
                    }, 500); // Delay the click slightly to allow focusing
                }
            }, 500); // Wait 500ms to ensure the send button is ready
        } else {
            console.log('Input box not found.');
        }
    };

    document.body.appendChild(didntWorkButton);

    // Function to display the "That didn't work :(" button after the second non-automated response
    let responseCount = 0;

    const responseObserver = new MutationObserver(function(mutationsList, observer) {
        mutationsList.forEach(function(mutation) {
            mutation.addedNodes.forEach(function(node) {
                if (node.tagName === 'ARTICLE') {
                    responseCount++;
                    if (responseCount === 2) { // Delay the display of the button by 10 seconds after the second response
                        setTimeout(() => {
                            didntWorkButton.style.display = 'block';
                        }, 10000); // 10 second delay
                    }
                }
            });
        });
    });

    // Observe the body for changes, looking for responses (articles)
    responseObserver.observe(document.body, { childList: true, subtree: true });


    // Create loading overlay
    const loadingOverlay = document.createElement('div');
    loadingOverlay.innerHTML = `
        <style>
            @import url('https://fonts.cdnfonts.com/css/minecraft-4');
            .loading-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 1);
                z-index: 9999;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                font-family: 'Minecraft', sans-serif;
                color: white;
            }

            .loading-text {
                font-size: 64px;
                font-family: 'Minecraft', sans-serif;
            }

            #loadingDots {
                font-size: 48px;
                font-family: 'Minecraft', sans-serif;
            }
        </style>

        <div class="loading-overlay">
            <div class="loading-text">KidGPT</div>
            <div id="loadingDots">...</div>
        </div>
    `;
    document.body.appendChild(loadingOverlay);

    // Animate dots
    const dots = ['.', '..', '...'];
    let dotIndex = 0;
    const loadingDotsElement = document.getElementById('loadingDots');
    const dotInterval = setInterval(() => {
        dotIndex = (dotIndex + 1) % dots.length;
        loadingDotsElement.textContent = dots[dotIndex];
    }, 500); // Change dots every 500ms

    // Remove the loading overlay after 10 seconds
    setTimeout(() => {
        clearInterval(dotInterval); // Stop dot animation
        document.body.removeChild(loadingOverlay); // Remove loading overlay
        addTitle(); // Add the title after loading
    }, 10000); // Keep the overlay for 10 seconds

    // Function to add the title with the Minecraft font
    function addTitle() {
        const title = document.createElement('div');
        title.textContent = 'Build a better world';
        title.style.fontFamily = "'Press Start 2P', sans-serif";
        title.style.fontSize = '20px'; // Adjust size as per your preference
        title.style.color = 'gray';
        title.style.position = 'fixed';
        title.style.top = '20px';
        title.style.left = '50%';
        title.style.transform = 'translateX(-50%)';
        title.style.zIndex = '10000'; // Ensure it appears above other elements
        title.style.opacity = '0'; // Start as invisible
        title.style.transition = 'opacity 1s ease-in-out'; // Fade in animation

        document.body.appendChild(title);

        // Fade in the title after the loading overlay is removed
        setTimeout(() => {
            title.style.opacity = '1'; // Make the title visible
        }, 100); // Delay to ensure the overlay is removed
    }
	

    // Wait 5 seconds after the page loads before continuing the script
    setTimeout(function() {
        console.log('Attempting to find the input box');
        const inputBox = document.querySelector('textarea'); // Locate the textarea input box

        if (inputBox) {
            console.log('Input box found, inserting text...');
            inputBox.value = promptText; // Insert text into the input box
            inputBox.dispatchEvent(new Event('input', { bubbles: true })); // Trigger input event to simulate typing

            // Wait a bit and attempt to find the "Send prompt" button
            setTimeout(function() {
                const sendButton = document.querySelector('button[aria-label="Send prompt"]');
                if (sendButton) {
                    console.log('Send button found, focusing and clicking it...');
                    sendButton.focus();

                    setTimeout(function() {
                        sendButton.click(); // Click the button to submit the prompt

                        // Wait 2 seconds before attempting to hide the first article
                        setTimeout(function() {
                            const articleToHide = document.querySelector('article:has(div.whitespace-pre-wrap)');
                            if (articleToHide) {
                                console.log('Hiding the first response...');
                                articleToHide.style.display = 'none'; // Hide the entire article
                            } else {
                                console.log('Article element to hide not found.');
                            }
                        }, 2000); // Wait 2 seconds before attempting to hide
                    }, 500); // Delay the click slightly to allow focusing
                } else {
                    console.log('Send button not found.');
                }
            }, 500); // Wait 1 second to ensure the button is ready
        } else {
            console.log('Input box not found.');
        }

        // Function to hide elements once they appear
        function hideElement(selector) {
            const element = document.querySelector(selector);
            if (element) {
                console.log(`Hiding element: ${selector}`);
                element.style.display = 'none';
            } else {
                console.log(`Element not found: ${selector}`);
            }
        }

        // Function to change the placeholder text of the prompt box
        function changePlaceholder() {
            const textarea = document.querySelector('textarea[placeholder="Message ChatGPT"]');
            if (textarea) {
                textarea.placeholder = "Let's get coding!"; // Change placeholder text
                console.log('Changed placeholder text to: Let\'s get coding!');
            } else {
                console.log('Textarea not found.');
            }
        }

        // Use MutationObserver to track when elements load and hide them
        const observer = new MutationObserver(function() {
            hideElement('button[data-testid="login-button"]'); // Hide the login button
            hideElement('div[aria-label^="Model selector"]'); // Hide the model selector
            hideElement('button[data-testid="signup-button"]'); // Hide the sign-up button
            hideElement('button[aria-label^="New chat"]'); // Hide the new chat button
            hideElement('div.relative.w-full.px-2.py-2.text-center.text-xs.text-token-text-secondary'); // Hide "ChatGPT can make mistakes" div
            changePlaceholder(); // Change placeholder text in textarea
        });

        // Start observing the body for added nodes
        observer.observe(document.body, { childList: true, subtree: true });

    }, 5000); // 5 second delay after the loading overlay starts

    // Create Copy Code button
    const copyButton = document.createElement('button');
    copyButton.textContent = 'Copy Code';
    copyButton.style.position = 'fixed';
    copyButton.style.top = '100px';
    copyButton.style.left = '60px';
    copyButton.style.transform = 'translateX(-50%)';
    copyButton.style.zIndex = '9999';
    copyButton.style.padding = '10px';
    copyButton.style.backgroundColor = '#fff';
    copyButton.style.color = '#fff';
    copyButton.style.border = 'none';
    copyButton.style.borderRadius = '5px';
    copyButton.style.cursor = 'pointer';
    copyButton.style.boxShadow = '0 2px 5px rgba(0,0,0,0.3)';
    copyButton.style.backgroundImage = 'linear-gradient(90deg, red, orange, yellow, green, blue, indigo, violet)';
    copyButton.style.backgroundClip = 'text';
    copyButton.style.webkitBackgroundClip = 'text';
    copyButton.style.color = 'transparent';

    // Append the button to the body
    document.body.appendChild(copyButton);

    // Add click event listener to copy the most recent code block
    copyButton.addEventListener('click', () => {
        const codeBlocks = document.querySelectorAll('pre code');
        if (codeBlocks.length > 0) {
            const lastCodeBlock = codeBlocks[codeBlocks.length - 1];
            const range = document.createRange();
            range.selectNodeContents(lastCodeBlock);
            const selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
            try {
                document.execCommand('copy');
                showPartyFaceEmoji(copyButton);
            } catch (err) {
                console.error('Failed to copy code:', err);
            }
            selection.removeAllRanges();
        } else {
            alert('No code blocks found.');
        }
    });

    function showPartyFaceEmoji(targetElement) {
        const emoji = document.createElement('div');
        emoji.textContent = '🥳';
        emoji.style.position = 'fixed';
        emoji.style.left = targetElement.getBoundingClientRect().left + 'px';
        emoji.style.top = targetElement.getBoundingClientRect().top - 10 + 'px';
        emoji.style.fontSize = '24px';
        emoji.style.zIndex = '9999';
        emoji.style.transition = 'opacity 1s ease-out, transform 1s ease-out';

        document.body.appendChild(emoji);

        // Force reflow to apply the initial styles before animation
        window.getComputedStyle(emoji).opacity;

        // Animate the emoji
        emoji.style.opacity = '0';
        emoji.style.transform = 'translateX(50px)';

        // Remove the emoji after the animation is complete
        setTimeout(() => {
            document.body.removeChild(emoji);
        }, 1000);
    }
    }

    // Function for Glitch.com behavior
    function handleGlitchBehavior() {
	
        console.log("Running behavior for Glitch.com");
        // Define Glitch-specific logic here
        const glitchButton = document.createElement('button');
        glitchButton.innerText = "Go to KidGPT";
        glitchButton.style.position = 'fixed';
        glitchButton.style.top = '10px';
        glitchButton.style.left = '10px';
        glitchButton.style.backgroundColor = 'black';
        glitchButton.style.color = 'white';
        glitchButton.style.padding = '10px';
        glitchButton.style.border = 'none';
        glitchButton.style.borderRadius = '5px';
        glitchButton.style.cursor = 'pointer';
        glitchButton.style.zIndex = '10000'; // Ensure it stays on top
        glitchButton.onclick = function() {
        // Send a message to the background script to handle tab switching
        chrome.runtime.sendMessage({ action: 'openOrSwitchToGPTTab' });
        };
        document.body.appendChild(glitchButton);
    }
	
})();


})();