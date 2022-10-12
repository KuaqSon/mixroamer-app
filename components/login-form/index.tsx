import { TextInput, Checkbox, Button, Group, Box, PasswordInput } from '@mantine/core';
import { useForm } from '@mantine/form';

export default function LoginForm({ submitting, onSubmit }: { submitting: boolean; onSubmit: Function }) {
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value && value.length >= 6 ? null : 'Has at least 6 characters'),
    },
  });
  return (
    <>
      <Box>
        <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
          <TextInput
            label="Email address"
            placeholder="demo@demo.com"
            size="md"
            disabled={submitting}
            {...form.getInputProps('email')}
          />
          <PasswordInput
            label="Password"
            placeholder="123456"
            mt="md"
            size="md"
            disabled={submitting}
            {...form.getInputProps('password')}
          />

          <Button type="submit" mt="md" fullWidth loading={submitting}>
            Login
          </Button>
        </form>
      </Box>
    </>
  );
}
