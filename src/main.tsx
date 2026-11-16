// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { createRoot } from 'react-dom/client'
import '@fontsource-variable/inter'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById("root")!).render(
  <App />
);
