(function() {
    const wordCloudContainer = document.getElementById('word-cloud');
    const heroSection = document.getElementById('hero-section');
    const keywords = [
        'PostgreSQL', 
        'MySQL', 
        'MongoDB', 
        'Kubernetes', 
        'Databases', 
        'Vector',
        'OpenEverest',
        'Helm',
        'ClickHouse',
        'Valkey',
        'Operators',
        'Multi-cloud',
        'Hybrid',
        'Open Source'
    ];
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let floatingElements = [];
    let isForming = false;
    let currentKeywordIndex = 0;
    
    // Create initial floating letters
    function createFloatingLetters(count = 60) {
        for (let i = 0; i < count; i++) {
            const letter = document.createElement('div');
            letter.className = 'floating-letter animating';
            letter.textContent = letters[Math.floor(Math.random() * letters.length)];
            letter.style.left = Math.random() * 100 + '%';
            letter.style.top = Math.random() * 100 + '%';
            letter.style.animationDelay = Math.random() * 8 + 's';
            wordCloudContainer.appendChild(letter);
            floatingElements.push(letter);
        }
    }
    
    // Form a word from floating letters at cursor position
    function formWord(word, mouseX, mouseY) {
        if (isForming) return;
        isForming = true;
        
        const heroRect = heroSection.getBoundingClientRect();
        const spacing = 35;
        const startX = mouseX - (word.length * spacing) / 2;
        const wordY = mouseY;
        
        // Use existing letters to form the word
        for (let i = 0; i < Math.min(word.length, floatingElements.length); i++) {
            const letter = floatingElements[i];
            letter.textContent = word[i];
            letter.classList.add('forming');
            letter.style.left = (startX + i * spacing) + 'px';
            letter.style.top = wordY + 'px';
            letter.style.transform = 'translate(-50%, -50%)';
        }
        
        setTimeout(() => {
            disperseLetters();
        }, 2000);
    }
    
    // Disperse letters back to random positions
    function disperseLetters() {
        floatingElements.forEach(letter => {
            letter.classList.remove('forming');
            letter.textContent = letters[Math.floor(Math.random() * letters.length)];
            letter.style.left = Math.random() * 100 + '%';
            letter.style.top = Math.random() * 100 + '%';
            letter.style.transform = 'none';
        });
        isForming = false;
    }
    
    // Handle mouse movement to trigger word formation
    let lastTriggerTime = 0;
    heroSection.addEventListener('mousemove', function(e) {
        const now = Date.now();
        if (now - lastTriggerTime > 3000 && !isForming) {
            lastTriggerTime = now;
            const rect = heroSection.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            formWord(keywords[currentKeywordIndex], mouseX, mouseY);
            currentKeywordIndex = (currentKeywordIndex + 1) % keywords.length;
        }
    });
    
    // Initialize
    createFloatingLetters();
})();
