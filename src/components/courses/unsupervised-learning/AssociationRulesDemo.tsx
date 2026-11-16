// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later


import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, TrendingUp } from 'lucide-react';

const AssociationRulesDemo: React.FC = () => {
  const [selectedRule, setSelectedRule] = useState(0);

  const transactions = [
    ['Pain', 'Lait', 'Œufs'],
    ['Pain', 'Beurre'],
    ['Lait', 'Œufs', 'Fromage'],
    ['Pain', 'Lait', 'Beurre'],
    ['Œufs', 'Fromage'],
    ['Pain', 'Lait'],
    ['Beurre', 'Fromage'],
    ['Pain', 'Œufs'],
    ['Lait', 'Fromage', 'Yaourt'],
    ['Pain', 'Lait', 'Œufs', 'Beurre']
  ];

  const rules = [
    {
      antecedent: 'Pain',
      consequent: 'Lait',
      support: 50,
      confidence: 83,
      lift: 1.25,
      interpretation: "50% des transactions contiennent Pain ET Lait. Parmi ceux qui achètent du Pain, 83% achètent aussi du Lait."
    },
    {
      antecedent: 'Œufs',
      consequent: 'Fromage',
      support: 30,
      confidence: 75,
      lift: 1.5,
      interpretation: "30% des transactions contiennent Œufs ET Fromage. Parmi ceux qui achètent des Œufs, 75% achètent aussi du Fromage."
    },
    {
      antecedent: 'Lait',
      consequent: 'Œufs',
      support: 40,
      confidence: 67,
      lift: 1.33,
      interpretation: "40% des transactions contiennent Lait ET Œufs. Parmi ceux qui achètent du Lait, 67% achètent aussi des Œufs."
    }
  ];

  const baseRule = rules[selectedRule];
  const countWith = (...items: string[]) => transactions.filter((ticket) => items.every((item) => ticket.includes(item))).length;
  const nTickets = transactions.length;
  const nBoth = countWith(baseRule.antecedent, baseRule.consequent);
  const nAntecedent = countWith(baseRule.antecedent);
  const nConsequent = countWith(baseRule.consequent);
  const liftValue = (nBoth / nTickets) / ((nAntecedent / nTickets) * (nConsequent / nTickets));
  const supportValue = Math.round((nBoth / nTickets) * 100);
  const confidenceValue = Math.round((nBoth / nAntecedent) * 100);
  const liftReading =
    liftValue > 1.005
      ? "Le lift est supérieur à 1\u00A0: les deux achats sont plus fréquents ensemble que si les achats étaient indépendants."
      : liftValue < 0.995
        ? "Le lift est inférieur à 1\u00A0: les deux achats sont moins fréquents ensemble que si les achats étaient indépendants."
        : "Le lift vaut 1\u00A0: les deux achats sont indépendants, la règle n'apporte pas d'information.";
  const currentRule = {
    ...baseRule,
    support: supportValue,
    confidence: confidenceValue,
    lift: liftValue.toFixed(2).replace('.', ','),
    interpretation: `${supportValue}\u00A0% des tickets contiennent ${baseRule.antecedent} ET ${baseRule.consequent}. Parmi les tickets qui contiennent ${baseRule.antecedent}, ${confidenceValue}\u00A0% contiennent aussi ${baseRule.consequent}. ${liftReading}`
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-green-800 dark:text-green-400 bg-green-100 dark:bg-green-950/40';
    if (confidence >= 60) return 'text-orange-800 bg-orange-100 dark:text-orange-400 dark:bg-orange-900/40';
    return 'text-red-700 bg-red-100 dark:text-red-400 dark:bg-red-900/40';
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Dataset fictif : 10 tickets de caisse d'un supermarché
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-sm">
            {transactions.map((transaction, index) => (
              <div key={index} className="bg-muted/50 p-2 rounded">
                <div className="font-medium text-xs text-muted-foreground mb-1">
                  Ticket #{index + 1}
                </div>
                <div className="flex flex-wrap gap-1">
                  {transaction.map((item, itemIndex) => (
                    <Badge key={itemIndex} variant="outline" className="text-xs">
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Règles d'association évaluées sur ces 10 tickets
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-4 flex-wrap">
            {rules.map((_, index) => (
              <Button
                key={index}
                variant={selectedRule === index ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedRule(index)}
              >
                Règle {index + 1}
              </Button>
            ))}
          </div>

          <div className="bg-linear-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 p-6 rounded-lg">
            <div className="text-center mb-4">
              <div className="text-2xl font-bold">
                {currentRule.antecedent} → {currentRule.consequent}
              </div>
              <p className="text-muted-foreground text-sm mt-2">
                "Si {currentRule.antecedent} alors {currentRule.consequent}"
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="text-center p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{currentRule.support} %</div>
                <div className="text-sm font-medium">Support</div>
                <div className="text-xs text-muted-foreground">Fréquence de la règle</div>
              </div>
              
              <div className="text-center p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                <div className={`text-2xl font-bold ${getConfidenceColor(currentRule.confidence)}`}>
                  {currentRule.confidence} %
                </div>
                <div className="text-sm font-medium">Confiance</div>
                <div className="text-xs text-muted-foreground">Fiabilité de la règle</div>
              </div>
              
              <div className="text-center p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{currentRule.lift}</div>
                <div className="text-sm font-medium">Lift</div>
                <div className="text-xs text-muted-foreground">Force de l'association</div>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-950/30 border-l-4 border-blue-400 p-4 rounded-r-lg">
              <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                💡 Interprétation
              </h4>
              <p className="text-blue-700 dark:text-blue-300 text-sm">
                {currentRule.interpretation}
              </p>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-muted/50 p-3 rounded">
              <h5 className="font-semibold mb-1">Support</h5>
              <p>Pourcentage de transactions contenant les deux éléments</p>
            </div>
            <div className="bg-muted/50 p-3 rounded">
              <h5 className="font-semibold mb-1">Confiance</h5>
              <p>Probabilité d'acheter B quand on achète A</p>
            </div>
            <div className="bg-muted/50 p-3 rounded">
              <h5 className="font-semibold mb-1">Lift</h5>
              <p>Mesure la force réelle de l'association ({'>'}1 = association positive)</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AssociationRulesDemo;
