function loadNotes() {
    const notesList = document.getElementById('notes-list');
    const notes = getNotes();
    
    if (notes.length === 0) {
        notesList.innerHTML = '<p class="loading-text" style="text-align: center; padding: 20px;">No tienes notas guardadas</p>';
        return;
    }
    
    notesList.innerHTML = notes.map((note, index) => `
        <div class="note-item">
            <h4>${escapeHtml(note.title)}</h4>
            <div class="note-date">${formatDate(note.date)}</div>
            <div class="note-text">${escapeHtml(note.content)}</div>
            <div class="note-actions">
                <button onclick="editNote(${index})"><i class="fas fa-edit"></i> Editar</button>
                <button class="delete" onclick="deleteNote(${index})"><i class="fas fa-trash"></i> Eliminar</button>
            </div>
        </div>
    `).join('');
}

function saveNote() {
    const title = document.getElementById('note-title').value.trim();
    const content = document.getElementById('note-content').value.trim();
    
    if (!title || !content) {
        alert('Por favor, completa el título y el contenido de la nota.');
        return;
    }
    
    const notes = getNotes();
    const editIndex = document.getElementById('note-title').dataset.editIndex;
    
    if (editIndex !== undefined) {
        // Editar nota existente
        notes[editIndex] = { title, content, date: notes[editIndex].date };
        delete document.getElementById('note-title').dataset.editIndex;
    } else {
        // Nueva nota
        notes.push({
            title: title,
            content: content,
            date: new Date().toISOString()
        });
    }
    
    localStorage.setItem('albionNotes', JSON.stringify(notes));
    clearNoteForm();
    loadNotes();
}

function editNote(index) {
    const notes = getNotes();
    const note = notes[index];
    
    document.getElementById('note-title').value = note.title;
    document.getElementById('note-content').value = note.content;
    document.getElementById('note-title').dataset.editIndex = index;
    
    // Scroll al editor
    document.querySelector('.notes-editor').scrollIntoView({ behavior: 'smooth' });
}

function deleteNote(index) {
    if (!confirm('¿Seguro que quieres eliminar esta nota?')) return;
    
    const notes = getNotes();
    notes.splice(index, 1);
    localStorage.setItem('albionNotes', JSON.stringify(notes));
    loadNotes();
}

function clearNoteForm() {
    document.getElementById('note-title').value = '';
    document.getElementById('note-content').value = '';
    delete document.getElementById('note-title').dataset.editIndex;
}

function getNotes() {
    try {
        return JSON.parse(localStorage.getItem('albionNotes')) || [];
    } catch {
        return [];
    }
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}