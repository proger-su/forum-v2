import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/Button';

const emailSchema = z.object({
  webmailUrl: z.string().url('Please enter a valid webmail URL'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  aliases: z.string(),
});

type EmailFormData = z.infer<typeof emailSchema>;

interface EmailFormProps {
  onSubmit: (data: EmailFormData) => Promise<void>;
  initialData?: Partial<EmailFormData>;
  isLoading?: boolean;
}

export function EmailForm({ onSubmit, initialData, isLoading }: EmailFormProps) {
  const form = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      webmailUrl: '',
      email: '',
      password: '',
      aliases: '',
      ...initialData,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="webmailUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Webmail URL</FormLabel>
              <FormControl>
                <Input 
                  type="url" 
                  placeholder="https://webmail.example.com" 
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input 
                  type="email" 
                  placeholder="user@example.com" 
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
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input 
                  type="text" 
                  placeholder="Enter password" 
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
          name="aliases"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Aliases (one per line)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="alias1@example.com&#10;alias2@example.com"
                  className="min-h-[120px] text-base leading-relaxed resize-y"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end pt-4">
          <Button 
            type="submit" 
            isLoading={isLoading}
            className="h-12 px-6 text-base"
          >
            Save Email
          </Button>
        </div>
      </form>
    </Form>
  );
}