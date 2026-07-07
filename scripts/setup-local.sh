#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

echo "→ Instalando dependências..."
npm install

if [ ! -f .env.local ]; then
  echo "→ Criando .env.local..."
  cat > .env.local <<'EOF'
# Desenvolvimento local
ADMIN_PASSWORD=rodolfo2026
ADMIN_SECRET=rodolfo-portfolio-dev-secret
BLOB_READ_WRITE_TOKEN=
EOF
else
  echo "→ .env.local já existe, mantendo."
fi

echo ""
echo "✓ Setup concluído!"
echo ""
echo "Para iniciar o servidor:"
echo "  cd \"$ROOT\""
echo "  npm run dev"
echo ""
echo "Abra: http://localhost:3000/pt"
echo "Admin: http://localhost:3000/admin"
