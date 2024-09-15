import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import php from 'highlight.js/lib/languages/php';
import css from 'highlight.js/lib/languages/css';
import xml from 'highlight.js/lib/languages/xml';
import json from 'highlight.js/lib/languages/json';
import sql from 'highlight.js/lib/languages/sql';
import plaintext from 'highlight.js/lib/languages/plaintext';
import shell from 'highlight.js/lib/languages/shell';
import typescript from 'highlight.js/lib/languages/typescript';
import scss from 'highlight.js/lib/languages/scss';
import twig from 'highlight.js/lib/languages/twig';
import markdown from 'highlight.js/lib/languages/markdown';

import './block-code.css';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('php', php);
hljs.registerLanguage('css', css);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('json', json);
hljs.registerLanguage('sql', sql);
hljs.registerLanguage('plaintext', plaintext);
hljs.registerLanguage('shell', shell);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('scss', scss);
hljs.registerLanguage('twig', twig);
hljs.registerLanguage('markdown', markdown);

document.addEventListener('DOMContentLoaded', () => {
    //if this isn't the block editor, highlight all code blocks
    let pre = document.querySelectorAll('pre:not(.block-editor-block-list__block)');
    pre.forEach((block) => {

        if(block.classList.contains('wp-block-code')) {
            block.classList.add('theme-base16-gruvbox-dark-soft');
            let code_block = block.querySelector('code');
            hljs.highlightElement(code_block);
        }

        if (block.classList.contains('wp-block-preformatted')) {
            hljs.highlightElement(block);
        }
    });
});

