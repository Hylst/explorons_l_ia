import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';

const TARGET = '{"age":42}';
const TOKENS = ['{"', 'age', '":', ':', '42', '}', '<fin>', 'Bonjour', ' '];

const MaskLab: React.FC = () => {
  const [prefix, setPrefix] = useState('');
  const [message, setMessage] = useState('Choisissez un token. Le masque autorise seulement ceux qui gardent une sortie possible.');

  const choose = (token: string) => {
    if (token === '<fin>') {
      if (prefix === TARGET) {
        setMessage('Sortie complète. Le token de fin est autorisé.');
      } else {
        setMessage('Le token de fin est interdit : le format n’est pas complet.');
      }
      return;
    }
    const next = prefix + token;
    if (TARGET.startsWith(next)) {
      setPrefix(next);
      setMessage(next === TARGET ? 'Format complet. Le token de fin peut maintenant être choisi.' : 'Token autorisé : le préfixe reste compatible avec le format.');
    } else {
      setMessage('Token interdit : il ferait sortir du format.');
    }
  };

  return (
    <Card className="my-6 border-primary/30 bg-primary/5" data-print-hide>
      <CardContent className="p-4 sm:p-5">
        <h3 className="mb-1 text-lg font-semibold">Laboratoire : le masque de tokens</h3>
        <p className="mb-4 text-sm text-muted-foreground">
          Scénario illustratif. Le format cible est <code>{TARGET}</code>. Cliquez les tokens dans l’ordre.
        </p>
        <p className="mb-3 rounded-md border bg-background p-3 font-mono text-sm" aria-live="polite">
          {prefix || '∅'}
        </p>
        <div className="mb-3 flex flex-wrap gap-2">
          {TOKENS.map((token) => {
            const allowed = token === '<fin>' ? prefix === TARGET : TARGET.startsWith(prefix + token);
            return (
              <button
                key={token}
                type="button"
                onClick={() => choose(token)}
                aria-label={`Token ${token === ' ' ? 'espace' : token}`}
                className={`rounded-md border px-2 py-1 font-mono text-xs transition-colors ${
                  allowed ? 'border-primary bg-primary/10 text-primary' : 'border-input text-muted-foreground'
                }`}
              >
                {token}
              </button>
            );
          })}
        </div>
        <p className="mb-3 text-sm" aria-live="polite">{message}</p>
        <button
          type="button"
          onClick={() => {
            setPrefix('');
            setMessage('Choisissez un token. Le masque autorise seulement ceux qui gardent une sortie possible.');
          }}
          className="rounded-md border border-input px-3 py-1.5 text-sm hover:bg-muted"
        >
          Recommencer
        </button>
      </CardContent>
    </Card>
  );
};

export default MaskLab;
