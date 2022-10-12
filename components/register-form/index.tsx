import { TextInput, Button, PasswordInput, Stack } from '@mantine/core';
import { useForm } from '@mantine/form';

type RegisterInput = {
  name: string;
  email: string;
  password: string;
};

export default function RegisterForm({ submitting, onSubmit }: { submitting: boolean; onSubmit: Function }) {
  const form = useForm<RegisterInput & { confirmPassword: string }>({
    initialValues: { name: '', email: '', password: '', confirmPassword: '' },
    validate: {
      name: (value) => (value ? null : 'Title is required'),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value && value.length >= 6 ? null : 'Has at least 6 characters'),
      confirmPassword: (value, values) => (value !== values.password ? 'Passwords did not match' : null),
    },
  });

  return (
    <>
      <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
        <Stack>
          <TextInput
            label="Full name?"
            placeholder="What's your name?"
            size="md"
            disabled={submitting}
            {...form.getInputProps('name')}
          />
          <TextInput
            label="Email address"
            placeholder="hello@gmail.com"
            size="md"
            disabled={submitting}
            {...form.getInputProps('email')}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            size="md"
            disabled={submitting}
            {...form.getInputProps('password')}
          />
          <PasswordInput
            mt="sm"
            label="Confirm password"
            placeholder="Confirm password"
            disabled={submitting}
            {...form.getInputProps('confirmPassword')}
          />

          <Button type="submit" mt="md" fullWidth loading={submitting}>
            Sign Up
          </Button>
        </Stack>
      </form>
    </>
  );
}
