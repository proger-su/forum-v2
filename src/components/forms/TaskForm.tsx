import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../ui/select';
import { Button } from '../ui/Button';
import { TaskStatus, IndexationStatus, LinkVerificationStatus, Forum, Email, Website } from '../../types';
import { TASK_STATUS_OPTIONS } from '../../lib/constants';

const taskSchema = z.object({
  forumId: z.string().min(1, 'Veuillez sélectionner un forum'),
  emailId: z.string().min(1, 'Veuillez sélectionner un email'),
  emailAlias: z.string().nullable(),
  websiteId: z.string().min(1, 'Veuillez sélectionner un site web'),
  username: z.string().min(1, 'Le nom d\'utilisateur est requis'),
  password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
  registrationStatus: z.nativeEnum(TaskStatus),
  postStatus: z.nativeEnum(TaskStatus),
  linkStatus: z.nativeEnum(TaskStatus),
  linkVerificationStatus: z.nativeEnum(LinkVerificationStatus),
  threadUrl1: z.string().url('Veuillez entrer une URL valide').optional().or(z.literal('')),
  threadUrl2: z.string().url('Veuillez entrer une URL valide').optional().or(z.literal('')),
  threadUrl3: z.string().url('Veuillez entrer une URL valide').optional().or(z.literal('')),
  postUrl: z.string().url('Veuillez entrer une URL valide').optional().or(z.literal('')),
  messageToPost: z.string().optional(),
  comment: z.string().optional(),
  indexationStatus: z.nativeEnum(IndexationStatus),
});

type TaskFormData = z.infer<typeof taskSchema>;

interface TaskFormProps {
  onSubmit: (data: TaskFormData) => Promise<void>;
  initialData?: Partial<TaskFormData>;
  isLoading?: boolean;
  forums: Forum[];
  emails: Email[];
  websites: Website[];
}

const NO_ALIAS = '_NO_ALIAS_';

export function TaskForm({ onSubmit, initialData, isLoading, forums, emails, websites }: TaskFormProps) {
  const form = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      forumId: '',
      emailId: '',
      emailAlias: NO_ALIAS,
      websiteId: '',
      username: '',
      password: '',
      registrationStatus: TaskStatus._SELECT_,
      postStatus: TaskStatus._SELECT_,
      linkStatus: TaskStatus._SELECT_,
      linkVerificationStatus: LinkVerificationStatus._SELECT_,
      threadUrl1: '',
      threadUrl2: '',
      threadUrl3: '',
      postUrl: '',
      messageToPost: '',
      comment: '',
      indexationStatus: IndexationStatus._SELECT_,
      ...initialData,
    },
  });

  const selectedEmail = emails.find(email => email.id === form.watch('emailId'));
  const emailAliases = selectedEmail?.aliases || [];

  const handleSubmit = async (data: TaskFormData) => {
    const formattedData = {
      ...data,
      emailAlias: data.emailAlias === NO_ALIAS ? null : data.emailAlias,
    };
    await onSubmit(formattedData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="forumId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Forum</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un forum" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {forums.map(forum => (
                        <SelectItem key={forum.id} value={forum.id!}>
                          {forum.url}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <FormField
                control={form.control}
                name="emailId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <Select onValueChange={(value) => {
                      field.onChange(value);
                      form.setValue('emailAlias', NO_ALIAS);
                    }} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner un email" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {emails.map(email => (
                          <SelectItem key={email.id} value={email.id!}>
                            {email.email}
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
                name="emailAlias"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Alias Email (Optionnel)</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      value={field.value || NO_ALIAS}
                      disabled={!form.watch('emailId') || emailAliases.length === 0}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner un alias (optionnel)" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={NO_ALIAS}>Pas d'alias</SelectItem>
                        {emailAliases.map(alias => (
                          <SelectItem key={alias} value={alias}>
                            {alias}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="websiteId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Site Web</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un site web" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {websites.map(website => (
                        <SelectItem key={website.id} value={website.id!}>
                          {website.name}
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
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom d'utilisateur</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Entrer le nom d'utilisateur" 
                      className="h-12 text-base"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mot de passe</FormLabel>
                  <FormControl>
                    <Input 
                      type="text" 
                      placeholder="Entrer le mot de passe" 
                      className="h-12 text-base font-mono"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="messageToPost"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message à poster</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Entrer le message à poster..."
                      className="min-h-[120px] resize-y"
                      {...field}
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
                      placeholder="Ajouter un commentaire sur cette tâche..."
                      className="min-h-[120px] resize-y"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-6">
            <FormField
              control={form.control}
              name="registrationStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Statut Inscription</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner le statut" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {TASK_STATUS_OPTIONS.registration.map(option => (
                        <SelectItem 
                          key={option.value} 
                          value={option.value}
                          className={option.color}
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
              name="postStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Statut Post</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner le statut" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {TASK_STATUS_OPTIONS.post.map(option => (
                        <SelectItem 
                          key={option.value} 
                          value={option.value}
                          className={option.color}
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
              name="linkStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Statut Lien</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner le statut" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {TASK_STATUS_OPTIONS.link.map(option => (
                        <SelectItem 
                          key={option.value} 
                          value={option.value}
                          className={option.color}
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
              name="linkVerificationStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vérification du lien</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner le statut" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {TASK_STATUS_OPTIONS.linkVerification.map(option => (
                        <SelectItem 
                          key={option.value} 
                          value={option.value}
                          className={option.color}
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
              name="threadUrl1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL du Thread 1</FormLabel>
                  <FormControl>
                    <Input 
                      type="url" 
                      placeholder="https://example.com/thread1" 
                      className="h-12 text-base"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="threadUrl2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL du Thread 2</FormLabel>
                  <FormControl>
                    <Input 
                      type="url" 
                      placeholder="https://example.com/thread2" 
                      className="h-12 text-base"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="threadUrl3"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL du Thread 3</FormLabel>
                  <FormControl>
                    <Input 
                      type="url" 
                      placeholder="https://example.com/thread3" 
                      className="h-12 text-base"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="postUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL du Post</FormLabel>
                  <FormControl>
                    <Input 
                      type="url" 
                      placeholder="https://example.com/post" 
                      className="h-12 text-base"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="indexationStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Statut d'indexation</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner le statut" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {TASK_STATUS_OPTIONS.indexation.map(option => (
                        <SelectItem 
                          key={option.value} 
                          value={option.value}
                          className={option.color}
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
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button 
            type="submit" 
            isLoading={isLoading}
            className="h-12 px-6 text-base"
          >
            {initialData ? 'Mettre à jour' : 'Créer la tâche'}
          </Button>
        </div>
      </form>
    </Form>
  );
}