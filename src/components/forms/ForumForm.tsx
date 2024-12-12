import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/Button';
import { ForumStatus } from '../../types';
import { MultiSelect } from '../ui/multi-select';
import { PREDEFINED_TOPICS } from '../../lib/constants';
import { cleanUrl } from '../../lib/utils';
import { statusColors } from '../../lib/utils';

const forumSchema = z.object({
  url: z.string().url('Veuillez entrer une URL valide'),
  cleanUrl: z.string(),
  loginUrl: z.string().url('Veuillez entrer une URL valide').optional().or(z.literal('')),
  registrationUrl: z.string().url('Veuillez entrer une URL valide').optional().or(z.literal('')),
  topics: z.array(z.string()).default([]),
  status: z.nativeEnum(ForumStatus),
  comment: z.string().optional(),
});

type ForumFormData = z.infer<typeof forumSchema>;

interface ForumFormProps {
  onSubmit: (data: ForumFormData) => Promise<void>;
  initialData?: Partial<ForumFormData>;
  isLoading?: boolean;
}

const statusOptions = [
  { value: ForumStatus.FUNCTIONAL_WITH_EMAIL, label: 'Fonctionnel avec validation mail' },
  { value: ForumStatus.FUNCTIONAL_WITHOUT_EMAIL, label: 'Fonctionnel sans validation mail' },
  { value: ForumStatus.GUESTBOOK, label: 'Livre d\'or' },
  { value: ForumStatus.REGISTRATION_DENIED, label: 'Inscription refusée' },
  { value: ForumStatus.NOT_WORKING, label: 'Marche pas' },
  { value: ForumStatus.NO_FORUM, label: 'Pas de forum' },
  { value: ForumStatus.OTHER_ISSUE, label: 'Autre problème' },
];

export function ForumForm({ onSubmit, initialData, isLoading }: ForumFormProps) {
  const form = useForm<ForumFormData>({
    resolver: zodResolver(forumSchema),
    defaultValues: {
      url: '',
      cleanUrl: '',
      loginUrl: '',
      registrationUrl: '',
      topics: [],
      status: ForumStatus.FUNCTIONAL_WITH_EMAIL,
      comment: '',
      ...initialData,
    },
  });

  React.useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === 'url') {
        const url = value.url as string;
        if (url) {
          form.setValue('cleanUrl', cleanUrl(url));
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL du Forum *</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="https://example.com/forum" 
                      className="h-10"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cleanUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL Nettoyée (auto-générée)</FormLabel>
                  <FormControl>
                    <Input 
                      readOnly
                      className="h-10 bg-gray-50"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="loginUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL de Connexion</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="https://example.com/forum/login" 
                      className="h-10"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="registrationUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL d'Inscription</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="https://example.com/forum/register" 
                      className="h-10"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Statut</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-10">
                        <SelectValue placeholder="Sélectionner le statut" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {statusOptions.map(option => (
                        <SelectItem 
                          key={option.value} 
                          value={option.value}
                          className={statusColors[option.value]}
                        >
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                    <MultiSelect
                      options={PREDEFINED_TOPICS}
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Rechercher et sélectionner des sujets..."
                      className="h-10"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Commentaire</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Entrer un commentaire..."
                      className="h-20 resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex justify-end border-t pt-4">
          <Button 
            type="submit" 
            isLoading={isLoading}
            className="h-10 px-6"
          >
            Enregistrer
          </Button>
        </div>
      </form>
    </Form>
  );
}