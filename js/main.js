/*
██████  ██ ███████ ███████
██   ██ ██ ██      ██
██   ██ ██ █████   █████
██   ██ ██ ██      ██
██████  ██ ██      ██
2021 ~ Mark Hillard | (mark@)markhillard.com
*/


// diff view
var diffOutput = document.getElementById('diffOutput');
function diff(viewType) {
    // use strict mode
    'use strict';
    
    // diff variables
    var baseText = difflib.stringAsLines(document.getElementById('baseText').value),
        newText = difflib.stringAsLines(document.getElementById('newText').value),
        sm = new difflib.SequenceMatcher(baseText, newText),
        opCodes = sm.get_opcodes(),
        contextSize = document.getElementById('contextSize').value;
        
    // reset diff output html
    while (diffOutput.lastChild.className !== 'fullscreen') {
        diffOutput.removeChild(diffOutput.lastChild);
    }
    
    // check for matching text strings
    if (baseText.toString() === newText.toString()) {
        diffOutput.style.display = 'none';
        alert('perfect match!');
    } else {
        contextSize = contextSize || null;
        diffOutput.style.display = 'block';
        diffOutput.appendChild(diffview.buildView({
            baseTextLines: baseText,
            newTextLines: newText,
            opcodes: opCodes,
            baseTextName: 'Base Text',
            newTextName: 'New Text',
            contextSize: contextSize,
            viewType: viewType
        }));
    }
}

// context update
function contextUpdate() {
    if (diffOutput.offsetParent !== null) {
        if (document.getElementsByClassName('diff')[0].classList.contains('inlinediff')) {
            diff(1);
        } else {
            diff(0);
        }
    }
}

// fullscreen toggle
function fullScreen(el) {
    diffOutput.classList.toggle('expand');
    if (el.getAttribute('title') === 'Expand') {
        el.setAttribute('title', 'Collapse');
    } else {
        el.setAttribute('title', 'Expand');
    }
}

// clear
function clearAll() {
    diffOutput.style.display = 'none';
    document.getElementById('baseText').value = '';
    document.getElementById('newText').value = '';
}
