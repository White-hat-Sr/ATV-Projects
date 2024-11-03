const titleInput = document.getElementById('titleInput');
const codeInput = document.getElementById('codeInput');
const addSnippetButton = document.getElementById('addSnippetButton');
const snippetList = document.getElementById('snippetList');
const searchInput = document.getElementById('searchInput');

let snippets = JSON.parse(localStorage.getItem('snippets')) || [];

// Function to render snippets
const renderSnippets = (filteredSnippets) => {
    snippetList.innerHTML = '';
    filteredSnippets.forEach((snippet, index) => {
        const snippetDiv = document.createElement('div');
        snippetDiv.classList.add('snippet');
        snippetDiv.innerHTML = `
            <h3>${snippet.title}</h3>
            <pre>${snippet.code}</pre>
            <button class="copyIcon" data-index="${index}">📋</button>
            <button class="deleteButton" data-index="${index}">Delete</button>
        `;
        snippetList.appendChild(snippetDiv);
    });

    // Add event listeners for the copy icon and delete button
    document.querySelectorAll('.copyIcon').forEach(icon => {
        icon.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            copyToClipboard(snippets[index].code);
        });
    });

    document.querySelectorAll('.deleteButton').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            snippets.splice(index, 1);
            localStorage.setItem('snippets', JSON.stringify(snippets));
            renderSnippets(snippets);
        });
    });
};

// Function to copy code to clipboard
const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code).then(() => {
        alert('Snippet copied to clipboard!');
    }).catch(err => {
        console.error('Error copying text: ', err);
    });
};

// Function to add a snippet
const addSnippet = () => {
    if (titleInput.value && codeInput.value) {
        snippets.push({ title: titleInput.value, code: codeInput.value });
        localStorage.setItem('snippets', JSON.stringify(snippets));
        renderSnippets(snippets);
        titleInput.value = '';
        codeInput.value = '';
    } else {
        alert('Please fill in both fields.');
    }
};

// Search function
searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    const filteredSnippets = snippets.filter(snippet =>
        snippet.title.toLowerCase().includes(query) || snippet.code.toLowerCase().includes(query)
    );
    renderSnippets(filteredSnippets);
});

// Event listener for the add snippet button
addSnippetButton.addEventListener('click', addSnippet);

// Initial rendering of snippets
renderSnippets(snippets);
