// QR Code Generator Script
document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const qrText = document.getElementById('qr-text');
    const qrSize = document.getElementById('qr-size');
    const errorLevel = document.getElementById('error-level');
    const foregroundColor = document.getElementById('foreground-color');
    const backgroundColor = document.getElementById('background-color');
    const generateBtn = document.getElementById('generate-btn');
    const downloadBtn = document.getElementById('download-btn');
    const qrCanvas = document.getElementById('qr-canvas');
    const qrInfo = document.querySelector('.qr-info');

    // Initialize QR code on page load
    // Wait for QRCode library to load
    if (typeof QRCode !== 'undefined') {
        generateQRCode();
    } else {
        // If QRCode is not loaded yet, wait a bit and try again
        setTimeout(() => {
            if (typeof QRCode !== 'undefined') {
                generateQRCode();
            } else {
                console.error('QRCode library failed to load');
                showError();
            }
        }, 1000);
    }

    // Event listeners
    generateBtn.addEventListener('click', generateQRCode);
    downloadBtn.addEventListener('click', downloadQRCode);

    // Auto-generate when settings change
    qrText.addEventListener('input', debounce(generateQRCode, 500));
    qrSize.addEventListener('change', generateQRCode);
    errorLevel.addEventListener('change', generateQRCode);
    foregroundColor.addEventListener('change', generateQRCode);
    backgroundColor.addEventListener('change', generateQRCode);

    // Generate QR Code function
    function generateQRCode() {
        // Check if QRCode library is available
        if (typeof QRCode === 'undefined') {
            console.error('QRCode library not loaded');
            showError();
            return;
        }
        
        const text = qrText.value.trim();
        
        if (!text) {
            showPlaceholder();
            return;
        }

        const size = parseInt(qrSize.value);
        const errorCorrectionLevel = errorLevel.value;
        const fgColor = foregroundColor.value;
        const bgColor = backgroundColor.value;

        // Update canvas size
        qrCanvas.width = size;
        qrCanvas.height = size;

        // Generate QR code options
        const options = {
            width: size,
            margin: 2,
            color: {
                dark: fgColor,
                light: bgColor
            },
            errorCorrectionLevel: errorCorrectionLevel
        };

        // Generate QR code using QRCode.js library
        QRCode.toCanvas(qrCanvas, text, options, function(error) {
            if (error) {
                console.error('Error generating QR code:', error);
                showError();
            } else {
                showSuccess();
                downloadBtn.disabled = false;
            }
        });
    }

    // Show placeholder state
    function showPlaceholder() {
        const ctx = qrCanvas.getContext('2d');
        const size = parseInt(qrSize.value);
        
        // Clear canvas
        ctx.clearRect(0, 0, size, size);
        
        // Draw placeholder
        ctx.fillStyle = '#f3f4f6';
        ctx.fillRect(0, 0, size, size);
        
        ctx.fillStyle = '#9ca3af';
        ctx.font = `${size / 20}px Inter`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('QR Code', size / 2, size / 2 - 10);
        ctx.fillText('will appear here', size / 2, size / 2 + 10);
        
        qrInfo.innerHTML = `
            <p>Your QR code will appear here</p>
            <p>Enter some text or a URL above to generate a QR code</p>
        `;
        downloadBtn.disabled = true;
    }

    // Show error state
    function showError() {
        qrInfo.innerHTML = `
            <p style="color: #ef4444;">Error generating QR code</p>
            <p>Please check your input and try again</p>
        `;
        downloadBtn.disabled = true;
    }

    // Show success state
    function showSuccess() {
        const text = qrText.value.trim();
        const isUrl = text.startsWith('http://') || text.startsWith('https://');
        
        qrInfo.innerHTML = `
            <p style="color: #10b981;">✓ QR Code generated successfully!</p>
            <p>${isUrl ? 'URL' : 'Text'} encoded: ${text.length > 50 ? text.substring(0, 50) + '...' : text}</p>
            <p>Click "Download QR Code" to save the image</p>
        `;
    }

    // Download QR Code function
    function downloadQRCode() {
        const text = qrText.value.trim();
        if (!text) return;

        // Create a temporary link element
        const link = document.createElement('a');
        link.download = `qr-code-${Date.now()}.png`;
        
        // Convert canvas to blob and create download link
        qrCanvas.toBlob(function(blob) {
            const url = URL.createObjectURL(blob);
            link.href = url;
            link.click();
            
            // Clean up
            setTimeout(() => {
                URL.revokeObjectURL(url);
            }, 100);
        }, 'image/png');
    }

    // Debounce function to limit API calls
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Add some example templates
    addExampleTemplates();
});

// Add example templates for quick testing
function addExampleTemplates() {
    const qrText = document.getElementById('qr-text');
    
    // Create template buttons
    const templateContainer = document.createElement('div');
    templateContainer.style.cssText = `
        margin-top: 20px;
        padding-top: 20px;
        border-top: 1px solid rgba(255, 255, 255, 0.2);
    `;
    
    const templateTitle = document.createElement('h4');
    templateTitle.textContent = 'Quick Templates:';
    templateTitle.style.cssText = `
        color: #ffffff;
        margin-bottom: 15px;
        font-size: 1rem;
        font-weight: 600;
    `;
    
    templateContainer.appendChild(templateTitle);
    
    const templates = [
        { name: 'Portfolio', text: 'https://lachlanwilliams.github.io' },
        { name: 'GitHub', text: 'https://github.com/LachlanWilliams' },
        { name: 'LinkedIn', text: 'https://www.linkedin.com/in/lachlan-w/' },
        { name: 'Contact Info', text: 'BEGIN:VCARD\nVERSION:3.0\nFN:Lachlan Williams\nTEL:+1234567890\nEMAIL:lachlan@example.com\nEND:VCARD' },
        { name: 'WiFi', text: 'WIFI:S:MyWiFi;T:WPA;P:mypassword123;;' }
    ];
    
    const buttonContainer = document.createElement('div');
    buttonContainer.style.cssText = `
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
    `;
    
    templates.forEach(template => {
        const button = document.createElement('button');
        button.textContent = template.name;
        button.style.cssText = `
            padding: 8px 16px;
            border: 1px solid rgba(255, 255, 255, 0.3);
            border-radius: 6px;
            background: rgba(255, 255, 255, 0.1);
            color: #ffffff;
            font-size: 0.85rem;
            cursor: pointer;
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
        `;
        
        button.addEventListener('mouseenter', () => {
            button.style.background = 'rgba(255, 255, 255, 0.2)';
            button.style.transform = 'translateY(-1px)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.background = 'rgba(255, 255, 255, 0.1)';
            button.style.transform = 'translateY(0)';
        });
        
        button.addEventListener('click', () => {
            qrText.value = template.text;
            // Trigger QR code generation
            const event = new Event('input', { bubbles: true });
            qrText.dispatchEvent(event);
        });
        
        buttonContainer.appendChild(button);
    });
    
    templateContainer.appendChild(buttonContainer);
    
    // Insert after the textarea
    const textareaContainer = qrText.parentElement;
    textareaContainer.appendChild(templateContainer);
} 