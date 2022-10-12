import { Title, Text, Anchor, Box, Alert } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons';
import LoginForm from 'components/login-form';
import Link from 'next/link';
import { useState } from 'react';
import { saveToken } from 'src/services/auth-service';
import { loginApi } from 'src/utils/api';

export default function LoginContainer() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const handleLogin = async (data: any) => {
    setLoading(true);
    setError(null);
    const resp = await loginApi(data);
    if (resp?.status === 200 && resp?.data?.accessToken) {
      saveToken(resp?.data?.accessToken);
      window.location.href = '/app';
    } else {
      setLoading(false);
      setError(resp?.data?.message || 'Something went wrong! Please try again later.');
    }
  };

  return (
    <>
      <Title order={2} align="center" mt="md" mb={50}>
        Welcome Back!
      </Title>

      {error && (
        <Box py="lg">
          <Alert icon={<IconAlertCircle size={16} />} title="Bummer!" color="red">
            {error}
          </Alert>
        </Box>
      )}

      <LoginForm submitting={loading} onSubmit={handleLogin} />

      <Text align="center" mt="md">
        Don&apos;t have an account?{' '}
        <Link href="/account/register">
          <Anchor>Register</Anchor>
        </Link>
      </Text>
    </>
  );
}
