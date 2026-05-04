#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// React Navigation native の NavigationContainer.js を修正
const navContainerPath = path.join(
  __dirname,
  'node_modules/@react-navigation/native/lib/module/NavigationContainer.js'
);

if (fs.existsSync(navContainerPath)) {
  let content = fs.readFileSync(navContainerPath, 'utf-8');
  
  // ESM インポートを修正（拡張子を明示的に指定）
  content = content.replace(
    "import { useBackButton } from './useBackButton';",
    "import { useBackButton } from './useBackButton.js';"
  );
  content = content.replace(
    "import { useDocumentTitle } from './useDocumentTitle';",
    "import { useDocumentTitle } from './useDocumentTitle.js';"
  );
  content = content.replace(
    "import { useLinking } from './useLinking';",
    "import { useLinking } from './useLinking.js';"
  );
  
  fs.writeFileSync(navContainerPath, content, 'utf-8');
  console.log('✅ React Navigation NavigationContainer.js patched');
}

// React Navigation elements の HeaderBackButton.js を修正
const headerBackButtonPath = path.join(
  __dirname,
  'node_modules/@react-navigation/elements/lib/module/Header/HeaderBackButton.js'
);

if (fs.existsSync(headerBackButtonPath)) {
  let content = fs.readFileSync(headerBackButtonPath, 'utf-8');
  
  // ESM インポートを修正
  content = content.replace(
    "import { MaskedView } from '../MaskedView';",
    "import { MaskedView } from '../MaskedView.js';"
  );
  
  fs.writeFileSync(headerBackButtonPath, content, 'utf-8');
  console.log('✅ React Navigation HeaderBackButton.js patched');
}

console.log('✅ All patches applied successfully');
