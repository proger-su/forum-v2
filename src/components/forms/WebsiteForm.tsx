import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/Button';

const websiteSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  url: z.string().url('Please enter a valid URL'),
  topic: z.string().min(1, 'Topic is required'),
});

type WebsiteFormData = z.infer<typeof websiteSchema>;

interface WebsiteFormProps {
  onSubmit: (data: WebsiteFormData) => Promise<void>;
  initialData?: Partial<WebsiteFormData>;
  isLoading?: boolean;
}

export function WebsiteForm({ onSubmit, initialData, isLoading }: WebsiteFormProps) {
  const form = useForm<WebsiteFormData>({
    resolver: zodResolver(websiteSchema),
    defaultValues: {
      name: '',
      url: '',
      topic: '',
      ...initialData,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Website name" 
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
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL</FormLabel>
              <FormControl>
                <Input 
                  type="url" 
                  placeholder="https://example.com" 
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
          name="topic"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Topic</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Enter topic" 
                  className="h-12 text-base"
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
            Save Website
          </Button>
        </div>
      </form>
    </Form>
  );
}