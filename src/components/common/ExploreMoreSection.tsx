// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later


import React from 'react';
import SectionHeading from '@/components/SectionHeading';
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

interface ExploreMoreProps {
  links: {
    to: string;
    label: string;
    variant?: "default" | "outline" | "secondary";
  }[];
}

const ExploreMoreSection: React.FC<ExploreMoreProps> = ({ links }) => {
  return (
    <section className="section-container">
      <div className="max-w-3xl mx-auto text-center">
        <SectionHeading
          pretitle="Explorer"
          title="Découvrez plus"
          description="Approfondissez vos connaissances en explorant les autres sections du site."
          center
        />

        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          {links.map((link, index) => (
            <Button 
              key={index}
              asChild 
              size="lg" 
              variant={link.variant || "default"} 
              className="animate-fade-in" 
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Link to={link.to}>
                {link.label}
              </Link>
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExploreMoreSection;
