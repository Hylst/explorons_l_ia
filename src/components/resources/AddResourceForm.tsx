// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { useForm, type FieldError, type FieldErrors, type Resolver } from "react-hook-form";
import { z } from "zod";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Drawer, DrawerContent, DrawerDescription, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import { mailtoAuthor } from "@/config/site";
import { RESOURCE_TYPE_LABELS } from "@/components/resources/resourceTypeLabels";
import { buildProposalEmail } from "@/components/resources/proposalMailto";


const resourceSchema = z.object({
  title: z.string().min(3, "Le titre doit contenir au moins 3 caractères"),
  author: z.string().min(2, "L'auteur doit contenir au moins 2 caractères"),
  description: z.string().min(10, "La description doit contenir au moins 10 caractères"),
  link: z.string().url("Veuillez entrer une URL valide"),
  type: z.enum(["book", "article", "video", "course", "website", "tool"]),
  level: z.enum(["Débutant", "Intermédiaire", "Avancé", "Tous niveaux"]),
  language: z.enum(["FR", "EN"]),
  year: z.number().min(1950).max(new Date().getFullYear()).optional(),
  topics: z.string().optional()
});

type ResourceFormValues = z.infer<typeof resourceSchema>;

// Resolver local : zod 4 expose `issues` et non `error.errors`, que l'ancien
// adaptateur de @hookform/resolvers ne reconnaissait pas.
const resourceResolver: Resolver<ResourceFormValues> = async (values) => {
  const parsed = resourceSchema.safeParse(values);
  if (parsed.success) return { values: parsed.data, errors: {} };

  const errors: FieldErrors<ResourceFormValues> = {};
  for (const issue of parsed.error.issues) {
    const field = issue.path[0] as keyof ResourceFormValues | undefined;
    if (!field || errors[field]) continue;
    errors[field] = { type: issue.code, message: issue.message } as FieldError;
  }
  return { values: {} as ResourceFormValues, errors };
};

export const AddResourceForm = ({ 
  isOpen, 
  onClose 
}: { 
  isOpen: boolean; 
  onClose: () => void;
}) => {
  const isMobile = useIsMobile();
  
  const form = useForm<ResourceFormValues>({
    resolver: resourceResolver,
    defaultValues: {
      title: "",
      author: "",
      description: "",
      link: "",
      type: "article",
      level: "Tous niveaux",
      language: "FR",
      topics: ""
    }
  });

  // Pas de serveur : la proposition part par e-mail, depuis la messagerie du visiteur.
  const onSubmit = (data: ResourceFormValues) => {
    const { subject, body } = buildProposalEmail(data);
    window.location.href = mailtoAuthor(subject, body);
    toast({
      title: 'Messagerie ouverte',
      description: "Envoyez l'e-mail préparé pour transmettre votre proposition."
    });
    form.reset();
    onClose();
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  const FormContent = (
    <>
      <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Titre *</FormLabel>
                  <FormControl>
                    <Input placeholder="Titre de la ressource" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Auteur *</FormLabel>
                  <FormControl>
                    <Input placeholder="Auteur ou organisation" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type *</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Type de ressource" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.entries(RESOURCE_TYPE_LABELS).map(([value, label]) => (
                          <SelectItem key={value} value={value}>{label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="level"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Niveau *</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Niveau" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Débutant">Débutant</SelectItem>
                        <SelectItem value="Intermédiaire">Intermédiaire</SelectItem>
                        <SelectItem value="Avancé">Avancé</SelectItem>
                        <SelectItem value="Tous niveaux">Tous niveaux</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="language"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Langue *</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Langue" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="FR">Français</SelectItem>
                        <SelectItem value="EN">Anglais</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Année de publication</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="Année (ex. : 2023)" 
                      min={1950}
                      max={new Date().getFullYear()}
                      onChange={e => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormDescription>
                    Année de publication de la ressource (optionnel)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description *</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Description de la ressource" 
                      className="min-h-[100px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="topics"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sujets</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Sujets séparés par des virgules (ex. : deep learning, éthique, NLP)" 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Liste de sujets abordés, séparés par des virgules (optionnel)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lien *</FormLabel>
                  <FormControl>
                    <Input placeholder="https://exemple.fr" {...field} />
                  </FormControl>
                  <FormDescription>
                    URL de la ressource (commençant par http:// ou https://)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleClose}>
                Annuler
              </Button>
              <Button type="submit">Préparer l'e-mail</Button>
            </DialogFooter>
          </form>
        </Form>
    </>
  );

  // Use Drawer for mobile, Dialog for desktop
  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={(open) => !open && handleClose()}>
        <DrawerContent className="px-4 pb-6 pt-4 max-h-[90vh] overflow-y-auto">
          <div className="mx-auto w-full max-w-lg">
            <DrawerTitle className="text-lg font-semibold mb-2 text-center">
              Proposer une ressource
            </DrawerTitle>
            <DrawerDescription className="text-sm text-muted-foreground mb-4 text-center">
              Le formulaire prépare un e-mail à l'auteur, que vous envoyez depuis votre messagerie.
            </DrawerDescription>
            {FormContent}
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            Proposer une ressource
          </DialogTitle>
          <DialogDescription>
            Le formulaire prépare un e-mail à l'auteur, que vous envoyez depuis votre messagerie.
          </DialogDescription>
        </DialogHeader>
        {FormContent}
      </DialogContent>
    </Dialog>
  );
};
