const fs = require('fs');
const texts = [
    ['Sidebar Title', 'sidebar_title', 19, '#1a1a1a', '700'],
    ['Sidebar Subtitle', 'sidebar_subtitle', 14, '#888888', '500'],
    ['Index Number', 'index_number', 14, '#cccccc', '600'],
    ['Badge', 'badge', 13, '#3d5afe', '600'],
    ['Main Heading', 'main_heading', 42, '#101828', '800'],
    ['Description', 'description', 18, '#475467', '400'],
    ['Feature Text', 'feature', 15, '#344054', '700']
];

let schema = '';
let css = '';

texts.forEach(([name, prefix, size, color, weight]) => {
  schema += `
        {
          "type": "header",
          "content": "${name} Typography"
        },
        {
          "type": "font_picker",
          "id": "${prefix}_font",
          "label": "Font Family",
          "default": "outfit_n4"
        },
        {
          "type": "range",
          "id": "${prefix}_size",
          "min": 10,
          "max": 80,
          "step": 1,
          "unit": "px",
          "label": "Font Size",
          "default": ${size}
        },
        {
          "type": "select",
          "id": "${prefix}_weight",
          "label": "Font Weight",
          "options": [
            {"value": "100", "label": "100"},
            {"value": "200", "label": "200"},
            {"value": "300", "label": "300"},
            {"value": "400", "label": "400"},
            {"value": "500", "label": "500"},
            {"value": "600", "label": "600"},
            {"value": "700", "label": "700"},
            {"value": "800", "label": "800"},
            {"value": "900", "label": "900"}
          ],
          "default": "${weight}"
        },
        {
          "type": "select",
          "id": "${prefix}_style",
          "label": "Font Style",
          "options": [
            {"value": "normal", "label": "Normal"},
            {"value": "italic", "label": "Italic"}
          ],
          "default": "normal"
        },
        {
          "type": "color",
          "id": "${prefix}_color",
          "label": "Text Color",
          "default": "${color}"
        },`;

  let cssSelector = '';
  if (prefix === 'sidebar_title') cssSelector = `.mcp-sidebar-item[data-target="block-\${block.id}"] .mcp-item-title`;
  else if (prefix === 'sidebar_subtitle') cssSelector = `.mcp-sidebar-item[data-target="block-\${block.id}"] .mcp-item-subtitle`;
  else if (prefix === 'index_number') cssSelector = `.mcp-sidebar-item[data-target="block-\${block.id}"] .mcp-item-number`;
  else if (prefix === 'badge') cssSelector = `#block-\${block.id} .mcp-badge`;
  else if (prefix === 'main_heading') cssSelector = `#block-\${block.id} .mcp-main-heading`;
  else if (prefix === 'description') cssSelector = `#block-\${block.id} .mcp-description`;
  else if (prefix === 'feature') cssSelector = `#block-\${block.id} .mcp-card-text`;

  css += `
  {{ block.settings.${prefix}_font | font_face: font_display: 'swap' }}
  ${cssSelector} {
    font-family: {{ block.settings.${prefix}_font.family }}, {{ block.settings.${prefix}_font.fallback_families }};
    font-size: {{ block.settings.${prefix}_size }}px;
    font-weight: {{ block.settings.${prefix}_weight }};
    font-style: {{ block.settings.${prefix}_style }};
    color: {{ block.settings.${prefix}_color }};
  }
`;
});

fs.writeFileSync('schema_gen.txt', schema + '\n\n\n' + css);
